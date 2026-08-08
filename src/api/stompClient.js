import { Client } from "@stomp/stompjs";

let client = null;

export function getStompClient() {
  if (client) return client;

  client = new Client({
    brokerURL: import.meta.env.VITE_WS_URL,
    reconnectDelay: 5000, // 끊기면 5초 뒤 재연결
    heartbeatIncoming: 10000, // 서버 → 나 heartbeat
    heartbeatOutgoing: 10000, // 나 → 서버 heartbeat

    // 디버그 로그 (개발할 때만)
    debug: (msg) => {
      if (import.meta.env.DEV) console.log("[STOMP]", msg);
    },
  });

  return client;
}

export async function activateStomp() {
  const c = getStompClient();
  // 이전 로그인 세션의 연결이 남아있으면 끊고 새 쿠키로 다시 연결
  if (c.active) {
    await c.deactivate();
  }

  const token = localStorage.getItem("token");
  c.connectHeaders = token ? { Authorization: `Bearer ${token}` } : {};

  c.activate();
}

export function deactivateStomp() {
  if (client?.active) client.deactivate();
}
