import { checkCookies, getCookie, getCookies } from "cookies-next";
import Head from "next/head";
import Image from "next/image";
import styles from "../styles/Home.module.css";

export default function Home() {
  return (
    <div className={styles.container}>
      <Head>
        <title>d and d?</title>

      </Head>

      <a href="/api/google">Login with Google</a>
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