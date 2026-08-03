import instance from "./instance";

export const getChatRooms = () => instance.get("/api/chat-rooms");
