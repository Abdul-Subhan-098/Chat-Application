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
        <div className="w-[280px] bg-[#FFFFFF] dark:bg-[#1E1E24]  rounded-[20px] p-5 flex flex-col shadow-sm border border-[#E2E8F0] dark:border-[#333338] z-10 overflow-y-auto custom-scrollbar shrink-0">

            <h2 className="text-base font-bold text-[#1F272E] dark:text-[#F9FAFB] mb-5">Chat Details</h2>

            {/* Top Action Icons */}
            <div className="flex justify-between items-center bg-gray-50 dark:bg-gray-900 p-2 rounded-xl mb-6 border border-[#E2E8F0] dark:border-[#333338]">
                <button onClick={() => onActionClick('notifications')} className="w-9 h-9 flex items-center justify-center text-gray-400 hover:text-gray-700 dark:hover:text-gray-300 transition rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800" aria-label="Notifications"><Bell size={16} /></button>
                <button onClick={() => onActionClick('calendar')} className="w-9 h-9 flex items-center justify-center bg-white dark:bg-gray-700 shadow-sm rounded-lg text-[#1778F2] dark:text-blue-400 font-bold border border-gray-100 dark:border-gray-600" aria-label="Calendar"><Calendar size={16} /></button>
                <button onClick={() => onActionClick('call')} className="w-9 h-9 flex items-center justify-center text-gray-400 hover:text-gray-700 dark:hover:text-gray-300 transition rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800" aria-label="Video Call"><Video size={16} /></button>
                <button onClick={() => onActionClick('mute')} className="w-9 h-9 flex items-center justify-center text-rose-400 hover:text-rose-500 transition rounded-lg hover:bg-rose-50 dark:hover:bg-rose-900/20" aria-label="Mute"><BellOff size={16} /></button>
            </div>

            {(!details) ? (
                <div className="flex-1 flex flex-col items-center justify-center text-gray-400 py-10 opacity-70">
                    <p className="text-xs text-center px-4 font-medium">Select a chat to view details.</p>
                </div>
            ) : (
                <div className="flex flex-col gap-6">
                    {/* Photos and Videos */}
                    <div>
                        <div className="flex justify-between items-center mb-3">
                            <h3 className="font-bold text-[#1F272E] dark:text-[#F9FAFB] text-xs">Photos and Videos <span className="text-gray-400 font-normal ml-1">{details.photos?.length || 0}</span></h3>
                            {hasPhotos && <button className="text-[#1778F2] dark:text-blue-400 text-[10px] font-semibold hover:underline">See all</button>}
                        </div>

                        {!hasPhotos ? (
                            <EmptyState icon={<ImageIcon size={14} />} text="No photos yet" />
                        ) : (
                            <div className="grid grid-cols-2 gap-2">
                                {details.photos.slice(0, 2).map((photo, i) => (
                                    <div key={i} className="rounded-xl overflow-hidden h-20 relative group cursor-pointer bg-[#F4F5F6] dark:bg-[#2B2B30] border border-[#E2E8F0] dark:border-[#333338]">
                                        {/* Placeholder for actual image rendering */}
                                        <div className="w-full h-full flex items-center justify-center text-gray-300">
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
                            <h3 className="font-bold text-[#1F272E] dark:text-[#F9FAFB] text-xs">Shared Files <span className="text-gray-400 font-normal ml-1">{details.files?.length || 0}</span></h3>
                            {hasFiles && <button className="text-[#1778F2] dark:text-blue-400 text-[10px] font-semibold hover:underline">See all</button>}
                        </div>

                        {!hasFiles ? (
                            <EmptyState icon={<FileIcon size={14} />} text="No files shared" />
                        ) : (
                            <div className="flex flex-col gap-2.5">
                                {details.files.map((file, i) => (
                                    <div key={i} className="flex items-start gap-2.5 cursor-pointer group p-1.5 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700/50 transition">
                                        <div className="w-7 h-7 rounded-md bg-[#F4F5F6] dark:bg-[#2B2B30] border border-[#E2E8F0] dark:border-[#333338] flex items-center justify-center text-gray-400 group-hover:text-[#1778F2] transition shrink-0">
                                            <FileIcon size={12} strokeWidth={2.5} />
                                        </div>
                                        <p className="flex-1 text-[11px] text-[#64748B] dark:text-[#9CA3AF] font-medium leading-snug group-hover:text-[#1778F2] dark:group-hover:text-blue-400 transition line-clamp-2 mt-0.5">
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
                            <h3 className="font-bold text-[#1F272E] dark:text-[#F9FAFB] text-xs">Shared Links <span className="text-gray-400 font-normal ml-1">{details.links?.length || 0}</span></h3>
                            {hasLinks && <button className="text-[#1778F2] dark:text-blue-400 text-[10px] font-semibold hover:underline">See all</button>}
                        </div>

                        {!hasLinks ? (
                            <EmptyState icon={<LinkIcon size={14} />} text="No links shared" />
                        ) : (
                            <div className="flex flex-col gap-2.5">
                                {details.links.map((link, i) => (
                                    <div key={i} className="flex items-center gap-2.5 cursor-pointer group p-1.5 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700/50 transition">
                                        <div className="w-7 h-7 rounded-full bg-[#F4F5F6] dark:bg-[#2B2B30] border border-[#E2E8F0] dark:border-[#333338] text-gray-400 flex items-center justify-center shrink-0">
                                            <LinkIcon size={12} strokeWidth={2.5} />
                                        </div>
                                        <div className="flex-1 min-w-0">
                                            <p className="text-[11px] font-bold text-[#1F272E] dark:text-[#F9FAFB] truncate group-hover:text-[#1778F2] dark:group-hover:text-blue-400 transition">{link.title}</p>
                                            <p className="text-[9px] text-gray-400 truncate mt-0.5">{link.url}</p>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        )}
                    </div>

                    {/* Notes */}
                    <div>
                        <div className="flex justify-between items-center mb-3">
                            <h3 className="font-bold text-[#1F272E] dark:text-[#F9FAFB] text-xs">Notes <span className="text-gray-400 font-normal ml-1">{details.notes?.length || 0}</span></h3>
                            {hasNotes && <button className="text-[#1778F2] dark:text-blue-400 text-[10px] font-semibold hover:underline">See all</button>}
                        </div>

                        {!hasNotes ? (
                            <EmptyState text="No notes added" />
                        ) : (
                            <div className="flex flex-col gap-2">
                                {details.notes.map((note, i) => (
                                    <div key={i} className="bg-gray-50 dark:bg-gray-800 p-3 rounded-xl border border-[#E2E8F0] dark:border-[#333338] relative overflow-hidden group hover:border-blue-200 dark:hover:border-gray-600 transition cursor-pointer">
                                        <div className="absolute top-0 left-0 w-0.5 h-full bg-[#EBF4FF]0 hidden group-hover:block"></div>
                                        <p className="text-[11px] text-[#64748B] dark:text-[#9CA3AF] leading-relaxed mb-1.5">
                                            {note.content}
                                        </p>
                                        <p className="text-[9px] text-gray-400">{note.date}</p>
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
        <div className="flex flex-col items-center justify-center py-4 bg-gray-50 dark:bg-gray-900 rounded-xl border border-dashed border-[#E2E8F0] dark:border-[#333338]">
            <div className="text-gray-300 dark:text-gray-600 mb-1">{icon}</div>
            <span className="text-[10px] text-gray-400 font-medium">{text}</span>
        </div>
    );
}
