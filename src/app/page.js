"use client"

import { useState, useEffect } from "react";
import ServerSidebar from "@/components/sidebar/ServerSidebar";
import ChannelSidebar from "@/components/sidebar/ChannelSidebar";
import RightSidebar from "@/components/sidebar/RightSidebar";
import ChatHeader from "@/components/chat/ChatHeader";
import MessageList from "@/components/chat/MessageList";
import MessageInput from "@/components/chat/MessageInput";
import StartChat from "@/components/chat/StartChat";

export default function Home() {
    // State preparation for Frappe integration
    const [activeTab, setActiveTab] = useState("messages");
    const [activeView, setActiveView] = useState("chat");
    const [activeChatId, setActiveChatId] = useState(null);
    const [isDarkMode, setIsDarkMode] = useState(false);
    const [isRightSidebarOpen, setIsRightSidebarOpen] = useState(false);

    // User Presence State
    const [currentUser, setCurrentUser] = useState({
        id: "me",
        name: "Administrator",
        initials: "PK",
        tag: "1337",
        status: "online"
    });
    const [isMuted, setIsMuted] = useState(false);
    const [isDeafened, setIsDeafened] = useState(false);

    // Internal mockup of available chats
    const [chats, setChats] = useState([]);

    // Centralized member data (to be replaced by Frappe API)
    const [members, setMembers] = useState([]);

    // Sync theme with body class
    useEffect(() => {
        if (isDarkMode) {
            document.documentElement.classList.add("dark");
        } else {
            document.documentElement.classList.remove("dark");
        }
    }, [isDarkMode]);

    // Data structures ready for API hydration
    const currentMessages = [];
    const chatDetails = null;
    const activeChat = chats.find(c => c.id === activeChatId) || null;

    const handleSendMessage = (msg) => {
        console.log("Sending to Frappe: ", msg);
    };

    const handleHeaderAction = (action) => {
        if (action === 'chat-details') {
            setIsRightSidebarOpen(true);
        }
    };

    const handleInviteClick = () => {
        setActiveView("invite");
    };

    const handleStartChat = (member) => {
        // Check if chat already exists
        const existingChat = chats.find(c => c.id === member.id);
        if (!existingChat) {
            const newChat = {
                id: member.id,
                name: member.name,
                initials: member.initials,
                lastMessage: "Start a conversation!",
                time: "Now",
                unread: 0,
                online: member.status === 'online'
            };
            setChats([newChat, ...chats]);
        }

        setActiveChatId(member.id);
        setActiveView("chat");
    };

    return (
        <div className="flex h-screen w-full bg-[var(--bg-tertiary)] p-3 gap-3 overflow-hidden relative font-sans text-[var(--text-primary)] transition-colors duration-300">

            {/* Background ambient accents for depth */}


            {/* Far Left Nav Sidebar */}
            <ServerSidebar
                activeTab={activeTab}
                onTabSelect={(tab) => {
                    setActiveTab(tab);
                    setActiveView("chat");
                }}
                isDarkMode={isDarkMode}
                toggleTheme={() => setIsDarkMode(!isDarkMode)}
            />

            {/* Primary Chat List Sidebar */}
            <ChannelSidebar
                chats={chats}
                activeChatId={activeChatId}
                onChatSelect={(id) => {
                    setActiveChatId(id);
                    setActiveView("chat");
                }}
                onInviteClick={handleInviteClick}
                activeTab={activeTab}
                // User Presence Props
                currentUser={currentUser}
                isMuted={isMuted}
                isDeafened={isDeafened}
                onMuteToggle={() => setIsMuted(!isMuted)}
                onDeafenToggle={() => {
                    if (!isDeafened) {
                        setIsMuted(true);
                        setIsDeafened(true);
                    } else {
                        setIsDeafened(false);
                    }
                }}
                onStatusChange={(status) => setCurrentUser(prev => ({ ...prev, status }))}
                onSettingsClick={() => console.log("Settings clicked")}
            />

            {/* Main Content Area */}
            <main className="flex-1 flex flex-col gap-3 min-w-0 z-10">
                {activeView === 'chat' ? (
                    <>
                        <ChatHeader
                            activeChat={activeChat}
                            onActionClick={handleHeaderAction}
                        />

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
                    </>
                ) : (
                    <StartChat
                        members={members}
                        onClose={() => setActiveView("chat")}
                        onStartChat={handleStartChat}
                    />
                )}
            </main>

            {/* Right Details Sidebar */}
            {activeView === 'chat' && (
                <RightSidebar
                    details={chatDetails}
                    isOpen={isRightSidebarOpen}
                    onClose={() => setIsRightSidebarOpen(false)}
                />
            )}
        </div>
    );
}
