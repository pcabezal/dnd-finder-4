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
import EditProfile from '../components/EditProfile'
import Profile from '../components/Profile'

React.useLayoutEffect = React.useEffect // stop console error

function Dashboard(props) {
  const [activeIndex, setActiveIndex] = useState('browse');
  const [people, setPeople] = useState([])
  const [likes, setLikes] = useState([])

  let liked = []
  let onceOnly = 1;

  // populate list of users to swipe on //
  useEffect(() => {
    if (onceOnly) {
      fetch('/api/user/user')
      .then((res) => res.json())
      .then((data) => {               
          setPeople(data.filter(person => person._id !== props.userId));

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
      onceOnly = 0;
    }
  }, [])

  // ADD LIKES WITH SWIPES//
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
    console.log(direction + ' on ' + nameToDelete);

    if (direction=='right' && !likes.some(obj => obj._id == _id)) {
      liked.push(_id)
      putData(_id, props.userId)
    } 
  }

  // const outOfFrame = name => {
  //   console.log(name + ' left the screen!');
  // }


  // LIKES CAROUSEL //
  const handleDragStart = (e) => e.preventDefault();

  let items = likes.map((like) => (
    <img src={like.cloud_url}  onDragStart={handleDragStart} role="presentation" className={DashboardStyles.item}/>
  ))

  const responsive = {
    0: { items: 1 },
    0: { items: 2 },
    0: { items: 3 },
  };

  // COMPONENT CONDITIONAL RENDERING //
  function renderSwitch(param) {
    switch(param) {
      case 'browse': return (
        <>
          <div className={CardStyles.cards}>
            <div className={CardStyles.cards__cardsContainer}>
                {people.map((person) => (
                    <TinderCard
                        className={CardStyles.swipe}
                        key={person.name}
                        preventSwipe={['up', 'down']}
                        onSwipe={(dir) => swiped(dir, person.name, person._id)}
                        // onCardLeftScreen={() => outOfFrame(person.name)}
                    >
                        <div style={{ backgroundImage: `url(${person.cloud_url})`}} className={CardStyles.card}>
                            <h3>{person.name}</h3>
                        </div>           
                    </TinderCard>
                ))}
            </div>        
          </div>
        </>
      )
      case 'profile': return (
        <Profile {...props} onShowEdit={() => setActiveIndex('edit')}/>
      )
      case 'edit': return (
        <EditProfile {...props} />
      )
      case 'likes': return (
        <div className={DashboardStyles.carouselContainer}>
          <AliceCarousel 
            mouseTracking items={items} 
            responsive={responsive}
            controlsStrategy="alternate"
            infinite='true'
            disableButtonsControls='true'
          />
        </div>
      )
    }
  }

  // render! //
    return (
      <div className={DashboardStyles.cardContainer}>
          <title>Swipe!</title>

          <Header />   

          {renderSwitch(activeIndex)}

          <SwipeButtons 
            onShowBrowse={() => setActiveIndex('browse')}
            onShowProfile={() => setActiveIndex('profile')}
            onShowEdit={() => setActiveIndex('edit')}
            onShowLikes={() => setActiveIndex('likes')}
          />
      </div>
    );
}

// ensure login //
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
        name: obj.name,
        email: obj.email,
        cloud_url: obj.cloud_url,
        profile_bio: obj.profile_bio,
        likes: obj.likes,
        userId: verified.id,
        googid: obj.googid
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