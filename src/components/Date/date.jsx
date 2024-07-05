import React, { useState, useEffect } from 'react';
import axios from 'axios';
import styles from './Date.module.css';

function DateComponent() {
    const [currentDate, setCurrentDate] = useState('');

    useEffect(() => {
        axios.get('https://worldtimeapi.org/api/ip')
            .then(response => {
                const datetime = response.data.datetime;
                const date = new Date(datetime);
                const day = date.getDate().toString().padStart(2, '0'); // Ensure two digits with leading zero
                const month = (date.getMonth() + 1).toString().padStart(2, '0'); // Ensure two digits with leading zero
                const year = date.getFullYear();
                const formattedDate = `${day}/${month}/${year}`;
                setCurrentDate(formattedDate);
            })
            .catch(error => {
                console.error('Error fetching date:', error);
            });
    }, []);

    return (
        <div className={styles.cardBg}>
            <div className={styles.data}>
                {currentDate}
            </div>
        </div>
    );
}

export default DateComponent;
