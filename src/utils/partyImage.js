// 이미지 미등록 파티에 대해 백엔드가 "" 대신 더미 URL(test-image.com)을 내려줘서 별도로 걸러낸다.
const isPlaceholderImage = (url) =>
  typeof url === "string" && url.includes("test-image.com");

export const getPartyImage = (url, fallback) =>
  url && !isPlaceholderImage(url) ? url : fallback;
