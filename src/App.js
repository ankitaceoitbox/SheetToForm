import './App.css';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import LoginPage from './Pages/LoginPage';
import QuestionPage from './Pages/QuestionPage';

function App() {
    const handleOTPCheck = (sheetId) => {
        sessionStorage.setItem('google_sheet_id', sheetId);
        window.location.href = `./test`;
    }

    return (
        <>
            <BrowserRouter>
                <Routes>
                    <Route path='/' element={<LoginPage onHandleOTPCheck={handleOTPCheck} />}></Route>
                    <Route path='/test' element={<QuestionPage />}></Route>
                </Routes>
            </BrowserRouter>
        </>
    );
}

export default App;
