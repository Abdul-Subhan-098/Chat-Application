import { Mic, Paperclip, FileText, Send, Loader2 } from "lucide-react";
import { useState } from "react";

export default function MessageInput({
    onSendMessage = () => { },
    isTyping = false,
    typingUserStr = "",
    disabled = false
}) {
    const [message, setMessage] = useState("");
    const [isSending, setIsSending] = useState(false);

    const handleSend = () => {
        if (!message.trim() || disabled) return;

        setIsSending(true);
        // Simulate async dispatch if needed, or just let parent handle state
        onSendMessage(message);
        setMessage("");
        setIsSending(false);
    };

    const handleKeyDown = (e) => {
        if (e.key === 'Enter' && !e.shiftKey) {
            e.preventDefault();
            handleSend();
        }
    };

    return (
        <div className="bg-[var(--bg-primary)] rounded-[20px] p-3 flex flex-col gap-1 shadow-sm border border-[var(--border-primary)] flex-shrink-0">

            {/* Typing Indicator */}
            <div className={`flex items-center gap-2 px-3 transition-opacity duration-200 h-4 ${isTyping ? 'opacity-100' : 'opacity-0'}`}>
                <div className="flex gap-1">
                    <span className="w-1 h-1 bg-[var(--accent-primary)] rounded-full animate-bounce"></span>
                    <span className="w-1 h-1 bg-[var(--accent-primary)] rounded-full animate-bounce delay-100"></span>
                    <span className="w-1 h-1 bg-[var(--accent-primary)] rounded-full animate-bounce delay-200"></span>
                </div>
                <span className="text-[10px] text-[var(--text-muted)] font-medium">{typingUserStr} is typing...</span>
            </div>

            <div className="flex items-center gap-2">
                {/* Input Field Wrapper */}
                <div className={`flex-1 bg-[var(--bg-secondary)] rounded-xl pr-1.5 pl-4 py-1.5 flex items-center border border-[var(--border-primary)] transition-all ${!disabled && 'focus-within:ring-1 ring-[var(--accent-primary)]/50 focus-within:border-[var(--accent-primary)]/50'}`}>
                    <input
                        type="text"
                        value={message}
                        onChange={(e) => setMessage(e.target.value)}
                        onKeyDown={handleKeyDown}
                        disabled={disabled}
                        placeholder="Type your message..."
                        className="flex-1 bg-transparent border-none outline-none text-[var(--text-primary)] text-[13px] placeholder-[var(--text-muted)] disabled:opacity-50"
                    />
                </div>

                {/* Action Buttons */}
                <div className="flex items-center gap-0.5">
                    <button title="Voice note" disabled={disabled} className="w-8 h-8 flex items-center justify-center text-[var(--text-muted)] hover:text-[var(--text-primary)] transition rounded-lg hover:bg-[var(--bg-tertiary)] disabled:opacity-50">
                        <Mic size={16} />
                    </button>
                    <button title="Attach file" disabled={disabled} className="w-8 h-8 flex items-center justify-center text-[var(--text-muted)] hover:text-[var(--text-primary)] transition rounded-lg hover:bg-[var(--bg-tertiary)] disabled:opacity-50">
                        <Paperclip size={16} />
                    </button>

                    <button
                        onClick={handleSend}
                        disabled={disabled || !message.trim()}
                        className="w-9 h-9 flex items-center justify-center bg-[var(--accent-primary)] text-[var(--accent-text)] rounded-lg ml-1 shadow-sm hover:bg-[var(--accent-hover)] transition-all disabled:opacity-50 disabled:hover:bg-[var(--accent-primary)]"
                    >
                        {isSending ? <Loader2 size={14} className="animate-spin" /> : <Send size={14} className="ml-0.5" />}
                    </button>
                </div>
            </div>

        </div>
    );
}
