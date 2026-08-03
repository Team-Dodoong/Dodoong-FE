import instance from "./instance";

export const getCharacters = () => instance.get("/api/characters");

export const getOwnedCharacters = () => instance.get("/api/characters/me");
