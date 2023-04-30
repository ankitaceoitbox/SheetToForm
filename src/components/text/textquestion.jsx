import React, { useState } from 'react';
import './TextInputQuestion.css';

function TextInputQuestion({ question, onFormDataChange, formData }) {
    const [answer, setAnswer] = useState('');

    function handleAnswerChange(event) {
        const value = event.target.value;
        onFormDataChange(`Question${question.questionNumber}`, value);
        setAnswer(value);
    }

    return (
        <div className="TextInputQuestion">
            <div className="TextInputQuestion-question-container">
                <div className="TextInputQuestion-question">{question.question}</div>
                <div className='textdiscriptins'> {question.description}</div>
                {question.images && <img className="TextInputQuestion-image" src={question.images} alt="Question" />}

            </div>
            <div className="TextInputQuestion-answer">
                <input
                    className='form-control'
                    type="text"
                    value={formData[`Question${question.questionNumber}`] ? formData[`Question${question.questionNumber}`] : answer}
                    onChange={handleAnswerChange}
                    required={question.required === 'yes'}
                />
            </div>
        </div>
    );
}

export default TextInputQuestion;
