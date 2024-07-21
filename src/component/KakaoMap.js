import React, { useEffect } from "react";

const KakaoMap = () => {
  useEffect(() => {
    // 카카오 지도 SDK 로드
    const script = document.createElement("script");
    script.async = true;
    script.src = `//dapi.kakao.com/v2/maps/sdk.js?appkey=1870d14bdf6596bad3f0a87b698f34f0&autoload=false`;
    document.head.appendChild(script);

    script.onload = () => {
      // 카카오 맵 API 초기화
      window.kakao.maps.load(() => {
        const container = document.getElementById("kakao-map");
        const options = {
          center: new window.kakao.maps.LatLng(37.566826, 126.9786567), // 초기 지도 중심 좌표
          level: 5, // 지도 확대 레벨
        };
        const map = new window.kakao.maps.Map(container, options);

        // 사용자의 현재 위치 가져오기
        navigator.geolocation.getCurrentPosition(
          (position) => {
            const lat = position.coords.latitude; // 위도
            const lng = position.coords.longitude; // 경도

            // 현재 위치 마커 생성
            const markerPosition = new window.kakao.maps.LatLng(lat, lng);
            const marker = new window.kakao.maps.Marker({
              position: markerPosition,
            });

            // 마커를 지도에 표시
            marker.setMap(map);

            // 지도 중심 좌표를 현재 위치로 설정
            map.setCenter(markerPosition);
          },
          (error) => {
            console.error("Error getting current position:", error);
          }
        );
      });
    };

    return () => {
      document.head.removeChild(script);
    };
  }, []);

  return <div id="kakao-map" style={{ width: "100%", height: "1000px" }}></div>;
};

export default KakaoMap;
