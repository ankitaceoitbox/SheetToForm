// import React, { useEffect, useState } from 'react'
// import TextInputQuestion from './text/textquestion';
// import RadioQuestion from './radio_question/radio_question';
// import CheckboxQuestion from './checkbox/checkbox';
// import NumberInputQuestion from './number/numberinput_question';
// import EmailInputQuestion from './email_question/emailQuestion';
// import TextareaQuestion from './textarea/textarea_question';
// import DateInputQuestion from './date/datequestion';
// import TimeInputQuestion from './time/timequestion';
// import './renderQuestion.css';

// function RenderQuestion({ mcqData, sectionDetailsHandle, sectionDetails, formSettings, onSubmitData, testCompleted, snapShots }) {
//     const sections = Object.keys(mcqData);
//     const [currentSection, setCurrentSection] = useState(0);
//     const [currentQuestion, setCurrentQuestion] = useState(1);
//     const [formData, setFormData] = useState({});

//     const handleNext = () => {
//         if (currentSection < sections.length - 1) {
//             setCurrentSection(currentSection + 1);
//         }
//     }

//     const handlePrev = () => {
//         if (currentSection > 0) {
//             setCurrentSection(currentSection - 1);
//         }
//     }

//     const handleFormDataChange = (key, value) => {
//         setFormData({ ...formData, [key]: value });
//     }

//     /** This will get called when clicked on submit button or when timer is over */
//     const submitAnswer = () => {
//         onSubmitData(formData);
//     }

//     useEffect(() => {
//         window.scrollTo(0, 0);
//         sectionDetailsHandle(sectionDetails[`Section${currentSection + 1}`]);
//     }, [sectionDetails, currentSection]);

//     useEffect(() => {
//         if (testCompleted && snapShots.length > 0) {
//             const data = {
//                 ...formData,
//                 ['SnapShotArray']: snapShots
//             }
//             setFormData({ ...formData, ['SnapShotArray']: snapShots });
//             onSubmitData(data);
//         }
//     }, [testCompleted, snapShots]);

//     if (sections.length === 0) {
//         return <></>;
//     }

//     return (
//         <>
//             {
//                 mcqData[sections[currentSection]].map((questions) => {
//                     const questionNumber = questions['questionNumber'];
//                     const questionType = questions['questionType'];
//                     if (questionType == 'Text') {
//                         return <TextInputQuestion key={questionNumber} question={questions} onFormDataChange={handleFormDataChange} formData={formData} />;
//                     } else if (questionType == 'Radio') {
//                         return <RadioQuestion key={questionNumber} question={questions} onFormDataChange={handleFormDataChange} formData={formData} />;
//                     } else if (questionType == 'Checkbox') {
//                         return <CheckboxQuestion key={questionNumber} question={questions} onFormDataChange={handleFormDataChange} formData={formData} />;
//                     } else if (questionType == 'Number') {
//                         return <NumberInputQuestion key={questionNumber} question={questions} onFormDataChange={handleFormDataChange} formData={formData} />;
//                     } else if (questionType == 'Email') {
//                         return <EmailInputQuestion key={questionNumber} question={questions} onFormDataChange={handleFormDataChange} formData={formData} />;
//                     } else if (questionType == 'TextArea') {
//                         return <TextareaQuestion key={questionNumber} question={questions} onFormDataChange={handleFormDataChange} formData={formData} />;
//                     } else if (questionType == 'Date') {
//                         return <DateInputQuestion key={questionNumber} question={questions} onFormDataChange={handleFormDataChange} formData={formData} />;
//                     } else if (questionType == 'Time') {
//                         return <TimeInputQuestion key={questionNumber} question={questions} onFormDataChange={handleFormDataChange} formData={formData} />;
//                     } else {
//                         return <div key={questionNumber}></div>;
//                     }
//                 })
//             }
//             <div style={{ display: 'flex', justifyContent: 'space-between' }}>
//                 {
//                     currentSection > 0 ?
//                         <button onClick={handlePrev}>Previous</button> : ''
//                 }
//                 {
//                     currentSection === sections.length - 1 ?
//                         <button className='submit' onClick={submitAnswer}>Submit</button>
//                         :
//                         <button onClick={handleNext} className="show-hide" disabled={currentSection === sections.length - 1}>Next</button>
//                 }
//             </div>
//         </>
//     )
// }

// export default RenderQuestion;

