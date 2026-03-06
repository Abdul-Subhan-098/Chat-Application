"use client"

import { useState, useRef, useEffect } from "react";
import { Mic, MicOff, Headphones, Settings, LogOut, UserCircle } from "lucide-react";

/**
 * UserProfile - Discord-style profile area for the sidebar.
 * Includes status management popover and device controls.
 */
export default function UserProfile({ user, isMuted, isDeafened, onMuteToggle, onDeafenToggle, onStatusChange, onSettingsClick }) {
    const [isStatusMenuOpen, setIsStatusMenuOpen] = useState(false);
    const menuRef = useRef(null);

    const statuses = [
        { id: "online", label: "Online", color: "bg-emerald-500", glow: "shadow-[0_0_8px_rgba(16,185,129,0.4)]" },
        { id: "idle", label: "Idle", color: "bg-amber-500", glow: "shadow-[0_0_8px_rgba(245,158,11,0.4)]" },
        { id: "dnd", label: "Do Not Disturb", color: "bg-rose-500", glow: "shadow-[0_0_8px_rgba(244,63,94,0.4)]" },
        { id: "invisible", label: "Invisible", color: "bg-gray-400", glow: "" },
    ];

    const currentStatus = statuses.find(s => s.id === user.status) || statuses[0];

    // Close menu on click outside
    useEffect(() => {
        function handleClickOutside(event) {
            if (menuRef.current && !menuRef.current.contains(event.target)) {
                setIsStatusMenuOpen(false);
            }
        }
        document.addEventListener("mousedown", handleClickOutside);
        return () => document.removeEventListener("mousedown", handleClickOutside);
    }, []);

    return (
        <div className="relative mt-auto">
            {/* Status Popover Menu */}
            {isStatusMenuOpen && (
                <div
                    ref={menuRef}
                    className="absolute bottom-full left-0 mb-2 w-56 bg-[var(--bg-primary)] border border-[var(--border-primary)] rounded-xl shadow-2xl p-2 z-50 animate-in fade-in slide-in-from-bottom-2 duration-200"
                >
                    <div className="px-2 py-1.5 mb-1">
                        <span className="text-[10px] font-extrabold text-[var(--text-muted)] uppercase tracking-widest">Set Status</span>
                    </div>
                    {statuses.map((status) => (
                        <button
                            key={status.id}
                            onClick={() => {
                                onStatusChange(status.id);
                                setIsStatusMenuOpen(false);
                            }}
                            className="w-full flex items-center gap-3 px-2.5 py-2 rounded-lg hover:bg-[var(--bg-secondary)] transition-colors group"
                        >
                            <div className={`w-3 h-3 rounded-full ${status.color} ${status.glow}`}></div>
                            <span className={`text-[13px] font-semibold ${user.status === status.id ? 'text-[var(--text-primary)]' : 'text-[var(--text-secondary)]'} group-hover:text-[var(--text-primary)]`}>
                                {status.label}
                            </span>
                            {user.status === status.id && (
                                <div className="ml-auto w-1.5 h-1.5 rounded-full bg-[var(--accent-primary)]"></div>
                            )}
                        </button>
                    ))}
                    <div className="h-px bg-[var(--border-primary)] my-2"></div>
                    <button className="w-full flex items-center gap-3 px-2.5 py-2 rounded-lg hover:bg-rose-500/10 text-rose-500 transition-colors group text-[13px] font-bold">
                        <LogOut size={16} />
                        Switch Accounts
                    </button>
                </div>
            )}

            {/* Profile Bar */}
            <div className="flex items-center gap-2 p-1.5 bg-[var(--bg-secondary)]/50 border border-[var(--border-primary)] rounded-2xl hover:bg-[var(--bg-secondary)] transition-all duration-300">
                {/* Avatar with Status */}
                <button
                    onClick={() => setIsStatusMenuOpen(!isStatusMenuOpen)}
                    className="relative group shrink-0"
                >
                    <div className="w-10 h-10 rounded-xl bg-[var(--bg-tertiary)] flex items-center justify-center text-sm font-bold border border-[var(--border-primary)] shadow-inner transform active:scale-90 transition-transform">
                        {user.initials || "U"}
                    </div>
                    {/* Discord-style status indicator */}
                    <div className={`absolute -bottom-0.5 -right-0.5 w-3.5 h-3.5 rounded-full border-2 border-[var(--bg-secondary)] ${currentStatus.color} ${currentStatus.glow} group-hover:scale-110 transition-transform`}>
                        {user.status === 'dnd' && (
                            <div className="absolute inset-0 flex items-center justify-center">
                                <div className="w-1.5 h-[2px] bg-[var(--bg-secondary)]"></div>
                            </div>
                        )}
                        {user.status === 'idle' && (
                            <div className="absolute top-0 right-0 w-2 h-2 bg-[var(--bg-secondary)] rounded-full -translate-x-1/2 translate-y-1/2"></div>
                        )}
                        {user.status === 'invisible' && (
                            <div className="absolute inset-0 flex items-center justify-center">
                                <div className="w-1.5 h-1.5 rounded-full bg-gray-600"></div>
                            </div>
                        )}
                    </div>
                </button>

                {/* Name & ID */}
                <div className="flex-1 min-w-0 pr-1">
                    <h3 className="text-xs font-bold text-[var(--text-primary)] truncate tracking-tight">{user.name}</h3>
                    <p className="text-[10px] text-[var(--text-muted)] font-bold truncate opacity-70">#{user.tag || "0001"}</p>
                </div>

                {/* Control Actions */}
                <div className="flex items-center">
                    <ControlIcon
                        icon={isMuted ? <MicOff size={15} /> : <Mic size={15} />}
                        active={isMuted}
                        onClick={onMuteToggle}
                        danger={isMuted}
                        label={isMuted ? "Unmute" : "Mute"}
                    />
                    <ControlIcon
                        icon={<Headphones size={15} />}
                        active={isDeafened}
                        onClick={onDeafenToggle}
                        danger={isDeafened}
                        label={isDeafened ? "Undeafen" : "Deafen"}
                    />
                    <ControlIcon
                        icon={<Settings size={15} />}
                        onClick={onSettingsClick}
                        label="User Settings"
                    />
                </div>
            </div>
        </div>
    );
}

function ControlIcon({ icon, active, onClick, danger, label }) {
    return (
        <button
            onClick={onClick}
            aria-label={label}
            title={label}
            className={`w-8 h-8 rounded-lg flex items-center justify-center transition-all relative
                ${active ? 'text-rose-500 bg-rose-500/10' : 'text-[var(--text-muted)] hover:text-[var(--text-primary)] hover:bg-[var(--bg-secondary)]'}
            `}
        >
            {icon}
            {danger && active && (
                <div className="absolute h-[1px] w-4 bg-rose-500 rotate-[45deg] pointer-events-none"></div>
            )}
        </button>
    );
}
