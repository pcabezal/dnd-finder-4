import { useEffect, useState } from 'react';
import CardStyles from '../styles/Cards.module.css';
import TinderCard from 'react-tinder-card';

export default function Browse(props) {

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

    const [people2, setPeople2] = useState([])

    const swiped = (direction, nameToDelete) => {
        console.log('removing' + nameToDelete + 'direction: ' + direction);
        // setLastDirection(direction);
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




