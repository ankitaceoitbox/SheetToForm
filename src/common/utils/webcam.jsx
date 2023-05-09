import React, { useState, useEffect, useRef } from 'react';
import './webcam.css';

function Webcam({ testCompleted }) {
    const videoRef = useRef(null);
    const [stream, setStream] = useState(null);

    useEffect(() => {
        async function getStream() {
            try {
                const stream = await navigator.mediaDevices.getUserMedia({ video: true });
                setStream(stream);
            } catch (error) {
                console.error(error);
            }
        }
        getStream();
    }, []);

    useEffect(() => {
        if (videoRef.current && stream) {
            videoRef.current.srcObject = stream;
        }
    }, [stream]);

    useEffect(() => {
        if (testCompleted === true && stream) {
            return () => {
                stream.getTracks().forEach((track) => track.stop());
            };
        }
    }, [testCompleted, stream]);

    return <div>{stream ? <video className="webcam-icon" ref={videoRef} autoPlay={true} /> : ''}</div>;
}

export default React.memo(Webcam);
