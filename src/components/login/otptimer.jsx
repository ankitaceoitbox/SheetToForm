import React, { useState, useEffect } from 'react';

export default function OTPTimer({ time, onTimeout }) {
    const [seconds, setSeconds] = useState(time);

    useEffect(() => {
        const intervalId = setInterval(() => {
            if (seconds === 0) {
                clearInterval(intervalId);
                onTimeout();
            } else {
                setSeconds(seconds - 1);
            }
        }, 1000);

        return () => clearInterval(intervalId);
    }, [seconds, onTimeout]);

    const minutes = Math.floor(seconds / 60);
    const formattedSeconds = seconds % 60 < 10 ? `0${seconds % 60}` : seconds % 60;

    return (
        <div>
            <p>Time remaining: {`${minutes}:${formattedSeconds}`}</p>
        </div>
    );
}
