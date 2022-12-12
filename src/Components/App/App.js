import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Session from '../Session/Session.js';
import Finish from '../Finish/Finish.js';
import Header from '../Header/Header.js';
import Home from "../Home/Home.js"
import Movie from '../Movie/Movie.js';
import './app_style.css';

export default function App() {
    return (
        <>
        <Router>
            <Header visible={false}/>
            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/movie/:id" element={<Movie/>} />
                <Route path="/session/:id" element={<Session/>}/>
                <Route path="/sucesso" element={<Finish/>}/>
            </Routes>
        </Router>
        </>
    )
}