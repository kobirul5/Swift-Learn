import { useEffect, useRef, useState, useCallback } from 'react';
const WS_URL = "wss://swift-learn.onrender.com";

export const useSocket = () => {
    const socket = useRef<WebSocket | null>(null);
    const reconnectTimer = useRef<ReturnType<typeof setTimeout> | null>(null);
    const shouldReconnect = useRef(true);
    const [isConnected, setIsConnected] = useState(false);
    const [messages, setMessages] = useState<any[]>([]);
    const [messageList, setMessageList] = useState<any[]>([]);
    const [lastEvent, setLastEvent] = useState<{ event: string, data: any } | null>(null);

    const connect = useCallback(() => {
        if (
            socket.current?.readyState === WebSocket.OPEN ||
            socket.current?.readyState === WebSocket.CONNECTING
        ) {
            return;
        }

        const ws = new WebSocket(WS_URL);
        socket.current = ws;

        ws.onopen = () => {
            console.log("WebSocket Connected:", WS_URL);
            setIsConnected(true);

            if (reconnectTimer.current) {
                clearTimeout(reconnectTimer.current);
                reconnectTimer.current = null;
            }

            // Authenticate using token from localStorage
            const token = typeof window !== 'undefined' ? localStorage.getItem('accessToken') : null;
            if (token) {
                ws.send(JSON.stringify({ event: 'authenticate', token }));
            }
        };

        ws.onmessage = (event) => {
            const parsedData = JSON.parse(event.data);
            setLastEvent(parsedData);

            if (parsedData.event === 'message') {
                setMessages((prev) => [...prev, parsedData.data]);
            } else if (parsedData.event === 'fetchChats') {
                setMessages(parsedData.data.chats);
            } else if (parsedData.event === 'messageList') {
                setMessageList(parsedData.data);
            }
        };

        ws.onclose = (event) => {
            console.log("WebSocket Disconnected:", {
                code: event.code,
                reason: event.reason || "No reason provided",
                wasClean: event.wasClean,
                url: WS_URL
            });
            setIsConnected(false);

            if (!shouldReconnect.current) return;

            // Reconnect after 3 seconds
            reconnectTimer.current = setTimeout(connect, 3000);
        };

        ws.onerror = (event) => {
            console.error("WebSocket Error:", {
                eventType: event.type,
                readyState: ws.readyState,
                url: WS_URL
            });
        };
    }, []);

    useEffect(() => {
        shouldReconnect.current = true;
        connect();

        return () => {
            shouldReconnect.current = false;
            if (reconnectTimer.current) {
                clearTimeout(reconnectTimer.current);
                reconnectTimer.current = null;
            }
            socket.current?.close();
        };
    }, [connect]);

    const sendMessage = (receiverId: string, message: string, images: string[] = []) => {
        if (socket.current?.readyState === WebSocket.OPEN) {
            socket.current.send(JSON.stringify({
                event: 'message',
                receiverId,
                message,
                images
            }));
        }
    };

    const fetchChats = (receiverId: string) => {
        if (socket.current?.readyState === WebSocket.OPEN) {
            socket.current.send(JSON.stringify({
                event: 'fetchChats',
                receiverId
            }));
        }
    };

    const fetchMessageList = () => {
        if (socket.current?.readyState === WebSocket.OPEN) {
            socket.current.send(JSON.stringify({
                event: 'messageList'
            }));
        }
    };

    return {
        isConnected,
        messages,
        messageList,
        lastEvent,
        sendMessage,
        fetchChats,
        fetchMessageList,
        setMessages
    };
};
