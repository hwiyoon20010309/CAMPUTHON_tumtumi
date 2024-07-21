import React from "react";
import { useNavigate } from "react-router-dom";
import "./Start.css";

function Start() {
  const navigate = useNavigate();

  const handleStart = () => {
    navigate("/home"); // 다음 페이지 경로로 변경
  };

  return (
    <div className="start-page">
      <div className="start-img-container">
        <img src="/logo.png" alt="이미지 설명" />
        <div className="start-container">
          <button className="startbutton" onClick={handleStart}>
            시작하기
          </button>
        </div>
      </div>
    </div>
  );
}

export default Start;
