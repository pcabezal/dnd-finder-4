import { useEffect, useState } from 'react';
import CardStyles from '../styles/Cards.module.css';
import TinderCard from 'react-tinder-card';
import { useRouter } from 'next/router'

export default function Browse(props) {


    const router = useRouter()
    const contentType = 'application/json'

    const [people, setPeople] = useState([]);

    useEffect(() => {
        fetch('/api/user/user')
            .then((res) => res.json())
            .then((data) => {    
                console.log(data);            
                setPeople(data)
            })
    }, [])

    const putData = async (form) => {
        const { id } = router.query
    
        try {
          const res = await fetch(`/api/user/${id}`, {
            method: 'PUT',
            headers: {
              Accept: contentType,
              'Content-Type': contentType,
            },
            body: JSON.stringify(form),
          })
    
          // Throw error with status code in case Fetch API req failed
          if (!res.ok) {
            throw new Error(res.status)
          }
        } catch (error) {
          setMessage('Failed to update card')
        }
    }

    const swiped = async (direction, nameToDelete, _id) => {
        console.log('removing' + nameToDelete + 'direction: ' + direction);
        console.log(_id);
        putData(_id, );
    }

    const outOfFrame = name => {
        console.log(name + ' left the screen!');
    }

    // const updatePic = async () => {
    //     const res = await fetch('/api/user/user', {
    //         method: 'PUT',
    //         headers: {
    //             'Content-Type': 'application/json',
    //         },
    //         body: JSON.stringify({
    //             googid: {googid}.googid,
    //             cloud_url: data.secure_url
    //         }),
    //     });
    //     newPic(data.secure_url);
    // }

    return (
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
    )  
}




