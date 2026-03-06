"use client"

import { MessageSquare, Mail } from "lucide-react";

/**
 * MemberCard - Atom component for displaying a member in the list
 * Features production-grade status indicators and premium hover states.
 */
export default function MemberCard({ member, onAction }) {
    const getStatusConfig = (status) => {
        switch (status) {
            case "online":
                return {
                    color: "bg-emerald-500",
                    glow: "shadow-[0_0_10px_rgba(16,185,129,0.5)]",
                    label: "Online"
                };
            case "busy":
                return {
                    color: "bg-rose-500",
                    glow: "shadow-[0_0_10px_rgba(244,63,94,0.5)]",
                    label: "Busy"
                };
            case "away":
            case "idle":
                return {
                    color: "bg-amber-500",
                    glow: "shadow-[0_0_10px_rgba(245,158,11,0.5)]",
                    label: "Idle"
                };
            case "offline":
            default:
                return {
                    color: "bg-gray-400",
                    glow: "shadow-none",
                    label: "Offline"
                };
        }
    };

    const config = getStatusConfig(member.status);

    return (
        <div className="group flex items-center justify-between p-3 rounded-2xl bg-[var(--bg-secondary)]/30 border border-[var(--border-primary)] hover:border-[var(--border-secondary)] hover:bg-[var(--bg-secondary)] transition-all duration-300">
            <div className="flex items-center gap-3">
                {/* Avatar with Status Ring */}
                <div className="relative isolate">
                    <div className="w-10 h-10 rounded-xl flex items-center justify-center text-xs font-bold bg-[var(--bg-primary)] text-[var(--accent-primary)] border border-[var(--border-primary)] shadow-sm overflow-hidden transform group-hover:scale-105 transition-transform duration-300">
                        {member.initials}
                    </div>
                    {/* Status Indicator with Dynamic Glow */}
                    <div className={`absolute -bottom-0.5 -right-0.5 w-3.5 h-3.5 rounded-full border-[2.5px] border-[var(--bg-primary)] ${config.color} ${config.glow} z-10 scale-100 group-hover:scale-110 transition-transform duration-300`}></div>
                </div>

                <div className="flex flex-col gap-0">
                    <div className="flex items-center gap-2">
                        <span className="text-[13px] font-bold text-[var(--text-primary)] tracking-tight">
                            {member.name}
                        </span>
                        <div className="flex items-center gap-1 px-1.5 py-0.5 rounded-full bg-[var(--bg-tertiary)] border border-[var(--border-primary)] scale-90 origin-left">
                            <div className={`w-1 h-1 rounded-full ${config.color}`}></div>
                            <span className="text-[9px] font-black text-[var(--text-muted)] uppercase tracking-tighter">
                                {config.label}
                            </span>
                        </div>
                    </div>
                    <div className="flex items-center gap-2 text-[10px] text-[var(--text-muted)] font-bold opacity-70">
                        <Mail size={10} strokeWidth={2.5} />
                        <span>{member.email}</span>
                        <span className="text-[var(--border-primary)]">•</span>
                        <span className="bg-[var(--bg-tertiary)] px-1 rounded text-[9px] uppercase font-black">
                            {member.role}
                        </span>
                    </div>
                </div>
            </div>

            <button
                onClick={() => onAction(member)}
                className="px-4 py-2 rounded-lg text-[10px] font-black uppercase tracking-wider transition-all duration-300 transform active:scale-95
                           bg-[var(--accent-primary)] text-white hover:bg-[var(--accent-hover)] shadow-sm
                           dark:bg-[var(--text-primary)] dark:text-[var(--bg-primary)] dark:hover:bg-[var(--text-primary)]/90 dark:shadow-none
                           flex items-center gap-1.5"
            >
                <MessageSquare size={12} strokeWidth={3} />
                Start Chat
            </button>
        </div>
    );
}
