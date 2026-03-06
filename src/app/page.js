"use client"

import { useState, useEffect } from "react";
import ServerSidebar from "@/components/sidebar/ServerSidebar";
import ChannelSidebar from "@/components/sidebar/ChannelSidebar";
import RightSidebar from "@/components/sidebar/RightSidebar";
import ChatHeader from "@/components/chat/ChatHeader";
import MessageList from "@/components/chat/MessageList";
import MessageInput from "@/components/chat/MessageInput";

export default function Home() {
    // State preparation for Frappe integration
    const [activeTab, setActiveTab] = useState("messages");
    const [activeChatId, setActiveChatId] = useState(null);
    const [isDarkMode, setIsDarkMode] = useState(false);

    // Sync theme with body class
    useEffect(() => {
        if (isDarkMode) {
            document.documentElement.classList.add("dark");
        } else {
            document.documentElement.classList.remove("dark");
        }
    }, [isDarkMode]);

    // Empty data structures ready for API hydration
    const chats = [];
    const currentMessages = [];
    const chatDetails = null; // null triggers empty state in RightSidebar
    const activeChat = null; // null triggers default state in ChatHeader
    const currentUser = { id: "me", name: "User" };

    const handleSendMessage = (msg) => {
        console.log("Sending to Frappe: ", msg);
    };

    return (
        <div className="flex h-screen w-full bg-[var(--bg-tertiary)] p-3 gap-3 overflow-hidden relative font-sans text-[var(--text-primary)]">

            {/* Background ambient accents for depth */}


            {/* Far Left Nav Sidebar */}
            <ServerSidebar
                activeTab={activeTab}
                onTabSelect={setActiveTab}
                userInitials="PK"
                isDarkMode={isDarkMode}
                toggleTheme={() => setIsDarkMode(!isDarkMode)}
            />

            {/* Primary Chat List Sidebar */}
            <ChannelSidebar
                chats={chats}
                activeChatId={activeChatId}
                onChatSelect={setActiveChatId}
            />

            {/* Main Chat Area */}
            <main className="flex-1 flex flex-col gap-3 min-w-0 z-10">
                <ChatHeader activeChat={activeChat} />

                <div className="flex-1 overflow-hidden relative">
                    <MessageList
                        messages={currentMessages}
                        currentUser={currentUser}
                    />
                </div>

                <MessageInput
                    onSendMessage={handleSendMessage}
                    disabled={!activeChatId}
                />
            </main>

            {/* Right Details Sidebar */}
            <RightSidebar details={chatDetails} />
        </div>
    );
}
