import { useEffect, useRef, useState, useCallback } from "react";
import { getStompClient } from "../api/stompClient";

export function useChatRoom(partyId) {
  const [messages, setMessages] = useState([]);
  const [isConnected, setIsConnected] = useState(false);
  const subscriptionRef = useRef(null);

  useEffect(() => {
    if (!partyId) return;

    const client = getStompClient();

    const subscribe = () => {
      subscriptionRef.current = client.subscribe(
        `/topic/parties/${partyId}`,
        (frame) => {
          const message = JSON.parse(frame.body);
          setMessages((prev) =>
            prev.some((m) => m.messageId === message.messageId)
              ? prev
              : [...prev, message],
          );
        },
      );
      setIsConnected(true);
    };

    if (client.connected) {
      subscribe();
    } else {
      client.onConnect = subscribe;
    }

    return () => {
      subscriptionRef.current?.unsubscribe();
      subscriptionRef.current = null;
      setIsConnected(false);
    };
  }, [partyId]);

  const sendMessage = useCallback(
    (content) => {
      const client = getStompClient();

      if (!client.connected) {
        console.warn("아직 연결 안 됨");
        return;
      }
      if (!content?.trim()) return;

      client.publish({
        destination: `/app/parties/${partyId}/chat`,
        body: JSON.stringify({ content }),
      });
    },
    [partyId],
  );

  const prependMessages = useCallback((older) => {
    setMessages((prev) => [...older, ...prev]);
  }, []);

  return { messages, sendMessage, isConnected, prependMessages };
}
