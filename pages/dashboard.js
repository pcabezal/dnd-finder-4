import { getCookie, removeCookies } from "cookies-next";
import React from "react";
import connect from "../lib/database";
import jwt from "jsonwebtoken";
import User from "../models/User";
import { useRouter } from "next/router";
import Browse from '../components/Browse'
import SwipeButtons from '../components/SwipeButtons'
import Header from '../components/Header'
import DashboardStyles from '../styles/Dashboard.module.css'
import Link from 'next/link'


React.useLayoutEffect = React.useEffect // stop console error

function Dashboard(props) {
 
  // LOGIN AUTH //
  const router = useRouter();
  const logout = () => {
    removeCookies("token");
    router.replace("/");
  };
  
  return (
    <div className={DashboardStyles.cardContainer}>
        <title>Swipe!</title>

        <Header />
        <Browse />
        <SwipeButtons />

    </div>
  );
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
    const allUser = await User.find({});

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


export default Dashboard;