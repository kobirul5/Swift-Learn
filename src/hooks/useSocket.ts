import { useEffect, useRef, useState, useCallback } from 'react';
import Cookies from 'js-cookie';

const WS_URL = process.env.NEXT_PUBLIC_WS_URL || "ws://localhost:5000";

export const useSocket = () => {
    const socket = useRef<WebSocket | null>(null);
    const [isConnected, setIsConnected] = useState(false);
    const [messages, setMessages] = useState<any[]>([]);
    const [messageList, setMessageList] = useState<any[]>([]);
    const [lastEvent, setLastEvent] = useState<{ event: string, data: any } | null>(null);

    const connect = useCallback(() => {
        if (socket.current?.readyState === WebSocket.OPEN) return;

        const ws = new WebSocket(WS_URL);
        socket.current = ws;

        ws.onopen = () => {
            console.log("WebSocket Connected");
            setIsConnected(true);
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

        ws.onclose = () => {
            console.log("WebSocket Disconnected");
            setIsConnected(false);
            // Reconnect after 3 seconds
            setTimeout(connect, 3000);
        };

        ws.onerror = (error) => {
            console.error("WebSocket Error:", error);
        };
    }, []);

    useEffect(() => {
        connect();
        return () => {
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
