import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "./Home.css";
import axios from "axios";

function Home() {
  const navigate = useNavigate();
  const [topics, setTopics] = useState([]);
  const [sortBy, setSortBy] = useState("");
  const [categoryFilter, setCategoryFilter] = useState("모두");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          "http://192.168.0.12:8000/api/v1/topics/"
        );
        setTopics(response.data);
        setLoading(false);
      } catch (error) {
        setError("데이터를 가져오는데 실패했습니다.");
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const handleNavigate = (path) => {
    navigate(path);
  };

  const handleSortByLatest = () => {
    setSortBy("latest");
  };

  const handleSortByPopularity = () => {
    setSortBy("popularity");
  };

  const handleCategoryFilter = (category) => {
    setCategoryFilter(category);
  };

  const sortByLatest = (data) => {
    return [...data].sort(
      (a, b) => new Date(b.uploadDate) - new Date(a.uploadDate)
    );
  };

  const sortByPopularity = (data) => {
    return [...data].sort((a, b) => b.opinionsNumber - a.opinionsNumber);
  };

  const filteredData = topics.filter((topic) => {
    if (categoryFilter === "모두") {
      return true; // 모든 데이터를 보여줌
    } else {
      return topic.category === categoryFilter;
    }
  });

  const sortedTopics =
    sortBy === "latest"
      ? sortByLatest(filteredData)
      : sortBy === "popularity"
      ? sortByPopularity(filteredData)
      : filteredData;

  const topicItems = sortedTopics.map((topic) => (
    <div
      key={topic.id}
      className="topic-item"
      onClick={() => handleNavigate(`/topicdetail/${topic.id}`)}
    >
      <div>
        <img src={topic.image} alt="" className="topic-image" />
      </div>
      <div className="topic-info">
        <p className="topic-title">{topic.title}</p>
        <p className="opinions-number">
          {topic.opinionsNumber}개의 국룰 제시됨
        </p>
      </div>
    </div>
  ));

  if (loading) {
    return <div>로딩 중...</div>;
  }

  if (error) {
    return <div>{error}</div>;
  }

  return (
    <div className="home-page">
      <header className="header">
        <img src="/logo2.png" alt="로고" className="logo2" />
        <h3>홈</h3>
        <div className="icons">
          <span
            className="search-icon"
            onClick={() => handleNavigate("/search")}
          >
            🔍
          </span>
          <span className="profile-icon">🔔</span>
        </div>
      </header>
      <main className="main-content">
        <section className="topic-section">
          <h2>토론중인 주제</h2>
          <h4>
            정렬순서
            <span className="view-all" onClick={handleSortByPopularity}>
              {" "}
              · 인기순
            </span>{" "}
            <span className="view-all" onClick={handleSortByLatest}>
              {" "}
              · 최신순
            </span>
          </h4>
          <div className="home-category">
            <h4>
              카테고리
              <span
                className={`home-category-item ${
                  categoryFilter === "모두" ? "active" : ""
                }`}
                onClick={() => handleCategoryFilter("모두")}
              >
                모두
              </span>
              <span
                className={`home-category-item ${
                  categoryFilter === "학교" ? "active" : ""
                }`}
                onClick={() => handleCategoryFilter("학교")}
              >
                학교
              </span>
              <span
                className={`home-category-item ${
                  categoryFilter === "영화" ? "active" : ""
                }`}
                onClick={() => handleCategoryFilter("영화")}
              >
                영화
              </span>
              <span
                className={`home-category-item ${
                  categoryFilter === "데이트" ? "active" : ""
                }`}
                onClick={() => handleCategoryFilter("데이트")}
              >
                데이트
              </span>
              <span
                className={`home-category-item ${
                  categoryFilter === "공연" ? "active" : ""
                }`}
                onClick={() => handleCategoryFilter("공연")}
              >
                공연
              </span>
              <span
                className={`home-category-item ${
                  categoryFilter === "기타" ? "active" : ""
                }`}
                onClick={() => handleCategoryFilter("기타")}
              >
                기타
              </span>
            </h4>
          </div>
          <div>{topicItems}</div>
        </section>
      </main>
      <button
        className="register-button"
        onClick={() => handleNavigate("/register")}
      >
        + 주제 등록하기
      </button>
      <footer className="footer">
        <button className="nav-button">📚</button>
        <button className="nav-button" onClick={() => handleNavigate("/home")}>
          🏠
        </button>
        <button
          className="nav-button"
          onClick={() => handleNavigate("/mypage")}
        >
          👤
        </button>
      </footer>
    </div>
  );
}

export default Home;
