"use client"

import { useState } from "react";
import { Search, MessageCircle, X } from "lucide-react";
import MemberCard from "./MemberCard";

/**
 * StartChat - Premium view controller for starting direct conversations.
 * Structured to receive dynamic data for future backend integration.
 */
export default function StartChat({ members = [], onClose, onStartChat }) {
    const [searchQuery, setSearchQuery] = useState("");

    const filteredMembers = members.filter(m =>
        m.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        m.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
        m.role?.toLowerCase().includes(searchQuery.toLowerCase())
    );

    return (
        <div className="flex-1 flex flex-col bg-[var(--bg-primary)] rounded-[32px] shadow-sm border border-[var(--border-primary)] overflow-hidden animate-in fade-in zoom-in-95 duration-500">
            {/* Glossy Header Area */}
            <header className="h-16 border-b border-[var(--border-primary)] flex items-center px-6 justify-between bg-gradient-to-r from-[var(--bg-primary)] to-[var(--bg-secondary)]/30 shrink-0">
                <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-lg bg-[var(--accent-primary)] text-white shadow-lg shadow-[var(--accent-primary)]/10 flex items-center justify-center">
                        <MessageCircle size={18} strokeWidth={2.5} />
                    </div>
                    <div>
                        <h2 className="text-sm font-black text-[var(--text-primary)] tracking-tight uppercase">Start a Conversation</h2>
                        <p className="text-[10px] text-[var(--text-muted)] font-bold uppercase opacity-70">Select a colleague</p>
                    </div>
                </div>
                <button
                    onClick={onClose}
                    className="p-2 rounded-full text-[var(--text-muted)] hover:text-[var(--text-primary)] hover:bg-[var(--bg-secondary)] border border-transparent hover:border-[var(--border-primary)] transition-all active:scale-90"
                    aria-label="Close"
                >
                    <X size={18} />
                </button>
            </header>

            <div className="flex-1 flex flex-col p-6 overflow-hidden">
                <div className="max-w-3xl mx-auto w-full flex flex-col h-full gap-6">

                    {/* Normalized Search Bar */}
                    <div className="relative group isolate">
                        <input
                            type="text"
                            placeholder="Search colleagues..."
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                            className="w-full bg-[var(--bg-secondary)] border border-[var(--border-primary)] text-[var(--text-primary)] text-xs rounded-xl py-2.5 pl-10 pr-4 outline-none focus:ring-2 focus:ring-[var(--accent-primary)]/20 focus:border-[var(--accent-primary)] transition-all font-medium placeholder-[var(--text-muted)]"
                        />
                        <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 text-[var(--text-muted)] group-focus-within:text-[var(--accent-primary)] transition-colors" size={14} />
                    </div>

                    {/* Enhanced Member Scrolling List */}
                    <div className="flex-1 overflow-y-auto pr-2 custom-scrollbar">
                        <div className="grid grid-cols-1 gap-3 pb-8">
                            {filteredMembers.length > 0 ? (
                                filteredMembers.map((member, index) => (
                                    <div
                                        key={member.id}
                                        className="animate-in fade-in slide-in-from-bottom-2 duration-300 fill-mode-both"
                                        style={{ animationDelay: `${index * 30}ms` }}
                                    >
                                        <MemberCard
                                            member={member}
                                            onAction={onStartChat}
                                        />
                                    </div>
                                ))
                            ) : (
                                <div className="py-16 flex flex-col items-center justify-center text-center bg-[var(--bg-secondary)]/10 rounded-[32px] border border-dashed border-[var(--border-primary)]">
                                    <div className="w-12 h-12 rounded-full bg-[var(--bg-tertiary)] flex items-center justify-center mb-3 text-[var(--text-muted)]">
                                        <Search size={24} />
                                    </div>
                                    <h3 className="text-sm font-bold text-[var(--text-primary)] mb-0.5">No matches found</h3>
                                    <p className="text-[11px] text-[var(--text-muted)] max-w-[200px] font-medium opacity-80">Try adjusting your search terms.</p>
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
