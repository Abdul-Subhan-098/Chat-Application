import { Bell, Calendar, Video, BellOff, FileIcon, ImageIcon, LinkIcon } from "lucide-react";

export default function RightSidebar({
    details = null,
    onActionClick = () => { }
}) {
    // Empty state rendering logic
    const hasPhotos = details?.photos?.length > 0;
    const hasFiles = details?.files?.length > 0;
    const hasLinks = details?.links?.length > 0;
    const hasNotes = details?.notes?.length > 0;

    return (
        <div className="w-[280px] bg-[var(--bg-primary)] rounded-[20px] p-5 flex flex-col shadow-sm border border-[var(--border-primary)] z-10 overflow-y-auto custom-scrollbar shrink-0">

            <h2 className="text-base font-bold text-[var(--text-primary)] mb-5">Chat Details</h2>

            {/* Top Action Icons */}
            <div className="flex justify-between items-center bg-[var(--bg-secondary)] p-2 rounded-xl mb-6 border border-[var(--border-primary)]">
                <button onClick={() => onActionClick('notifications')} className="w-9 h-9 flex items-center justify-center text-[var(--text-muted)] hover:text-[var(--text-primary)] transition rounded-lg hover:bg-[var(--bg-tertiary)]" aria-label="Notifications"><Bell size={16} /></button>
                <button onClick={() => onActionClick('calendar')} className="w-9 h-9 flex items-center justify-center bg-[var(--bg-primary)] shadow-sm rounded-lg text-[var(--accent-primary)] font-bold border border-[var(--border-secondary)]" aria-label="Calendar"><Calendar size={16} /></button>
                <button onClick={() => onActionClick('call')} className="w-9 h-9 flex items-center justify-center text-[var(--text-muted)] hover:text-[var(--text-primary)] transition rounded-lg hover:bg-[var(--bg-tertiary)]" aria-label="Video Call"><Video size={16} /></button>
                <button onClick={() => onActionClick('mute')} className="w-9 h-9 flex items-center justify-center text-[var(--danger-primary)] hover:opacity-80 transition rounded-lg hover:bg-[var(--danger-primary)]/10" aria-label="Mute"><BellOff size={16} /></button>
            </div>

            {(!details) ? (
                <div className="flex-1 flex flex-col items-center justify-center text-[var(--text-muted)] py-10 opacity-70">
                    <p className="text-xs text-center px-4 font-medium">Select a chat to view details.</p>
                </div>
            ) : (
                <div className="flex flex-col gap-6">
                    {/* Photos and Videos */}
                    <div>
                        <div className="flex justify-between items-center mb-3">
                            <h3 className="font-bold text-[var(--text-primary)] text-xs">Photos and Videos <span className="text-[var(--text-muted)] font-normal ml-1">{details.photos?.length || 0}</span></h3>
                            {hasPhotos && <button className="text-[var(--accent-primary)] text-[10px] font-semibold hover:underline">See all</button>}
                        </div>

                        {!hasPhotos ? (
                            <EmptyState icon={<ImageIcon size={14} />} text="No photos yet" />
                        ) : (
                            <div className="grid grid-cols-2 gap-2">
                                {details.photos.slice(0, 2).map((photo, i) => (
                                    <div key={i} className="rounded-xl overflow-hidden h-20 relative group cursor-pointer bg-[var(--bg-secondary)] border border-[var(--border-primary)]">
                                        {/* Placeholder for actual image rendering */}
                                        <div className="w-full h-full flex items-center justify-center text-[var(--text-muted)]">
                                            <ImageIcon size={20} />
                                        </div>
                                    </div>
                                ))}
                            </div>
                        )}
                    </div>

                    {/* Shared Files */}
                    <div>
                        <div className="flex justify-between items-center mb-3">
                            <h3 className="font-bold text-[var(--text-primary)] text-xs">Shared Files <span className="text-[var(--text-muted)] font-normal ml-1">{details.files?.length || 0}</span></h3>
                            {hasFiles && <button className="text-[var(--accent-primary)] text-[10px] font-semibold hover:underline">See all</button>}
                        </div>

                        {!hasFiles ? (
                            <EmptyState icon={<FileIcon size={14} />} text="No files shared" />
                        ) : (
                            <div className="flex flex-col gap-2.5">
                                {details.files.map((file, i) => (
                                    <div key={i} className="flex items-start gap-2.5 cursor-pointer group p-1.5 rounded-lg hover:bg-[var(--bg-secondary)] transition">
                                        <div className="w-7 h-7 rounded-md bg-[var(--bg-tertiary)] border border-[var(--border-primary)] flex items-center justify-center text-[var(--text-muted)] group-hover:text-[var(--accent-primary)] transition shrink-0">
                                            <FileIcon size={12} strokeWidth={2.5} />
                                        </div>
                                        <p className="flex-1 text-[11px] text-[var(--text-secondary)] font-medium leading-snug group-hover:text-[var(--accent-primary)] transition line-clamp-2 mt-0.5">
                                            {file.title}
                                        </p>
                                    </div>
                                ))}
                            </div>
                        )}
                    </div>

                    {/* Shared Links */}
                    <div>
                        <div className="flex justify-between items-center mb-3">
                            <h3 className="font-bold text-[var(--text-primary)] text-xs">Shared Links <span className="text-[var(--text-muted)] font-normal ml-1">{details.links?.length || 0}</span></h3>
                            {hasLinks && <button className="text-[var(--accent-primary)] text-[10px] font-semibold hover:underline">See all</button>}
                        </div>

                        {!hasLinks ? (
                            <EmptyState icon={<LinkIcon size={14} />} text="No links shared" />
                        ) : (
                            <div className="flex flex-col gap-2.5">
                                {details.links.map((link, i) => (
                                    <div key={i} className="flex items-center gap-2.5 cursor-pointer group p-1.5 rounded-lg hover:bg-[var(--bg-secondary)] transition">
                                        <div className="w-7 h-7 rounded-full bg-[var(--bg-tertiary)] border border-[var(--border-primary)] text-[var(--text-muted)] flex items-center justify-center shrink-0">
                                            <LinkIcon size={12} strokeWidth={2.5} />
                                        </div>
                                        <div className="flex-1 min-w-0">
                                            <p className="text-[11px] font-bold text-[var(--text-primary)] truncate group-hover:text-[var(--accent-primary)] transition">{link.title}</p>
                                            <p className="text-[9px] text-[var(--text-muted)] truncate mt-0.5">{link.url}</p>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        )}
                    </div>

                    {/* Notes */}
                    <div>
                        <div className="flex justify-between items-center mb-3">
                            <h3 className="font-bold text-[var(--text-primary)] text-xs">Notes <span className="text-[var(--text-muted)] font-normal ml-1">{details.notes?.length || 0}</span></h3>
                            {hasNotes && <button className="text-[var(--accent-primary)] text-[10px] font-semibold hover:underline">See all</button>}
                        </div>

                        {!hasNotes ? (
                            <EmptyState text="No notes added" />
                        ) : (
                            <div className="flex flex-col gap-2">
                                {details.notes.map((note, i) => (
                                    <div key={i} className="bg-[var(--bg-secondary)] p-3 rounded-xl border border-[var(--border-primary)] relative overflow-hidden group hover:border-[var(--border-secondary)] transition cursor-pointer">
                                        <div className="absolute top-0 left-0 w-0.5 h-full bg-[var(--accent-primary)] hidden group-hover:block"></div>
                                        <p className="text-[11px] text-[var(--text-secondary)] leading-relaxed mb-1.5">
                                            {note.content}
                                        </p>
                                        <p className="text-[9px] text-[var(--text-muted)]">{note.date}</p>
                                    </div>
                                ))}
                            </div>
                        )}
                    </div>
                </div>
            )}

        </div>
    );
}

function EmptyState({ icon, text }) {
    return (
        <div className="flex flex-col items-center justify-center py-4 bg-[var(--bg-secondary)] rounded-xl border border-dashed border-[var(--border-primary)]">
            <div className="text-[var(--text-muted)] mb-1">{icon}</div>
            <span className="text-[10px] text-[var(--text-muted)] font-medium">{text}</span>
        </div>
    );
}
