import React, { useState } from 'react';
import './DateInputQuestion.css';

function DateInputQuestion({ question, onFormDataChange, formData }) {
    const [answer, setAnswer] = useState('');
    const [validationError, setValidationError] = useState('');

    function handleAnswerChange(event) {
        const value = event.target.value;
        onFormDataChange(`Question${question.questionNumber}`, value);
        setAnswer(value);
    }

    function handleValidation() {
        if (question.required === 'yes' && !answer) {
            setValidationError('This field is required');
        } else {
            setValidationError('');
        }
    }

    return (
        <div className="DateInputQuestion">
            <div className="DateInputQuestion-question-container">
                <div className="DateInputQuestion-question">{question.question}</div>
                <div className='textdiscriptins'> {question.description}</div>
                {question.image && <img className="DateInputQuestion-image" src={question.image} alt="Question" />}
            </div>
            <div className="DateInputQuestion-answer">
                <input
                    className='form-control'
                    type="date"
                    value={formData[`Question${question.questionNumber}`] ? formData[`Question${question.questionNumber}`] : answer}
                    onChange={handleAnswerChange}
                    onBlur={handleValidation}
                    required={question.required === 'yes'}
                />
                {validationError && <div className="DateInputQuestion-validation-error">{validationError}</div>}
            </div>
        </div>
    );
}

export default DateInputQuestion;