import React, { useEffect, useState } from 'react'
import TextInputQuestion from './text/textquestion';
import RadioQuestion from './radio_question/radio_question';
import CheckboxQuestion from './checkbox/checkbox';
import NumberInputQuestion from './number/numberinput_question';
import EmailInputQuestion from './email_question/emailQuestion';
import TextareaQuestion from './textarea/textarea_question';
import DateInputQuestion from './date/datequestion';
import TimeInputQuestion from './time/timequestion';
import './renderQuestion.css';

function RenderQuestion({ mcqData, sectionDetailsHandle, sectionDetails, formSettings, onSubmitData, testCompleted, snapShots }) {
    const sections = Object.keys(mcqData);
    const [currentSection, setCurrentSection] = useState(0);
    const [currentQuestion, setCurrentQuestion] = useState(0);
    const [formData, setFormData] = useState({});

    const handleNext = () => {
        if (currentQuestion < mcqData[sections[currentSection]].length - 1) {
            setCurrentQuestion(currentQuestion + 1);
        } else if (currentSection < sections.length - 1) {
            setCurrentSection(currentSection + 1);
            setCurrentQuestion(0);
        }
    };

    const handlePrev = () => {
        if (currentQuestion > 0) {
            setCurrentQuestion(currentQuestion - 1);
        } else if (currentSection > 0) {
            setCurrentSection(currentSection - 1);
            setCurrentQuestion(mcqData[sections[currentSection - 1]].length - 1);
        }
    };

    const handleFormDataChange = (key, value) => {
        setFormData({ ...formData, [key]: value });
    };

    /** This will get called when clicked on submit button or when timer is over */
    const submitAnswer = () => {
        onSubmitData(formData);
    };

    useEffect(() => {
        window.scrollTo(0, 0);
        sectionDetailsHandle(sectionDetails[`Section${currentSection + 1}`]);
    }, [sectionDetails, currentSection]);

    useEffect(() => {
        if (testCompleted && snapShots.length > 0) {
            const data = {
                ...formData,
                ['SnapShotArray']: snapShots
            }
            setFormData({ ...formData, ['SnapShotArray']: snapShots });
            onSubmitData(data);
        }
    }, [testCompleted, snapShots]);

    if (sections.length === 0) {
        return <></>;
    }

    const currentSectionData = mcqData[sections[currentSection]];
    const currentQuestionData = currentSectionData[currentQuestion];
    const questionNumber = currentQuestionData['questionNumber'];
    const questionType = currentQuestionData['questionType'];

    if (sections.length === 0) {
        return <></>;
    }

    return (
        <>
            {
                questionType === 'Text' ?
                    <TextInputQuestion key={questionNumber} question={currentQuestionData} onFormDataChange={handleFormDataChange} formData={formData} />
                    : questionType === 'Radio' ?
                        <RadioQuestion key={questionNumber} question={currentQuestionData} onFormDataChange={handleFormDataChange} formData={formData} />
                        : questionType === 'Checkbox' ?
                            <CheckboxQuestion key={questionNumber} question={currentQuestionData} onFormDataChange={handleFormDataChange} formData={formData} />
                            : questionType === 'Number' ?
                                <NumberInputQuestion key={questionNumber} question={currentQuestionData} onFormDataChange={handleFormDataChange} formData={formData} />
                                : questionType === 'Email' ?
                                    <EmailInputQuestion key={questionNumber} question={currentQuestionData} onFormDataChange={handleFormDataChange} formData={formData} />
                                    : questionType === 'TextArea' ?
                                        <TextareaQuestion key={questionNumber} question={currentQuestionData} onFormDataChange={handleFormDataChange} formData={formData} />
                                        : questionType === 'Date' ?
                                            <DateInputQuestion key={questionNumber} question={currentQuestionData} onFormDataChange={handleFormDataChange} formData={formData} />
                                            : questionType === 'Time' ?
                                                <TimeInputQuestion key={questionNumber} question={currentQuestionData} onFormDataChange={handleFormDataChange} formData={formData} />
                                                : ''
            }
            <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                {
                    currentQuestion > 0 || currentSection > 0 ?
                        <button onClick={handlePrev}>Previous</button> : ''
                }
                {
                    currentSection === sections.length - 1 ?
                        <button className='submit' onClick={submitAnswer}>Submit</button>
                        :
                        <button onClick={handleNext} className="show-hide" disabled={currentSection === sections.length - 1}>Next</button>
                }
            </div>
        </>
    )
}

export default RenderQuestion;
