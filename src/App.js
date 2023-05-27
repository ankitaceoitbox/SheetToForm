import './App.css';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import LoginPage from './Pages/LoginPage';
import QuestionPage from './Pages/QuestionPage';
import ResponsePage from './Pages/ResponsePage';

function App() {
    const handleOTPCheck = (sheetId, passingPercentage) => {
        sessionStorage.setItem('google_sheet_id', sheetId);
        sessionStorage.setItem('google_passing_percent', passingPercentage);
        window.location.href = `./test`;
    }

    const goToSubmitPage = () => {
        window.location.href = "./submit_response";
    }

    return (
        <>
            <BrowserRouter>
                <Routes>
                    <Route path='/' element={<LoginPage onHandleOTPCheck={handleOTPCheck} />}></Route>
                    <Route path='/test' element={<QuestionPage onHandleSubmitPage={goToSubmitPage} />}></Route>
                    <Route path='/submit_response' element={<ResponsePage />}></Route>
                </Routes>
            </BrowserRouter>
        </>
    );
}

export default App;
