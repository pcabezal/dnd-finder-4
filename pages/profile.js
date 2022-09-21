import Meta from '../components/Meta'
import Browse from '../components/Browse'
import React from "react" 
import { getCookie, removeCookies } from "cookies-next";
import connect from "../lib/database";
import jwt from "jsonwebtoken";
import User from "../models/User";
import { useRouter } from "next/router";
import { useState } from 'react';
import styles from '../styles/Profile.module.css'
React.useLayoutEffect = React.useEffect // stop console error

export default function Profile({ name, email, cloud_url, profile_bio, location, googid }) {
    // UPDATE PIC //


    




    // LOGIN AUTH //
    const router = useRouter();
    const logout = () => {
    removeCookies("token");
    router.replace("/");
    };

    // IMAGE UPLOADING //
    const [imageSrc, setImageSrc] = useState();
    const [uploadData, setUploadData] = useState();

    function handleOnChange(changeEvent) {
        const reader = new FileReader();
        reader.onload = function(onLoadEvent) {
        setImageSrc(onLoadEvent.target.result);
        setUploadData(undefined);
        }
        reader.readAsDataURL(changeEvent.target.files[0]);
    }

    async function handleOnSubmit(event) {
        event.preventDefault();
        const form = event.currentTarget;
        const fileInput = Array.from(form.elements).find(({ name }) => name === 'file');
        const formData = new FormData();

        for ( const file of fileInput.files ) {
            formData.append('file', file);
        }
        formData.append('upload_preset', 'my-uploads');

        const data = await fetch('https://api.cloudinary.com/v1_1/dc2rqlnb8/image/upload', {
            method: 'POST',
            body: formData
        }).then(r => r.json());

        setImageSrc(data.secure_url);
        setUploadData(data);

        console.log(data);
        console.log(data.secure_url);
        const updatePic = async () => {
            const res = await fetch('/api/user/user', {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    googid: {googid}.googid,
                    cloud_url: data.secure_url
                }),
            });
    
            const picData = await res.json();
            console.log(picData)
        }
        updatePic();
    }

  return (
    <div>
      <Meta title='Your Profile Yo' />
      {name}'s Profile
      <div>
        <button onClick={logout}>Logout</button>
      </div>
        <img src={cloud_url} className={styles.contentimg}/>
      <main>
        <h1>
          Image Uploader
        </h1>

        <p>
          Upload your image to Cloudinary!
        </p>

        <form method="post" onChange={handleOnChange} onSubmit={handleOnSubmit}>
          <p>
            <input type="file" name="file" />
          </p>
          
          <img src={imageSrc} className={styles.contentimg}/>
          
          {imageSrc && !uploadData && (
            <p>
              <button>Upload Files</button>
            </p>
          )}

          {uploadData && (
            <code><pre>{JSON.stringify(uploadData, null, 2)}</pre></code>
          )}
        </form>
      </main>
    </div>
  )
}

// ensure login
export async function getServerSideProps({ req, res }) {
  try {
    // connect db
    await connect();
    // check cookie
    const token = getCookie("token", { req, res });
    if (!token)
      return {
        redirect: {
          destination: "/",
        },
      };

    const verified = await jwt.verify(token, process.env.JWT_SECRET);
    const obj = await User.findOne({ _id: verified.id });
    if (!obj)
      return {
        redirect: {
          destination: "/",
        },
      };
    console.log('testes' + obj.googid);
    return {
      props: {
        email: obj.email,
        name: obj.name,
        googid: obj.googid,
        cloud_url: obj.cloud_url
      },
    };
  } catch (err) {
    removeCookies("token", { req, res });
    return {
      redirect: {
        destination: "/",
      },
    };
  }
}
