import React, { useState, useEffect, useRef } from 'react';
import html2canvas from 'html2canvas';
import './webcam.css';

function Webcam({ time, onHandleSnapShots, testCompleted }) {
    const videoRef = useRef(null);
    const [stream, setStream] = useState(null);
    const [snapshots, setSnapshots] = useState([]);
    const intervalIdRef = useRef(null);

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
        intervalIdRef.current = setInterval(() => {
            takeSnapshot();
        }, time * 1000);
        return () => clearInterval(intervalIdRef.current);
    }, []);

    useEffect(() => {
        if (testCompleted) {
            clearInterval(intervalIdRef.current);
            onHandleSnapShots(snapshots);
        }
    }, [testCompleted, snapshots, onHandleSnapShots]);

    const takeSnapshot = () => {
        if (videoRef.current && !testCompleted) {
            takeFullPageSnapshot();
        }
    };

    const takeFullPageSnapshot = () => {
        html2canvas(document.body).then(canvas => {
            const snapshotUrl = canvas.toDataURL('image/png');
            setSnapshots((prevSnapshots) => [...prevSnapshots, snapshotUrl]);
        });
    }

    return (
        <div>
            {stream ? <video className="webcam-icon" ref={videoRef} autoPlay={true} /> : ''}
        </div>
    );
}

export default React.memo(Webcam);
