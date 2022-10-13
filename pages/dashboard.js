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
import AliceCarousel from 'react-alice-carousel';
import 'react-alice-carousel/lib/alice-carousel.css';


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
  const [likes, setLikes] = useState([])

  let liked = []
  
  useEffect(() => {
    fetch('/api/user/user')
      .then((res) => res.json())
      .then((data) => {               
          setPeople(data);

          const result = data.filter(obj => {
            return obj._id === props.userId
          })[0].likes

          result.forEach( el => {
            let filtered = data.filter(obj => obj._id === el)[0];
            if (filtered) liked.push(filtered);
          })
      })
      .then(() => {
        setLikes(liked)
      })
  }, [])

  console.log('likes yo', likes);

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


  // CAROUSEL //
  const handleDragStart = (e) => e.preventDefault();

  const items = [
    <img src="https://i.pinimg.com/originals/41/76/2e/41762e88e304995dd743d7ffe55c66c9.jpg" onDragStart={handleDragStart} role="presentation" className={DashboardStyles.item} />,
    <img src="https://i.pinimg.com/736x/ea/93/20/ea932047f66f8728f80824ff065bbb89.jpg" onDragStart={handleDragStart} role="presentation" className={DashboardStyles.item}/>,
    <img src="https://i.pinimg.com/originals/41/76/2e/41762e88e304995dd743d7ffe55c66c9.jpg" onDragStart={handleDragStart} role="presentation" className={DashboardStyles.item}/>,
    <img src="https://i.pinimg.com/474x/a7/9e/fd/a79efd9f13877d7ba4ac240d4c21e4fd.jpg" onDragStart={handleDragStart} role="presentation" className={DashboardStyles.item}/>,
    <img src="https://i.pinimg.com/originals/41/76/2e/41762e88e304995dd743d7ffe55c66c9.jpg" onDragStart={handleDragStart} role="presentation" className={DashboardStyles.item}/>,
  ];



  const responsive = {
    0: { items: 1 },
    0: { items: 2 },
    0: { items: 3 },
  };


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
            onShow2={() => setActiveIndex(1)}
          />

      </div>
    );
  } else if (activeIndex == 0) {
    return (
      <div>
        <title>Your likes</title>

        <Header /> 

        <div className={DashboardStyles.carouselContainer}>
          <AliceCarousel 
            mouseTracking items={items} 
            responsive={responsive}
            controlsStrategy="alternate"
            infinite='true'
          />
        </div>

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