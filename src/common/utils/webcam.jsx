// import React, { useState, useEffect, useRef } from 'react';
// import './webcam.css';

// function Webcam({ testCompleted }) {
//     const videoRef = useRef(null);
//     const [stream, setStream] = useState(null);

//     useEffect(() => {
//         async function getStream() {
//             try {
//                 const stream = await navigator.mediaDevices.getUserMedia({ video: true });
//                 setStream(stream);
//             } catch (error) {
//                 console.error(error);
//             }
//         }
//         getStream();
//     }, []);

//     useEffect(() => {
//         if (videoRef.current && stream) {
//             videoRef.current.srcObject = stream;
//         }
//     }, [stream]);

//     useEffect(() => {
//         if (testCompleted === true && stream) {
//             return () => {
//                 stream.getTracks().forEach((track) => track.stop());
//             };
//         }
//     }, [testCompleted, stream]);

//     return <div>{stream ? <video className="webcam-icon" ref={videoRef} autoPlay={true} /> : ''}</div>;
// }

// export default React.memo(Webcam);

import React, { useState, useEffect, useRef } from 'react';
import './webcam.css';
import html2canvas from 'html2canvas';
import RecordingComponent from '../../components/recordingbutton';

function Webcam({ testCompleted, onTestCompleted, timeInSeconds }) {
    const videoRef = useRef(null);
    const [stream, setStream] = useState(null);
    const [screenshotUrls, setScreenshotUrls] = useState([]);

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
        let intervalId;

        if (stream) {
            intervalId = setInterval(() => {
                takeScreenshot();
            }, timeInSeconds);
        }

        return () => {
            clearInterval(intervalId);
            if (stream) {
                stream.getTracks().forEach((track) => track.stop());
            }
        };
    }, [stream]);

    const takeScreenshot = async () => {
        if (videoRef.current) {
            html2canvas(document.documentElement).then((canvas) => {
                const screenshotURL = canvas.toDataURL();
                setScreenshotUrls((prevUrls) => [...prevUrls, screenshotURL]);
            });
        }
    };

    useEffect(() => {
        if (testCompleted && onTestCompleted) {
            onTestCompleted(screenshotUrls);
        }
    }, [testCompleted, screenshotUrls, onTestCompleted]);

    return <div>
        {
            stream ?
                <>
                    <RecordingComponent />
                    <video className="webcam-icon" ref={videoRef} autoPlay={true} />
                </>
                : ''
        }
    </div>;
}

export default React.memo(Webcam);
