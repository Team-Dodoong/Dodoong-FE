import { Client } from "@stomp/stompjs";

let client = null;

function getWebSocketUrl() {
  // 로컬 개발
  if (import.meta.env.DEV) {
    return import.meta.env.VITE_WS_URL;
  }

  // 배포
  const protocol = window.location.protocol === "https:" ? "wss:" : "ws:";

  return `${protocol}//${window.location.host}/ws`;
}

export function getStompClient() {
  if (client) {
    return client;
  }

  client = new Client({
    brokerURL: getWebSocketUrl(),
    reconnectDelay: 5000,
    heartbeatIncoming: 10000,
    heartbeatOutgoing: 10000,

    debug: (msg) => {
      if (import.meta.env.DEV) {
        console.log("[STOMP]", msg);
      }
    },
  });

  return client;
}

export async function activateStomp() {
  const stompClient = getStompClient();

  if (stompClient.active) {
    await stompClient.deactivate();
  }

  stompClient.activate();
}

export function deactivateStomp() {
  if (client?.active) {
    client.deactivate();
  }
}
