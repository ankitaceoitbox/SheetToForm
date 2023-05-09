import './App.css';
import Headerstop from './components/heders/header';
import { ContextData } from './common/utils/contextdata';
import { useCallback, useEffect, useState } from 'react';
import RenderQuestion from './components/renderQuestion';
import Webcam from './common/utils/webcam';
import Timer from './common/utils/timer';
import SaveFormData from './services/submitDataToSheet';
import SubmitPage from './components/submit/submit';

function App() {
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
  console.log('rendered');
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
      console.log(formResponse, 'time done');
      // Here api will get called...
      const responsePromise = SaveFormData(formResponse);
      responsePromise.then(response => {
        console.log(response.data);
        setResponseSave(true);
      })
        .catch(error => {
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
    console.log(1);
    setTestCompleted(true);
  }, []);

  const submitData = useCallback((formData) => {
    console.log(4, formData);
    setFormResponse(formData);
    setTestCompleted(true);
    setTimeDone(true);
  }, []);

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
          </div> : <SubmitPage />
      }
    </>
  );
}

export default App;
