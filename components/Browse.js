import { useEffect, useState } from 'react';
import CardStyles from '../styles/Cards.module.css';
import TinderCard from 'react-tinder-card';
import { useRouter } from 'next/router'

export default function Browse(props) {


    const router = useRouter()
    const contentType = 'application/json'

    const [people, setPeople] = useState([
        {
            name: 'fetorn jones',
            imgUrl: 'https://www.indiewire.com/wp-content/uploads/2013/10/adventure-time.png'
        },
        {
            name: 'bob minske',
            imgUrl: 'https://m.media-amazon.com/images/M/MV5BMTQyMDQ0MjA4M15BMl5BanBnXkFtZTgwNDM3ODAyMzE@._V1_.jpg'
        },
        {
            name: 'yolandee smith',
            imgUrl: 'https://m.media-amazon.com/images/M/MV5BMTVmMTU2YWItYThhOS00OTFhLTgxNzktNjI0YjgzOWJlZWM4XkEyXkFqcGdeQXRyYW5zY29kZS13b3JrZmxvdw@@._V1_.jpg'
        }
    ]);

    useEffect(() => {
        fetch('/api/user/user')
            .then((res) => res.json())
            .then((data) => {                
                setPeople(data)
            })
    }, [])

    const swiped = (direction, nameToDelete, googid) => {
        console.log('removing' + nameToDelete + 'direction: ' + direction);
        console.log(googid);
    }

    const outOfFrame = name => {
        console.log(name + ' left the screen!');
    }

    return (
        <div className={CardStyles.cards}>
             <div className={CardStyles.cards__cardsContainer}>
                {people.map((person) => (
                    <TinderCard
                        className={CardStyles.swipe}
                        key={person.name}
                        preventSwipe={['up', 'down']}
                        onSwipe={(dir) => swiped(dir, person.name, person.googid)}
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




