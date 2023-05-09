import React from 'react';
import './RadioQuestion.css';

function RadioQuestion({ question, onFormDataChange, formData }) {

    function handleOptionChange(event) {
        const optionValue = event.target.value;
        onFormDataChange(`Question${question.questionNumber}`, optionValue);
    }

    return (
        <div className={`RadioQuestion${question.image ? '' : '--no-image'}`}>
            <div className="RadioQuestion-question">{question.question}</div>
            <div className='textdiscriptins'> {question.description}</div>
            {question.images && (
                <div className="RadioQuestion-image">
                    <img src={question.images} alt={question.questionNumber} className='RadioQuestion-images' />
                </div>
            )}
            <div className="RadioQuestion-options">
                <form>
                    {
                        question.options.split(',').map((option, index) => (
                            <div key={index}>
                                <input
                                    type="radio"
                                    id={`option-${index}`}
                                    name={`option`}
                                    value={option}
                                    onChange={handleOptionChange}
                                    checked={formData[`Question${question.questionNumber}`] === option}
                                    required={question.required === 'yes'}
                                />
                                <label htmlFor={`option-${index}`}>{option}</label>
                            </div>
                        ))
                    }
                </form>
            </div>
            {question.images && (
                <div className="RadioQuestion-image">
                    <img src={question.images} alt="" />
                </div>
            )}
        </div>
    );
}

export default RadioQuestion;
