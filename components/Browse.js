import { useEffect, useState } from 'react';
import CardStyles from '../styles/Cards.module.css';
import TinderCard from 'react-tinder-card';
// import axios from './axios';


function Browse() {

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

    // useEffect(() => {
    //     async function fetchData() {
    //         const req = await axios.get('/cards');

    //         setPeople(req.data);
    //     }

    //     fetchData();
    // }, [])

    console.log('logga' + people);

    const swiped = (direction, nameToDelete) => {
        console.log('removing' + nameToDelete);
        // setLastDirection(direction);
    }

    const outOfFrame = name => {
        console.log(name + ' left the screen!' + process.env.GREETING);
    }

    return (
        <div className={CardStyles.cards}>
            <div className={CardStyles.cards__cardsContainer}>
                {people.map((person) => (
                    <TinderCard
                        className={CardStyles.swipe}
                        key={person.name}
                        preventSwipe={['up', 'down']}
                        onSwipe={(dir) => swiped(dir, person.name)}
                        onCardLeftScreen={() => outOfFrame(person.name)}
                    >
                        <div style={{ backgroundImage: `url(${person.imgUrl})`}} className={CardStyles.card}>
                            <h3>{person.name}</h3>
                        </div>           
                    </TinderCard>
                ))}
            </div>
        </div>
    )  
}

export default Browse