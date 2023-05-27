import React from 'react';
import './submit.css';

function SubmitPage() {
    if (sessionStorage.getItem("google_sheet_id") == null) {
        window.location.href = "/";
    }
    const message = sessionStorage.getItem("welcome_message");
    try {
        sessionStorage.removeItem("google_sheet_id");
        sessionStorage.removeItem("google_passing_percent");
        sessionStorage.removeItem("welcome_message");
    } catch (e) { }
    return (
        <div className="completed-page">
            <div className="completed-container">
                <div>
                    <i className="fa-solid fa-square-check"></i>
                </div>
                <h1 className="completed-heading">Test Completed!</h1>
                <p className="completed-message">{message}</p>
            </div>
        </div>
    );
}

export default SubmitPage;
