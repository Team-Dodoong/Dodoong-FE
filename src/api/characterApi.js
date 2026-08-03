import instance from "./instance";

export const getCharacters = () => instance.get("/api/characters");

export const getOwnedCharacters = () => instance.get("/api/characters/me");

export const getEquippedCharacter = () =>
  instance.get("/api/characters/me/equipped");

export const equipCharacter = (characterId) =>
  instance.patch(`/api/characters/${characterId}/equip`);

export const getCharacterDetail = (characterId) =>
  instance.get(`/api/characters/${characterId}`);

export const purchaseCharacter = (characterId) =>
  instance.post(`/api/characters/${characterId}/purchase`);
