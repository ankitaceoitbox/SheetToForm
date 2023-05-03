import './App.css';
import Headerstop from './components/heders/header';
import { ContextData } from './common/utils/contextdata';
import { useCallback, useEffect, useState } from 'react';
import RenderQuestion from './components/renderQuestion';
import Webcam from './common/utils/webcam';
import Timer from './common/utils/timer';
import SaveFormData from './services/submitDataToSheet';

function App() {
  const { allMcqDataContextAPI } = ContextData();
  const [mcqData, setMcqData] = useState({});
  const [sectionDetails, setSectionDetails] = useState({});
  const [formSettings, setFormSettings] = useState({});
  const [sectionName, setSectionName] = useState('');
  const [sectionDescription, setSectionDescription] = useState('');
  const [testCompleted, setTestCompleted] = useState(false);
  const [snapShotsArray, setSnapShotsArray] = useState([]);
  const [formResponse, setFormResponse] = useState({});

  useEffect(() => {
    const data = allMcqDataContextAPI.data;
    if (data != undefined) {
      setMcqData(data[0]);
      setFormSettings(data[1]);
      setSectionDetails(data[2]);
    }
  }, [allMcqDataContextAPI]);

  useEffect(() => {
    // if (testCompleted && formResponse['SnapShotArray']?.length > 0) {
    if (testCompleted) {
      // Here api will get called...
      console.log(formResponse);
      const responsePromise = SaveFormData(formResponse);
      responsePromise.then(response => {
        console.log(response.data);
      })
        .catch(error => {
          console.error(error);
        });
    }
  }, [testCompleted, formResponse]);

  const sectionDetailsHandle = (sectionDetails) => {
    const name = sectionDetails?.name ?? '';
    const description = sectionDetails?.description ?? '';
    setSectionName(name);
    setSectionDescription(description);
  }

  const handleTimerComplete = useCallback(() => {
    setTestCompleted(true);
  }, []);

  const handleSnapShots = useCallback((snapShotsArray) => {
    setSnapShotsArray(snapShotsArray);
  }, []);

  const submitData = useCallback((formData) => {
    setFormResponse(formData);
    setTestCompleted(true);
  }, [testCompleted]);

  return (
    <div className='row mainContainr'>
      {
        Object.keys(mcqData).length > 0 && snapShotsArray.length == 0 ?
          <Webcam
            time={formSettings['SnapShotTime']}
            onHandleSnapShots={handleSnapShots}
            testCompleted={testCompleted}
          />
          : ''
      }
      <div className="col-md-6 App">
        {
          Object.keys(mcqData).length > 0 && testCompleted == false ?
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
          formSettings={formSettings}
          sectionDetails={sectionDetails}
          onSubmitData={submitData}
          testCompleted={testCompleted}
          snapShots={snapShotsArray}
        />
      </div>
    </div>
  );
}

export default App;
