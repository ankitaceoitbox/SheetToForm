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

function QuestionPage() {
    const { allMcqDataContextAPI } = ContextData();
    const [mcqData, setMcqData] = useState({});
    const [sectionDetails, setSectionDetails] = useState({});
    const [formSettings, setFormSettings] = useState({});
    const [sectionName, setSectionName] = useState('');
    const [sectionDescription, setSectionDescription] = useState('');
    const [testCompleted, setTestCompleted] = useState(false);
    const [formResponse, setFormResponse] = useState({});
    const [responseSave, setResponseSave] = useState(false);
    const [timeDone, setTimeDone] = useState(false);

    const handleVisibilityChange = () => {
        if (document.visibilityState === 'hidden') {
            console.log('User has switched to a different tab or window');
            Swal.fire({
                title: 'Warning',
                text: 'Your test will cancelled please donot leave the test until completed',
                icon: 'warning',
                showCancelButton: false,
            }).then((result) => {
            });
        } else {
            console.log('User is back to the tab');
        }
    };

    useEffect(() => {
        document.addEventListener('visibilitychange', handleVisibilityChange);
        return () => {
            document.removeEventListener('visibilitychange', handleVisibilityChange);
        };
    }, []);

    useEffect(() => {
        const data = allMcqDataContextAPI.data;
        if (data !== undefined) {
            setMcqData(data[0]);
            setFormSettings(data[1]);
            setSectionDetails(data[2]);
        }
    }, [allMcqDataContextAPI]);

    useEffect(() => {
        if (timeDone && testCompleted) {
            // Here api will get called...
            const responsePromise = SaveFormData(formResponse);
            responsePromise.then(response => {
                setResponseSave(true);
                // sessionStorage.removeItem("google_sheet_id");
            }).catch(error => {
                console.error(error);
            });
        }
    }, [timeDone, testCompleted]);

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

    if (sessionStorage.getItem('google_sheet_id') == undefined) {
        window.location.href = './';
        return <></>;
    }

    return (
        <>
            {
                responseSave === false ?
                    <div className='row mainContainr'>
                        {
                            Object.keys(mcqData).length > 0 ?
                                <Webcam
                                    testCompleted={testCompleted}
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
                    </div> : <SubmitPage welcomPage={formSettings} />
            }
        </>
    );
}

export default QuestionPage;
