import React, { useState } from 'react';
import './EmailInputQuestion.css';

function EmailInputQuestion({ question, onFormDataChange, formData }) {
    const [answer, setAnswer] = useState('');
    const [validationError, setValidationError] = useState('');

    function handleAnswerChange(event) {
        const value = event.target.value;
        onFormDataChange(`Question${question.questionNumber}`, value);
        setAnswer(value);
    }

    function validateEmail(email) {
        const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return re.test(email);
    }

    function handleValidation() {
        if (question.required === 'yes' && !answer) {
            setValidationError('This field is required');
        } else if (answer && !validateEmail(answer)) {
            setValidationError('Please enter a valid email address');
        } else {
            setValidationError('');
        }
    }

    return (
        <div className="EmailInputQuestion">
            <div className="EmailInputQuestion-question-container">
                <div className="EmailInputQuestion-question">{question.question}</div>
                <div className='textdiscriptins'> {question.description}</div>
                {question.image && <img className="EmailInputQuestion-image" src={question.image} alt="Question" />}
            </div>
            <div className="EmailInputQuestion-answer">
                <input
                    className='form-control'
                    type="email"
                    value={formData[`Question${question.questionNumber}`] ? formData[`Question${question.questionNumber}`] : answer}
                    onChange={handleAnswerChange}
                    onBlur={handleValidation}
                    required={question.required === 'yes'}
                />
                {validationError && <div className="EmailInputQuestion-validation-error">{validationError}</div>}
            </div>
        </div>
    );
}

export default EmailInputQuestion;
