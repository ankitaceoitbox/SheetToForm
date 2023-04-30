import React, { useEffect, useState } from 'react';
import './CheckboxQuestion.css';

function CheckboxQuestion({ question, onFormDataChange, formData }) {
    const [selectedOptions, setSelectedOptions] = useState([]);
    const [checked, setChecked] = useState(false);

    function handleOptionChange(event) {
        const optionValue = event.target.value;
        setSelectedOptions(selectedOptions => {
            const formarr = formData[`Question${question.questionNumber}`] ? formData[`Question${question.questionNumber}`] : [];
            let res = Array.from(new Set([...selectedOptions, optionValue, ...formarr]));
            if (event.target.checked === false) {
                res = res.filter(d => d !== optionValue);
            }
            setChecked(true);
            return res;
        });
    }

    useEffect(() => {
        if (checked) {
            onFormDataChange(`Question${question.questionNumber}`, selectedOptions);
        }
    }, [selectedOptions, checked]);

    return (
        <div className='checkboxs'>
            <div className={`CheckboxQuestion${question.images ? '' : '--no-image'}`}>
                <div className="CheckboxQuestion-question">{question.question}</div>
                <div className='textdiscriptins'> {question.description}</div>
                {question.images && (
                    <div className="CheckboxQuestion-image">
                        <img src={question.images} alt="question image" className='CheckboxQuestion-images' />
                    </div>
                )}
                <div className="CheckboxQuestion-options">
                    <form>
                        {question.options.split(',').map((option, index) => (
                            <div key={index}>
                                <input
                                    type="checkbox"
                                    id={`option-${index}`}
                                    name={`option-${index}`}
                                    value={option}
                                    onChange={handleOptionChange}
                                    checked={formData[`Question${question.questionNumber}`] ? formData[`Question${question.questionNumber}`].includes(option) : false}
                                    required={question.required === 'yes'}
                                />
                                <label htmlFor={`option-${index}`}>{option}</label>
                            </div>
                        ))}
                    </form>
                </div>
            </div>
        </div>
    );
}

export default CheckboxQuestion;
