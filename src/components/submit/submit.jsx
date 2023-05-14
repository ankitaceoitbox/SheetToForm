import React from 'react';
import './submit.css';

function SubmitPage({ welcomPage }) {
    sessionStorage.removeItem("google_sheet_id");
    return (
        <div className="completed-page">
            <div className="completed-container">
                <div>
                    <i className="fa-solid fa-square-check"></i>
                </div>
                <h1 className="completed-heading">Test Completed!</h1>
                <p className="completed-message">{welcomPage.ThankuNotes}</p>
            </div>
        </div>
    );
}

export default SubmitPage;
