import React, { useState } from 'react';
import './NumberInputQuestion.css';

function NumberInputQuestion({ question, onFormDataChange, formData }) {
    const [answer, setAnswer] = useState('');

    function handleAnswerChange(event) {
        const value = event.target.value;
        onFormDataChange(`Question${question.questionNumber}`, value);
        setAnswer(event.target.value);
    }

    return (
        <div className="NumberInputQuestion">
            <div className="NumberInputQuestion-question-container">
                {question.image && <img className="NumberInputQuestion-image" src={question.image} alt="Question" />}
                <div className="NumberInputQuestion-question">{question.question}</div>
                <div className='textdiscriptins'> {question.description}</div>
                {question.image && <img className="NumberInputQuestion-image" src={question.image} alt="Question" />}
            </div>
            <div className="NumberInputQuestion-answer">
                <input
                    className='form-control'
                    type="number"
                    value={formData[`Question${question.questionNumber}`] ? formData[`Question${question.questionNumber}`] : answer}
                    onChange={handleAnswerChange}
                    required={question.required === 'yes'}
                />
            </div>
        </div>
    );
}

export default NumberInputQuestion;
