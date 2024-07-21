import React from "react";
import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from "./component/Login";
import Signup from "./component/Signup";
import Home from "./component/Home";
import Start from "./component/Start";
import Mypage from "./component/Mypage";
import Register from "./component/Register";
import Search from "./component/Search";
import KakaoMap from "./component/KakaoMap";

const App = () => {
  return (
    <BrowserRouter>
      <div className="App">
        <div className="content">
          <Routes>
            <Route path="/" element={<Login />} />
            <Route path="/signup" element={<Signup />} />
            <Route path="/start" element={<Start />} />
            <Route path="/home" element={<Home />} />
            <Route path="/mypage" element={<Mypage />} />
            <Route path="/register" element={<Register />} />
            <Route path="/search" element={<Search />} />
            <Route path="/kakaoMap" element={<KakaoMap />} />
          </Routes>
        </div>
      </div>
    </BrowserRouter>
  );
};

export default App;
