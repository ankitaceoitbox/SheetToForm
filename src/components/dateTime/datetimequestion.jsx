import React, { useState } from 'react';
import './DateTimeInputQuestion.css';

function DateTimeInputQuestion({ question, onFormDataChange, formData }) {
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
        <div className="DateTimeInputQuestion">
            <div className="DateTimeInputQuestion-question-container">
                {question.image && <img className="DateTimeInputQuestion-image" src={question.image} alt="Question" />}
                <div className="DateTimeInputQuestion-question">{question.question}</div>
            </div>
            <div className="DateTimeInputQuestion-answer">
                <input
                    className='form-control'
                    type="datetime-local"
                    value={answer}
                    onChange={handleAnswerChange}
                    onBlur={handleValidation}
                    required={question.required === 'yes'}
                // min={question.min}
                // max={question.max}
                />
                {validationError && <div className="DateTimeInputQuestion-validation-error">{validationError}</div>}
            </div>
        </div>
    );
}

export default DateTimeInputQuestion;
