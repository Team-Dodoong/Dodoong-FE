import instance from "./instance";

export const getChatRooms = () => instance.get("/api/chat-rooms");

export const getChatHistory = (partyId, { cursor, size = 30 } = {}) =>
  instance.get(`/api/parties/${partyId}/chats`, {
    params: { cursor, size },
  });
