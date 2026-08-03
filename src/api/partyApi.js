import instance from "./instance";

export const createParty = (data) => instance.post("/api/parties", data);

export const getPartyDetail = (partyId) =>
  instance.get(`/api/parties/${partyId}`);

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
