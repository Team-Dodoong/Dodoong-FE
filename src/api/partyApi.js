import instance from "./instance";

export const createParty = (data) => instance.post("/api/parties", data);

export const getPartyDetail = (partyId) =>
  instance.get(`/api/parties/${partyId}`);

export const joinParty = (partyId, partyPassword) =>
  instance.post(`/api/parties/${partyId}`, {
    partyPassword: partyPassword || null,
  });

export const searchParties = ({
  keyword,
  categories,
  page = 0,
  size = 20,
} = {}) =>
  instance.get("/api/parties/search", {
    params: {
      keyword,
      categories: categories?.length ? categories.join(",") : undefined,
      page,
      size,
    },
  });

export const getMyParties = ({ page = 0, size = 20 } = {}) =>
  instance.get("/api/parties/my", { params: { page, size } });

export const getPartyMonthlyStats = (partyId) =>
  instance.get(`/api/parties/${partyId}/me/monthly`);

export const getPartyVerifications = (partyId) =>
  instance.get(`/api/parties/${partyId}/verifications`);

export const getPartyMonthlyRanking = (partyId) =>
  instance.get(`/api/parties/${partyId}/ranking/monthly`);

export const leaveParty = (partyId) =>
  instance.delete(`/api/parties/${partyId}/leave`);

export const updateParty = (partyId, requestDto, imageFile) => {
  const formData = new FormData();
  formData.append(
    "requestDto",
    new Blob([JSON.stringify(requestDto)], { type: "application/json" }),
  );
  if (imageFile) {
    formData.append("image", imageFile);
  }
  return instance.patch(`/api/parties/${partyId}`, formData, {
    headers: { "Content-Type": "multipart/form-data" },
  });
};

export const submitVerification = (partyId, imageFile) => {
  const formData = new FormData();
  formData.append("image", imageFile);
  return instance.post(`/api/parties/${partyId}/verifications`, formData, {
    headers: { "Content-Type": "multipart/form-data" },
  });
};
