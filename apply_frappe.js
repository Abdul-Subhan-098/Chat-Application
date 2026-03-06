const fs = require('fs');
const path = require('path');

const files = [
    'src/app/page.js',
    'src/components/sidebar/ServerSidebar.jsx',
    'src/components/sidebar/ChannelSidebar.jsx',
    'src/components/sidebar/RightSidebar.jsx',
    'src/components/chat/ChatHeader.jsx',
    'src/components/chat/MessageList.jsx',
    'src/components/chat/MessageInput.jsx'
];

files.forEach(file => {
    const filePath = path.join(__dirname, file);
    if (!fs.existsSync(filePath)) return;

    let content = fs.readFileSync(filePath, 'utf8');

    // 1. App Background
    content = content.replace(/bg-gray-100 dark:bg-gray-900/g, 'bg-[#F4F5F6] dark:bg-[#17171C]');
    content = content.replace(/bg-slate-50 dark:bg-slate-900/g, 'bg-[#F4F5F6] dark:bg-[#17171C]');

    // 2. Component Surfaces (Sidebars, Headers)
    content = content.replace(/bg-white dark:bg-gray-800/g, 'bg-[#FFFFFF] dark:bg-[#1E1E24]');
    content = content.replace(/bg-white dark:bg-slate-800/g, 'bg-[#FFFFFF] dark:bg-[#1E1E24]');

    // Secondary inputs / hover areas
    content = content.replace(/bg-gray-50 dark:bg-gray-900\/50/g, 'bg-[#F4F5F6] dark:bg-[#17171C]');
    content = content.replace(/bg-gray-50 dark:bg-gray-700/g, 'bg-[#F4F5F6] dark:bg-[#2B2B30]');
    content = content.replace(/bg-slate-50 dark:bg-slate-700/g, 'bg-[#F4F5F6] dark:bg-[#2B2B30]');

    content = content.replace(/bg-gray-100 dark:bg-gray-800/g, 'bg-[#F4F5F6] dark:bg-[#2B2B30]');
    content = content.replace(/bg-slate-100 dark:bg-slate-800/g, 'bg-[#F4F5F6] dark:bg-[#2B2B30]');

    // 3. Borders
    content = content.replace(/border-gray-200 dark:border-gray-700/g, 'border-[#E2E8F0] dark:border-[#333338]');
    content = content.replace(/border-gray-100 dark:border-gray-700/g, 'border-[#E2E8F0] dark:border-[#333338]');
    content = content.replace(/border-white dark:border-gray-800/g, 'border-[#FFFFFF] dark:border-[#1E1E24]');
    content = content.replace(/border-slate-[0-9]+\/?[0-9]* dark:border-slate-[0-9]+\/?[0-9]*/g, 'border-[#E2E8F0] dark:border-[#333338]');

    // 4. Texts
    content = content.replace(/text-gray-800 dark:text-gray-100/g, 'text-[#1F272E] dark:text-[#F9FAFB]');
    content = content.replace(/text-gray-700 dark:text-gray-200/g, 'text-[#1F272E] dark:text-[#F9FAFB]');
    content = content.replace(/text-gray-600 dark:text-gray-300/g, 'text-[#64748B] dark:text-[#9CA3AF]');
    content = content.replace(/text-gray-500 hover:text-blue-500/g, 'text-[#64748B] hover:text-[#1778F2]');
    content = content.replace(/text-gray-400 dark:text-gray-500/g, 'text-[#64748B] dark:text-[#9CA3AF]');
    content = content.replace(/text-gray-500 dark:text-gray-400/g, 'text-[#64748B] dark:text-[#9CA3AF]');
    content = content.replace(/text-slate-[0-9]+ dark:text-slate-[0-9]+/g, 'text-[#64748B] dark:text-[#9CA3AF]');

    // 5. Primary Brand Colors (Frappe Blue)
    content = content.replace(/bg-blue-600 hover:bg-blue-700/g, 'bg-[#1778F2] hover:bg-[#1461C7]');
    content = content.replace(/text-blue-600/g, 'text-[#1778F2]');
    content = content.replace(/text-blue-500/g, 'text-[#1778F2]');
    content = content.replace(/bg-blue-50/g, 'bg-[#EBF4FF]');

    fs.writeFileSync(filePath, content);
    console.log(`Frappe theme applied to ${file}`);
});
