import React, { useState, useEffect } from 'react';
import { IconButton } from '@mui/material';
import { FiberManualRecord } from '@mui/icons-material';
import './RecordingButton.css'; // Import the CSS file for custom styles

function RecordingComponent() {
    const [isRecording, setIsRecording] = useState(false);

    useEffect(() => {
        setIsRecording(true);
    }, []);

    return (
        <IconButton className={isRecording ? 'recordingButton' : ''}>
            <FiberManualRecord fontSize="large" color="error" />
        </IconButton>
    );
}

export default RecordingComponent;
