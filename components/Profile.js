import Meta from '../components/Meta'
import React from "react" 
import { getCookie, removeCookies } from "cookies-next";
import { useRouter } from "next/router";
React.useLayoutEffect = React.useEffect // stop console error
import Link from 'next/link'

function Profile({ name, cloud_url, profile_bio }) {
    // LOGIN AUTH //
    const router = useRouter();
    const logout = () => {
        removeCookies("token");
        router.replace("/");
    };

    return (
      <div>
          <Meta title='Your Profile Yo' />
          
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

export default Profile