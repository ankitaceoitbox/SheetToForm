import { ContextData } from '../common/utils/contextdata';
import { useCallback, useEffect, useState } from 'react';
import Headerstop from '../components/heders/header';
import RenderQuestion from '../components/renderQuestion';
import SubmitPage from '../components/submit/submit';
import Swal from 'sweetalert2';
import Timer from '../common/utils/timer';
import Webcam from '../common/utils/webcam';
import 'sweetalert2/dist/sweetalert2.min.css';
import SaveFormData from '../services/submitDataToSheet';
import { ColorRing } from 'react-loader-spinner';
import { styles } from './LoginPage';

function QuestionPage({ onHandleSubmitPage }) {
    const { allMcqDataContextAPI } = ContextData();
    const [mcqData, setMcqData] = useState({});
    const [sectionDetails, setSectionDetails] = useState({});
    const [formSettings, setFormSettings] = useState({});
    const [sectionName, setSectionName] = useState('');
    const [sectionDescription, setSectionDescription] = useState('');
    const [testCompleted, setTestCompleted] = useState(false);
    const [formResponse, setFormResponse] = useState({});
    const [timeDone, setTimeDone] = useState(false);
    const [screenshotsURL, setScreenshotsURL] = useState([]);
    const [screenShotsSet, setScreenShotsSet] = useState(false);
    const [userSwitchTab, setUserSwitchTab] = useState(0);
    const [showLoader, setShowLoader] = useState(true);

    const handleVisibilityChange = () => {
        if (document.visibilityState === 'hidden') {
            setUserSwitchTab(prevValue => prevValue + 1);
            Swal.fire({
                title: 'Warning',
                text: 'Your test will cancelled please donot leave the test until completed',
                icon: 'warning',
                showCancelButton: false,
            });
        }
    };

    useEffect(() => {
        if (userSwitchTab === 2) {
            setTestCompleted(true);
            setTimeDone(true);
        }
    }, [userSwitchTab])

    useEffect(() => {
        document.addEventListener('visibilitychange', handleVisibilityChange);
        return () => {
            document.removeEventListener('visibilitychange', handleVisibilityChange);
        };
    }, []);

    useEffect(() => {
        const data = allMcqDataContextAPI.data;
        if (data !== undefined) {
            setShowLoader(false);
            setMcqData(data[0]);
            setFormSettings(data[1]);
            sessionStorage.setItem('welcome_message', data[1]['ThankuNotes']);
            setSectionDetails(data[2]);
        }
    }, [allMcqDataContextAPI]);

    useEffect(() => {
        if (timeDone && testCompleted && screenShotsSet) {
            setShowLoader(true);
            // Here api will get called...
            const responsePromise = SaveFormData(formResponse, screenshotsURL, userSwitchTab);
            responsePromise.then(response => {
                onHandleSubmitPage();
            }).catch(error => {
                console.error(error);
            });
        }
    }, [timeDone, testCompleted, screenShotsSet]);

    const sectionDetailsHandle = (sectionDetails) => {
        const name = sectionDetails?.name ?? '';
        const description = sectionDetails?.description ?? '';
        setSectionName(name);
        setSectionDescription(description);
    }

    const handleTimerComplete = useCallback(() => {
        setTestCompleted(true);
    }, []);

    const submitData = useCallback((formData) => {
        setFormResponse(formData);
        setTestCompleted(true);
        setTimeDone(true);
    }, []);

    const handleScreenShots = (screenshotsURLs) => {
        setScreenshotsURL(screenshotsURLs);
        setScreenShotsSet(true);
    }

    if (sessionStorage.getItem('google_sheet_id') == undefined) {
        window.location.href = './';
        return <></>;
    }

    return (
        <>
            {
                showLoader && <div style={styles.loaderContainer}>
                    <ColorRing color="#00BFFF" height={80} width={80} />
                </div>
            }
            {
                showLoader === false ?
                    <div className='row mainContainr'>
                        {
                            Object.keys(mcqData).length > 0 ?
                                <Webcam
                                    testCompleted={testCompleted}
                                    onTestCompleted={handleScreenShots}
                                    timeInSeconds={40000}
                                />
                                :
                                ''
                        }
                        <div className="col-md-6 App">
                            {
                                Object.keys(mcqData).length > 0 && testCompleted === false ?
                                    <Timer
                                        time={formSettings['TimerSet']}
                                        onHandleTimerComplete={handleTimerComplete}
                                    />
                                    :
                                    ''
                            }
                            <Headerstop
                                sectionName={sectionName}
                                sectionDescription={sectionDescription}
                            />
                            <RenderQuestion
                                mcqData={mcqData}
                                sectionDetailsHandle={sectionDetailsHandle}
                                sectionDetails={sectionDetails}
                                onSubmitData={submitData}
                                testCompleted={testCompleted}
                            />
                        </div>
                    </div> : ''
            }
        </>
    );
}

export default QuestionPage;
