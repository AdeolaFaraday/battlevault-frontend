import React, { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { FiUsers, FiSettings, FiLogOut, FiActivity, FiMenu, FiX } from "react-icons/fi";
import { useRouter } from "next/navigation";
import LogoIcon from "../common/icons/Logo";

const navigation = [
    { name: "Users & Tournaments", href: "/dashboard", icon: FiUsers },
    { name: "Platform Activity", href: "#", icon: FiActivity },
    { name: "Settings", href: "#", icon: FiSettings },
];

export default function DashboardLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    const pathname = usePathname();
    const router = useRouter();
    const [isSidebarOpen, setIsSidebarOpen] = useState(false);

    return (
        <div className="min-h-screen bg-[#0A0A0A] text-white selection:bg-white/10">
            {/* Mobile Header */}
            <header className="lg:hidden fixed top-0 left-0 right-0 z-40 h-16 bg-[#111111]/80 backdrop-blur-md border-b border-white/5 px-6 flex items-center justify-between">
                <Link
                    href="/"
                    className="flex items-center gap-2 text-xl font-black text-white hover:opacity-80 transition-opacity"
                >
                    <LogoIcon width="28" height="28" className="text-white" />
                    <span>BATTLEVAULT</span>
                </Link>
                <button
                    onClick={() => setIsSidebarOpen(true)}
                    className="p-2 -mr-2 text-gray-400 hover:text-white transition-colors"
                >
                    <FiMenu className="h-6 w-6" />
                </button>
            </header>

            {/* Mobile Sidebar Overlay */}
            {isSidebarOpen && (
                <div
                    className="fixed inset-0 z-[80] bg-black/60 backdrop-blur-sm lg:hidden animate-in fade-in duration-200"
                    onClick={() => setIsSidebarOpen(false)}
                />
            )}

            {/* Sidebar Navigation */}
            <aside className={`
                fixed inset-y-0 left-0 z-[90] flex w-72 flex-col bg-[#0D0D0D] border-r border-white/5 shadow-2xl transition-transform duration-300 ease-in-out
                ${isSidebarOpen ? "translate-x-0" : "-translate-x-full"}
                lg:translate-x-0
            `}>
                <div className="flex grow flex-col gap-y-8 overflow-y-auto px-6 py-8">
                    <div className="flex h-12 shrink-0 items-center justify-between">
                        <Link
                            href="/"
                            className="flex items-center gap-3 text-2xl font-black text-white hover:opacity-80 transition-opacity"
                        >
                            <LogoIcon width="34" height="34" className="text-white" />
                            <span>BATTLEVAULT</span>
                        </Link>
                        <button
                            onClick={() => setIsSidebarOpen(false)}
                            className="lg:hidden p-2 -mr-2 text-gray-400 hover:text-white hover:bg-white/5 rounded-lg transition-colors"
                        >
                            <FiX className="h-6 w-6" />
                        </button>
                    </div>
                    <nav className="flex flex-1 flex-col">
                        <ul role="list" className="flex flex-1 flex-col gap-y-7">
                            <li>
                                <div className="text-[10px] font-bold leading-6 text-gray-500 uppercase tracking-[0.2em] mb-4">
                                    Admin Dashboard
                                </div>
                                <ul role="list" className="-mx-2 space-y-1">
                                    {navigation.map((item) => (
                                        <li key={item.name}>
                                            <Link
                                                href={item.href}
                                                onClick={() => setIsSidebarOpen(false)}
                                                className={`
                                                    group flex items-center gap-x-3 rounded-xl p-3 text-sm leading-6 font-medium transition-all duration-200
                                                    ${pathname === item.href
                                                        ? "bg-white text-black font-bold"
                                                        : "text-gray-400 hover:text-white hover:bg-white/5"
                                                    }
                                                `}
                                            >
                                                <item.icon
                                                    className={`h-5 w-5 shrink-0 ${pathname === item.href ? "text-black" : "text-gray-500 group-hover:text-white"}`}
                                                    aria-hidden="true"
                                                />
                                                {item.name}
                                            </Link>
                                        </li>
                                    ))}
                                </ul>
                            </li>

                            <li className="mt-auto pt-4 border-t border-white/5">
                                <button
                                    onClick={() => router.push('/')}
                                    className="group flex items-center gap-x-3 rounded-xl p-3 text-sm leading-6 font-medium text-gray-400 hover:text-red-400 hover:bg-red-400/5 transition-all w-full"
                                >
                                    <FiLogOut className="h-5 w-5 shrink-0" aria-hidden="true" />
                                    Exit Dashboard
                                </button>
                            </li>
                        </ul>
                    </nav>
                </div>
            </aside>

            {/* Main Content Area */}
            <main className="lg:pl-72 flex-1 pt-16 lg:pt-0 min-h-screen bg-[#0A0A0A]">
                <div className="relative min-h-screen">
                    <div className="relative px-6 sm:px-8 py-12 max-w-7xl mx-auto">
                        {children}
                    </div>
                </div>
            </main>
        </div>
    );
}
