import instance from "./instance";

export const createParty = (data) => instance.post("/api/parties", data);
