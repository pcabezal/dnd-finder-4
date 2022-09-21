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
    // LOGIN AUTH //
    const router = useRouter();
    const logout = () => {
        removeCookies("token");
        router.replace("/");
    };

    // IMAGE UPLOADING //
    const [imageSrc, setImageSrc] = useState();
    const [uploadData, setUploadData] = useState();
    const [newProfilePic, newPic] = useState();

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
            newPic(data.secure_url);
        }
        updatePic();
    }

    // BIO UPDATE
    async function bioFormSubmit(event) {
        event.preventDefault();
        const form = event.currentTarget;
        const bio = form.elements[0].value;

        const res = await fetch('/api/user/bio', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                googid: {googid}.googid,
                profile_bio: bio
            }),
        });

        form.elements[0].value = ''
    }


    return (
    <div>
        <Meta title='Your Profile Yo' />
        {name}'s Profile
        <div>
            <button onClick={logout}>Logout</button>
        </div>

        <img src={ cloud_url } className={styles.contentimg}></img>
        
        { profile_bio }

        <form method="post" onSubmit={bioFormSubmit}>
            <p>
                <input type="text" name="bioForm" className={styles.bioForm}/>
            </p>
          
            <p>
                <button>Submit Bio</button>
            </p>

        </form>


        <p>
            Upload a new profile image!
        </p>

        <form method="post" onChange={handleOnChange} onSubmit={handleOnSubmit}>
            <p>
                <input type="file" name="file" />
            </p>
            {/* UPLOAD PREVIEW */}
            <img src={imageSrc} className={styles.contentimg}/>
            
            {imageSrc && !uploadData && (
            <p>
                <button>Upload Files</button>
            </p>
            )}
        </form>

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

    return {
      props: {
        email: obj.email,
        name: obj.name,
        googid: obj.googid,
        cloud_url: obj.cloud_url,
        profile_bio: obj.profile_bio
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
