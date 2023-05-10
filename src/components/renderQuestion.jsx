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

function RenderQuestion({ mcqData, sectionDetailsHandle, sectionDetails, onSubmitData, testCompleted }) {
    console.log(mcqData, 'mcq')
    const sections = Object.keys(mcqData);
    const [currentSection, setCurrentSection] = useState(0);
    const [currentQuestion, setCurrentQuestion] = useState(0);
    const [formData, setFormData] = useState({});

    const handleNext = () => {
        if (currentSection === 0) {
            setCurrentSection(1);
            setCurrentQuestion(0);
            return;
        }
        if (currentQuestion < mcqData[sections[currentSection]].length - 1) {
            setCurrentQuestion(currentQuestion + 1);
        } else if (currentSection < sections.length - 1) {
            setCurrentSection(currentSection + 1);
            setCurrentQuestion(0);
        }
    };

    const handlePrev = () => {
        if (currentSection === 1) {
            setCurrentSection(0);
            setCurrentQuestion(0);
            return;
        }
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
        if (testCompleted) {
            const data = {
                ...formData,
            }
            console.log(3);
            onSubmitData(data);
        }
    }, [testCompleted]);

    if (sections.length === 0) {
        return <></>;
    }

    const currentSectionData = mcqData[sections[currentSection]];
    const currentQuestionData = currentSectionData[currentQuestion];
    const questionNumber = currentQuestionData['questionNumber'];
    const questionType = currentQuestionData['questionType'];
    const required = currentQuestionData['required'];

    if (sections.length === 0) {
        return <></>;
    }

    return (
        <>
            {
                currentSection > 0 ?
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
                    :
                    mcqData['Section1'].map(data => {
                        const questionType = data.questionType;
                        const questionNumber = data.questionNumber;
                        const currentQuestionData = data;
                        return questionType === 'Text' ?
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
                    })
            }
            <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                {
                    currentQuestion > 0 || currentSection > 0 ?
                        <button onClick={handlePrev}>Previous</button> : ''
                }
                {
                    (currentSection === sections.length - 1 && currentQuestion === currentSectionData.length - 1) ?
                        <button className='submit' onClick={submitAnswer}>Submit</button>
                        :
                        <button onClick={handleNext}
                            className="show-hide"
                            disabled={
                                (
                                    (
                                        formData[`Question${questionNumber}`] === undefined
                                        ||
                                        (
                                            typeof formData[`Question${questionNumber}`] === 'object'
                                            &&
                                            formData[`Question${questionNumber}`].length === 0
                                        )
                                        ||
                                        (
                                            typeof formData[`Question${questionNumber}`] === 'string'
                                            &&
                                            formData[`Question${questionNumber}`].trim() === ''
                                        )
                                    )
                                    &&
                                    required === true
                                )
                                // ||
                                // currentSection === sections.length - 1
                            }>
                            Next
                        </button>
                }
            </div>
        </>
    )
}

export default RenderQuestion;
