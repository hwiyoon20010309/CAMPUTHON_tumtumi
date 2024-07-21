import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import './Register.css';

function Register() {
    const navigate = useNavigate();
    const [alertVisible, setAlertVisible] = useState(false);
    const [title, setTitle] = useState('');
    const [content, setContent] = useState('');
    const [category, setCategory] = useState('');
    const [image, setImage] = useState(null);
    const [error, setError] = useState('');

    const handleNavigate = (path) => {
        navigate(path);
    };

    const handleTitleChange = (e) => {
        setTitle(e.target.value);
    };

    const handleContentChange = (e) => {
        setContent(e.target.value);
    };

    const handleCategorySelect = (category) => {
        setCategory(category);
    };

    const handleImageChange = (e) => {
        setImage(e.target.files[0]);
    };

    const handleSubmit = async () => {
        const formData = new FormData();
        formData.append('title', title);
        formData.append('content', content);
        formData.append('category', category);
        formData.append('valid', true);
        formData.append('image', image);

        try {
            const token = localStorage.getItem('token');
            const response = await axios.post(
                'http://192.168.0.12:8000/api/v1/topics/new_topic',
                formData,
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                        'Content-Type': 'multipart/form-data',
                    },
                }
            );
            if (response.status === 201) {
                setAlertVisible(true);
            }
        } catch (error) {
            if (error.response && error.response.data) {
                // 서버에서 반환된 에러 메시지 출력
                console.error('Error response:', error.response.data);
                setError(`등록 실패: ${JSON.stringify(error.response.data)}`);
            } else {
                console.error('Error registering topic:', error);
                setError('등록에 실패했습니다. 다시 시도해주세요.');
            }
        }
    };

    const handleAlertConfirm = () => {
        setAlertVisible(false);
        handleNavigate('/home');
    };

    return (
        <div className='register-page'>
            <header className='register-header'>
                <button className='back-button' onClick={() => handleNavigate('/home')}>←</button>
                <h3>주제 등록하기</h3>
                <div className='placeholder'></div>
            </header>
            
            <main className='main-content'>
                <div className='upload-section'>
                    <input type='file' onChange={handleImageChange} className='upload-image' />
                </div>
                <input
                    type='text'
                    placeholder='제목'
                    className='input-title'
                    value={title}
                    onChange={handleTitleChange}
                />
                <textarea
                    placeholder='상황 설명'
                    className='input-description'
                    value={content}
                    onChange={handleContentChange}
                ></textarea>
                <div className='category-section'>
                    <h4>카테고리</h4>
                    <div className='register-category'>
                        <span className={`register-category-item ${category === '문학, 책' ? 'selected' : ''}`} onClick={() => handleCategorySelect('문학, 책')}>문학, 책</span>
                        <span className={`register-category-item ${category === '영화' ? 'selected' : ''}`} onClick={() => handleCategorySelect('영화')}>영화</span>
                        <span className={`register-category-item ${category === '미술, 디자인' ? 'selected' : ''}`} onClick={() => handleCategorySelect('미술, 디자인')}>미술, 디자인</span>
                        <span className={`register-category-item ${category === '공연, 전시' ? 'selected' : ''}`} onClick={() => handleCategorySelect('공연, 전시')}>공연, 전시</span>
                        <span className={`register-category-item ${category === '운동' ? 'selected' : ''}`} onClick={() => handleCategorySelect('운동')}>운동</span>
                    </div>
                    <div className='register-category-notice'>{category === '' ? '카테고리 선택 안 함' : `선택된 카테고리: ${category}`}</div>
                </div>
                {error && <p className="error">{error}</p>}
                <button className='submit-button' onClick={handleSubmit}>등록하기</button>
            </main>
            <footer className='footer'>
                <button className='nav-button' onClick={() => handleNavigate('/dictionary')}>📚</button>
                <button className='nav-button' onClick={() => handleNavigate('/home')}>🏠</button>
                <button className='nav-button' onClick={() => handleNavigate('/mypage')}>👤</button>
            </footer>
            {alertVisible && (
                <div className='alert-overlay'>
                    <div className='alert-box'>
                        <p>등록이 완료되었습니다.</p>
                        <button className='alert-button' onClick={handleAlertConfirm}>확인</button>
                    </div>
                </div>
            )}
        </div>
    );
}

export default Register;
