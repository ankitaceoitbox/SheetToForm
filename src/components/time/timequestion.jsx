import React, { useState } from 'react';
import './TimeInputQuestion.css';

function TimeInputQuestion({ question, onFormDataChange, formData }) {
    const [answer, setAnswer] = useState('');
    const [validationError, setValidationError] = useState('');

    function handleAnswerChange(event) {
        setAnswer(event.target.value);
    }

    function handleValidation() {
        if (question.required === 'yes' && !answer) {
            setValidationError('This field is required');
        } else {
            setValidationError('');
        }
    }

    return (
        <div className="TimeInputQuestion">
            <div className="TimeInputQuestion-question-container">
                {question.image && <img className="TimeInputQuestion-image" src={question.image} alt="Question" />}
                <div className="TimeInputQuestion-question">{question.question}</div>
            </div>
            <div className="TimeInputQuestion-answer">
                <input
                    className='form-control'
                    type="time"
                    value={answer}
                    onChange={handleAnswerChange}
                    onBlur={handleValidation}
                    required={question.required === 'yes'}
                    min={question.min}
                    max={question.max}
                />
                {validationError && <div className="TimeInputQuestion-validation-error">{validationError}</div>}
            </div>
        </div>
    );
}

export default TimeInputQuestion;
