import React, { useState } from 'react';
import './TextareaQuestion.css';

function TextareaQuestion({ question, onFormDataChange, formData }) {
    const [answer, setAnswer] = useState('');

    function handleAnswerChange(event) {
        setAnswer(event.target.value);
    }

    return (
        <div className="TextareaQuestion">
            <div className="TextareaQuestion-question-container">
                {question.image && <img className="TextareaQuestion-image" src={question.image} alt="Question" />}
                <div className="TextareaQuestion-question">{question.question}</div>
            </div>
            <div className="TextareaQuestion-answer">
                <textarea
                    className='form-control'
                    value={answer}
                    onChange={handleAnswerChange}
                    required={question.required === 'yes'}
                />
            </div>
        </div>
    );
}

export default TextareaQuestion;
