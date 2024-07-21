import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "./Search.css";
import MockData from "../mock.json";

function Search() {
  const [searchTerm, setSearchTerm] = useState("");
  const [filteredData, setFilteredData] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    // 초기 렌더링 시에 모든 데이터를 보여줌
    setFilteredData(MockData);
  }, []);

  const handleInputChange = (e) => {
    const value = e.target.value;
    setSearchTerm(value);

    // 검색어에 따라 필터링된 데이터를 업데이트
    const filteredResults = MockData.filter((item) =>
      item.title.toLowerCase().includes(value.toLowerCase())
    );
    setFilteredData(filteredResults);
  };

  const navigateBack = () => {
    navigate(-1); // 이전 페이지로 이동
  };

  const handleNavigate = (path) => {
    navigate(path);
  };

  return (
    <div className="search-page">
      <header className="search-header">
        <button className="back-button" onClick={navigateBack}>
          ←
        </button>
        <input
          type="text"
          placeholder="검색할 주제 입력"
          className="search-input"
          value={searchTerm}
          onChange={handleInputChange}
        />
      </header>
      <main className="search-main">
        <h3>인기 검색어</h3>
        <div className="popular-search">
          <span className="search-item">위닉스 공기청정기</span>
          <span className="search-item">LG 세탁기</span>
          <span className="search-item">필립스 스마트 조명</span>
        </div>
        <h3>카테고리 별 검색</h3>
        <div className="category-search">
          <span className="search-category-item">문학, 책</span>
          <span className="search-category-item">영화</span>
          <span className="search-category-item">미술, 디자인</span>
          <span className="search-category-item">공연, 전시</span>
          <span className="search-category-item">일상, 생각</span>
          <span className="search-category-item">게임</span>
          <span className="search-category-item">스포츠</span>
          <span className="search-category-item">기타</span>
          <span className="search-category-item">동영상</span>
        </div>
        {searchTerm !== "" && ( // 검색어가 비어 있지 않은 경우에만 검색 결과를 표시
          <div>
            <h3>검색 결과</h3>
            <div className="search-results">
              {filteredData.length > 0 ? (
                filteredData.map((item) => (
                  <div
                    key={item.id}
                    className="topic-item"
                    onClick={() => handleNavigate(`/topicdetail/${item.id}`)}
                  >
                    <div>
                      <img
                        src={item.imgUrl}
                        alt={item.title}
                        className="topic-image"
                      />
                    </div>
                    <div className="topic-info">
                      <p className="topic-title">{item.title}</p>
                      <p className="opinions-number">
                        {item.opinionsNumber}개의 국룰 제시됨
                      </p>
                    </div>
                  </div>
                ))
              ) : (
                <p>검색 결과가 없습니다.</p>
              )}
            </div>
          </div>
        )}
      </main>
    </div>
  );
}

export default Search;
