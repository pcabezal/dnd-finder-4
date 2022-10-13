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
import { useEffect, useState } from 'react';
import CardStyles from '../styles/Cards.module.css';
import TinderCard from 'react-tinder-card';


React.useLayoutEffect = React.useEffect // stop console error

function Dashboard(props) {
 
  // LOGIN AUTH //
  const router = useRouter();
  const logout = () => {
    removeCookies("token");
    router.replace("/");
  };

  const [activeIndex, setActiveIndex] = useState(1);

  const [people, setPeople] = useState([])

  useEffect(() => {
    fetch('/api/user/user')
        .then((res) => res.json())
        .then((data) => {               
            setPeople(data)
        })
  }, [])

  const putData = async (id, userId) => {
    try {
      const res = await fetch(`/api/user/${id}`, {
        method: 'PUT',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({id: id, userId: userId}),
      })

      // Throw error with status code in case Fetch API req failed
      if (!res.ok) {
        throw new Error(res.status)
      }
    } catch (error) {
      console.log('Failed to update card', error);
    }
  }

  const swiped = (direction, nameToDelete, _id) => {
    console.log('removing' + nameToDelete + 'direction: ' + direction);
    console.log(_id, props.userId)
    putData(_id, props.userId)
  }

  const outOfFrame = name => {
    console.log(name + ' left the screen!');
  }
  if (activeIndex == 1) {
    return (
      <div className={DashboardStyles.cardContainer}>
          <title>Swipe!</title>

          <Header />     
          <div className={CardStyles.cards}>
              <div className={CardStyles.cards__cardsContainer}>
                  {people.map((person) => (
                      <TinderCard
                          className={CardStyles.swipe}
                          key={person.name}
                          preventSwipe={['up', 'down']}
                          onSwipe={(dir) => swiped(dir, person.name, person._id)}
                          onCardLeftScreen={() => outOfFrame(person.name)}
                      >
                          <div style={{ backgroundImage: `url(${person.cloud_url})`}} className={CardStyles.card}>
                              <h3>{person.name}</h3>
                          </div>           
                      </TinderCard>
                  ))}
              </div>        
          </div>
          <SwipeButtons 
            isActive={activeIndex === 0}
            onShow={() => setActiveIndex(0)}
          />

      </div>
    );
  } else {
    return (
      <div>
        <title>Swipe!</title>

        <Header /> 
        <SwipeButtons />
      </div>
    )
  }
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
        userId: verified.id 
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