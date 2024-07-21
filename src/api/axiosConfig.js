import axios from "axios";

// Axios 인스턴스 생성
const instance = axios.create({
  baseURL: "http://192.168.0.12:8000", // 기본 호스트 주소 설정
  headers: {
    "Content-Type": "application/json; charset=utf-8",
  },
});

// 요청 인터셉터를 추가하여 토큰을 모든 요청 헤더에 추가
api.interceptors.request.use(config => {
  const token = localStorage.getItem('token');
  if (token) {
      config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
}, error => {
  return Promise.reject(error);
});

export default instance;
