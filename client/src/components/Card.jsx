import React, { useState } from 'react'
import Header from './Header'
import styles from "../styles/Card.module.css";

const Card = () => {
    const [user, setUser] = useState([
        {
            name: 'Ro',
            url: 'https://cdn.pixabay.com/photo/2016/04/26/07/57/woman-1353825_960_720.png'
        },
        {
            name: 'Pepe',
            url: 'https://cdn.pixabay.com/photo/2016/11/29/07/16/balancing-1868051_960_720.jpg'
        },

    ])
  return (
    <div>
        <Header />
        <div className={styles.cardsHenry}>
            
            {user.map(p =>(
                <h1>{p.name}</h1>
            ))}
           
        </div>
    </div>
  )
}

export default Card