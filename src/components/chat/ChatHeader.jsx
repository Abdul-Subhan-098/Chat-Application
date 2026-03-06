import { Phone, Video, MoreVertical, Users } from "lucide-react";

export default function ChatHeader({
    activeChat = null,
    onActionClick = () => { }
}) {
    return (
        <div className="bg-[#FFFFFF] dark:bg-[#1E1E24]  rounded-[20px] h-16 px-6 flex flex-shrink-0 items-center justify-between shadow-sm border border-[#E2E8F0] dark:border-[#333338]">

            {/* Title & Avatars */}
            {!activeChat ? (
                <div className="text-sm font-semibold text-[#64748B] dark:text-[#9CA3AF]">No Chat Selected</div>
            ) : (
                <div className="flex items-center gap-4">
                    <h1 className="text-lg font-bold text-[#1F272E] dark:text-[#F9FAFB]">{activeChat.title || "Chat Detail"}</h1>

                    <div className="flex items-center gap-2 bg-gray-50 dark:bg-gray-900 pl-1.5 pr-3 py-1 rounded-full border border-[#E2E8F0] dark:border-[#333338]">
                        <div className="flex -space-x-1.5">
                            {activeChat.participants && activeChat.participants.length > 0 ? (
                                activeChat.participants.slice(0, 3).map((participant, i) => (
                                    <div key={i} className="w-6 h-6 rounded-full bg-gray-200 dark:bg-gray-600 border-2 border-[#FFFFFF] dark:border-[#1E1E24] flex items-center justify-center text-[9px] font-bold text-gray-500 dark:text-gray-300">
                                        {participant.name?.charAt(0) || "U"}
                                    </div>
                                ))
                            ) : (
                                <div className="w-6 h-6 rounded-full bg-gray-200 dark:bg-gray-600 border-2 border-[#FFFFFF] dark:border-[#1E1E24] flex items-center justify-center">
                                    <Users size={12} className="text-gray-400" />
                                </div>
                            )}
                        </div>
                        {activeChat.participants?.length > 3 && (
                            <span className="text-[#1778F2] dark:text-blue-400 font-bold text-[10px] bg-[#EBF4FF] dark:bg-blue-900/30 px-1.5 py-0.5 rounded-full ml-0.5">
                                +{activeChat.participants.length - 3}
                            </span>
                        )}
                    </div>
                </div>
            )}

            {/* Action Buttons */}
            <div className="flex items-center gap-1.5">
                <button
                    onClick={() => onActionClick('call')}
                    className="w-8 h-8 rounded-lg text-gray-400 hover:text-gray-700 hover:bg-gray-100 dark:hover:bg-gray-700 dark:hover:text-gray-200 flex items-center justify-center transition"
                    disabled={!activeChat}
                >
                    <Phone size={16} />
                </button>
                <button
                    onClick={() => onActionClick('video')}
                    className="w-8 h-8 rounded-lg text-gray-400 hover:text-gray-700 hover:bg-gray-100 dark:hover:bg-gray-700 dark:hover:text-gray-200 flex items-center justify-center transition"
                    disabled={!activeChat}
                >
                    <Video size={16} />
                </button>
                <div className="w-[1px] h-5 bg-gray-200 dark:bg-gray-700 mx-1"></div>
                <button
                    onClick={() => onActionClick('options')}
                    className="w-8 h-8 rounded-lg text-gray-400 hover:text-gray-700 hover:bg-gray-100 dark:hover:bg-gray-700 dark:hover:text-gray-200 flex items-center justify-center transition"
                    disabled={!activeChat}
                >
                    <MoreVertical size={16} />
                </button>
            </div>

        </div>
    );
}
