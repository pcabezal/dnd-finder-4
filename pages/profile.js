import Meta from '../components/Meta'
import Header from '../components/Header'
import React from "react" 
import { getCookie, removeCookies } from "cookies-next";
import connect from "../lib/database";
import jwt from "jsonwebtoken";
import User from "../models/User";
import { useRouter } from "next/router";
import { useState } from 'react';
import styles from '../styles/Profile.module.css'
React.useLayoutEffect = React.useEffect // stop console error
import Link from 'next/link'

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
          <Header />
          
          <div className="flex-col p-12">

              <div className="w-96 mx-auto justify-center flex shadow-2xl">
                <img src={ cloud_url } className="w-96 h-96 rounded-t-[18px]"></img>
              </div>

              <div className="p-8 bg-white mx-auto rounded-b-[18px] w-96 shadow-2xl">
                <span className="font-semibold text-2xl text-gray-800">{name}</span>
                <p className="pb-4">
                  { profile_bio }
                </p>
                <div className="pt-4 flex justify-around">
                  <Link href='editprofile'>
                    <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-full shadow-md">
                      Edit Profile
                    </button>
                  </Link>

                  <button onClick={logout} className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-full shadow-md">
                    Logout
                  </button>
                </div>
              </div>
          </div>
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
