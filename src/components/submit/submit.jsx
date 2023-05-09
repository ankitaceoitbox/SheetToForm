import React from 'react';
import './submit.css';

function SubmitPage() {
    return (
        <div className="completed-page">
            <div className="completed-container">
                <div>
                    <i class="fa-solid fa-square-check"></i>
                </div>
                <h1 className="completed-heading">Test Completed!</h1>
                <p className="completed-message">Thank you for taking the test.</p>
            </div>
        </div>
    );
}

export default SubmitPage;
