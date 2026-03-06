import { MessageSquare } from "lucide-react";

export default function MessageList({
    messages = [],
    currentUser = null
}) {
    return (
        <div className="bg-[#FFFFFF] dark:bg-[#1E1E24]  rounded-[20px] absolute inset-0 overflow-y-auto p-4 sm:p-6 shadow-sm border border-[#E2E8F0] dark:border-[#333338] custom-scrollbar flex flex-col gap-4">

            {messages.length === 0 ? (
                <div className="h-full flex flex-col items-center justify-center text-gray-400">
                    <MessageSquare size={32} className="mb-3 opacity-20" />
                    <p className="text-sm font-medium">No messages yet.</p>
                    <p className="text-xs mt-1 opacity-70">Send a message to start the conversation.</p>
                </div>
            ) : (
                messages.map((message, index) => {
                    const isSentByMe = Boolean(currentUser && message.senderId === currentUser.id);
                    const showDateSeparator = shouldShowDateSeparator(messages, index);

                    return (
                        <div key={message.id || index} className="flex flex-col">
                            {/* Date Separator */}
                            {showDateSeparator && (
                                <div className="flex justify-center my-3">
                                    <span className="bg-gray-50 dark:bg-gray-900 border border-[#E2E8F0] dark:border-[#333338] text-gray-400 font-medium text-[10px] px-3 py-1 rounded-full uppercase tracking-wider">
                                        {formatDate(message.timestamp)}
                                    </span>
                                </div>
                            )}

                            {/* Message Row */}
                            <div className={`flex gap-3 ${isSentByMe ? 'justify-end' : 'justify-start'} mt-1`}>

                                {/* Avatar for received messages */}
                                {!isSentByMe && (
                                    <div className="relative flex-shrink-0 mt-0.5">
                                        <div className="w-7 h-7 flex items-center justify-center rounded-full text-[10px] font-bold text-white shadow-inner bg-gray-400 dark:bg-gray-600 uppercase">
                                            {message.senderName?.charAt(0) || "U"}
                                        </div>
                                    </div>
                                )}

                                {/* Message Content */}
                                <div className={`flex flex-col gap-1 max-w-[75%] ${isSentByMe ? 'items-end' : 'items-start'}`}>
                                    <div
                                        className={`rounded-2xl p-3 shadow-sm relative group
                      ${isSentByMe
                                                ? 'bg-blue-600 text-white rounded-tr-sm'
                                                : 'bg-[#F4F5F6] dark:bg-[#2B2B30] text-[#1F272E] dark:text-[#F9FAFB] rounded-tl-sm border border-gray-100 dark:border-gray-600/50'
                                            }`}
                                    >

                                        {/* Render specific message types here if needed (images, files, system messages) */}
                                        {message.type === 'system' ? (
                                            <p className="text-xs font-medium italic opacity-80">{message.content}</p>
                                        ) : (
                                            <p className="text-[13px] leading-relaxed break-words whitespace-pre-wrap">
                                                {message.content}
                                            </p>
                                        )}

                                    </div>
                                    <span className="text-[10px] text-gray-400 mx-1">{formatTime(message.timestamp)}</span>
                                </div>

                                {/* Optional alignment spacer or read receipt for sent messages */}
                                {isSentByMe && (
                                    <div className="w-5 h-5 flex-shrink-0 mt-auto ml-1">
                                        {message.isRead && (
                                            <div className="w-4 h-4 rounded-full bg-blue-100 text-[#1778F2] text-[8px] flex items-center justify-center ml-1">✓✓</div>
                                        )}
                                    </div>
                                )}

                            </div>
                        </div>
                    );
                })
            )}

        </div>
    );
}

// Helper functions (could be moved to a utils file later)
function shouldShowDateSeparator(messages, currentIndex) {
    if (currentIndex === 0) return true;
    // Simplified logic: implement real date comparison based on your timestamp format
    const current = new Date(messages[currentIndex].timestamp).toDateString();
    const previous = new Date(messages[currentIndex - 1].timestamp).toDateString();
    return current !== previous;
}

function formatDate(timestamp) {
    if (!timestamp) return "Today";
    return new Date(timestamp).toLocaleDateString('en-US', { day: 'numeric', month: 'long', year: 'numeric' });
}

function formatTime(timestamp) {
    if (!timestamp) return "";
    return new Date(timestamp).toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' });
}
