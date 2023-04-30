import React, { useEffect, useCallback, useRef } from 'react';
import Countdown from 'react-countdown';
import './timer.css'

const Timer = ({ time, onHandleTimerComplete }) => {
    const intervalRef = useRef(null);
    const handleTimerComplete = useCallback(() => {
        onHandleTimerComplete();
    }, [onHandleTimerComplete]);

    useEffect(() => {
        intervalRef.current = setInterval(() => {
            handleTimerComplete();
        }, time * 1000);
        return () => clearInterval(intervalRef.current);
    }, [time, handleTimerComplete]);

    const renderer = useCallback(({ hours, minutes, seconds }) => {
        let displayHours = hours.toString().padStart(2, '0');
        let displayMinutes = minutes.toString().padStart(2, '0');
        let displaySeconds = seconds.toString().padStart(2, '0');

        let timerClass = 'timer';
        if (hours === 0 && minutes === 0 && seconds <= 10) {
            timerClass = 'timer-last-10-seconds';
        }

        return (
            <span className={timerClass}>
                {displayHours}:{displayMinutes}:{displaySeconds}
            </span>
        );
    }, []);

    return (
        <div className='timer-container'>
            {
                <Countdown
                    date={Date.now() + (time * 1000)}
                    renderer={renderer}
                    onComplete={handleTimerComplete}
                />
            }
        </div>
    );
};

export default React.memo(Timer);
