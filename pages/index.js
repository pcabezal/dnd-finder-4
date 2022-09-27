import { checkCookies, getCookie, getCookies } from "cookies-next";
import Head from "next/head";
import Image from "next/image";

export default function Home() {
  return (

    
    <div className="flex items-center justify-center">

      <Head>
        <title>d and d?</title>
      </Head>

      <div className="p-12 bg-white mx-auto rounded-2xl w-100 ">
        <div className="mb-4">
          <h3 className="font-semibold text-2xl text-gray-800">Sign In </h3>
          <p className="text-gray-500">Let's start swiping!</p>
        </div>
        
        <div className="space-y-5">
          <div>
            <a href="/api/google">
              <button type="submit" className="w-full flex justify-center bg-green-400  hover:bg-green-500 text-gray-100 p-3  rounded-full tracking-wide font-semibold  shadow-lg cursor-pointer transition ease-in duration-500">
                Login with Google
              </button>
            </a>
          </div>
        </div>

        <div className="pt-5 text-center text-gray-400 text-xs">
        </div>
      </div>

    </div>

  );
}

export async function getServerSideProps({ req, res }) {
  try {
    const cookieExists = getCookie("token", { req, res });
    console.log(cookieExists);
    if (cookieExists) return { redirect: { destination: "/dashboard" } };
    return { props: {} };
  } catch (err) {
    return { props: {} };
  }
}