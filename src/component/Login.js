import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import './Login.css';

const Login = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const navigate = useNavigate();

    const handleChange = (e) => {
        const { name, value } = e.target;
        name === 'username' ? setUsername(value) : setPassword(value);
    };

    const handleSignUp = () => {
        // 회원가입 페이지로 이동
        navigate("/signup");
      };


    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');
        try {
            const response = await axios.post('http://192.168.0.12:8000/api/v1/users/login/', {
                username,
                password
            });

            const { token, user_id } = response.data; // 서버 응답에서 토큰과 사용자 ID 추출
            console.log('Login successful:', token);

            // 토큰과 사용자 ID를 로컬 스토리지에 저장
            localStorage.setItem('token', token);
            localStorage.setItem('user_id', user_id);

            // 저장된 값 확인
            console.log('Token stored:', localStorage.getItem('token'));
            console.log('User ID stored:', localStorage.getItem('user_id'));

            

            // 로그인 성공 시 페이지 이동
            navigate('/start');
        } catch (error) {
            console.error('There was an error logging in!', error);
            setError('로그인 실패. 다시 시도해주세요.');
        }
    };

    return (
        <div className='login-page'>
            <div className="img-container">
                <img src='/logo.png' alt="이미지 설명" />
            </div>
            <form onSubmit={handleSubmit}>
                <label>
                    <input
                        type="text"
                        name="username"
                        placeholder="아이디"
                        value={username}
                        onChange={handleChange}
                    />
                </label>
                <br />
                <label>
                    <input
                        type="password"
                        name="password"
                        placeholder="비밀번호"
                        value={password}
                        onChange={handleChange}
                    />
                </label>
                <br />
                {error && <p className="error">{error}</p>}
                <div className="container">
                    <button type="submit" className="loginbutton">로그인</button>
                    <button type="button" className="signbutton" onClick={handleSignUp}>
            회원가입
          </button>
                </div>
            </form>
        </div>
    );
};

export default Login;
