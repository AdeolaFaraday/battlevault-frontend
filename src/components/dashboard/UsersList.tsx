"use client";

import React, { useState, useEffect } from "react";
import { FiEye, FiAward, FiUserCheck, FiChevronLeft, FiChevronRight, FiUsers } from "react-icons/fi";
import Image from "next/image";

interface User {
    _id: string;
    userName: string;
    email: string;
    firstName?: string;
    lastName?: string;
    avatar?: string;
    role?: string;
    accountStatus?: string;
    profileStatus?: string;
    createdAt: string;
}

interface PaginationData {
    page: number;
    limit: number;
    total: number;
    totalPages: number;
    hasMore: boolean;
}

interface UsersListProps {
    users: User[];
    onUserSelected: (userId: string) => void;
    isLoading: boolean;
    paginationData: PaginationData;
    onPageChange: (newPage: number) => void;
    onSearchChange: (newSearch: string) => void;
    searchTerm: string;
}

export default function UsersList({
    users,
    onUserSelected,
    isLoading,
    paginationData,
    onPageChange,
    onSearchChange,
    searchTerm
}: UsersListProps) {
    const [localSearch, setLocalSearch] = useState(searchTerm);

    useEffect(() => {
        const handler = setTimeout(() => {
            if (localSearch !== searchTerm) {
                onSearchChange(localSearch);
            }
        }, 500);
        return () => clearTimeout(handler);
    }, [localSearch, searchTerm, onSearchChange]);

    if (isLoading && users.length === 0) {
        return (
            <div className="w-full h-96 flex items-center justify-center">
                <div className="relative w-16 h-16">
                    <div className="absolute inset-0 rounded-full border-2 border-white/5"></div>
                    <div className="absolute inset-0 rounded-full border-t-2 border-white animate-spin"></div>
                </div>
            </div>
        );
    }

    return (
        <div className="bg-[#111111]/80 backdrop-blur-xl border border-white/10 rounded-3xl overflow-hidden shadow-2xl flex flex-col">
            <div className="p-8 border-b border-white/5 flex flex-col md:flex-row md:items-center justify-between gap-6 bg-black shrink-0">
                <div>
                    <h2 className="text-xl font-black text-white flex items-center gap-3 uppercase tracking-tight">
                        <FiUserCheck className="text-white w-6 h-6" />
                        Registered Users
                    </h2>
                    <p className="text-[10px] font-bold text-gray-500 mt-1 uppercase tracking-widest leading-relaxed max-w-md">
                        Platform-wide user management and historical data access.
                    </p>
                </div>

                <div className="relative">
                    <input
                        type="text"
                        placeholder="Search by name or email..."
                        value={localSearch}
                        onChange={(e) => setLocalSearch(e.target.value)}
                        className="w-full md:w-80 bg-black border border-white/10 rounded-xl py-3 pl-10 pr-4 text-xs text-white placeholder-gray-600 focus:outline-none focus:ring-1 focus:ring-white/30 transition-all font-black uppercase tracking-widest"
                    />
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                        <FiEye className="text-gray-600 w-4 h-4" />
                    </div>
                </div>
            </div>

            <div className="overflow-x-auto">
                <table className="w-full text-left text-xs text-gray-400">
                    <thead className="bg-[#0D0D0D] text-[10px] uppercase font-black tracking-[0.2em] text-gray-500 border-b border-white/5">
                        <tr>
                            <th scope="col" className="px-8 py-5 w-[25%] uppercase">User Profile</th>
                            <th scope="col" className="px-8 py-5 w-[20%] uppercase">Communication</th>
                            <th scope="col" className="px-8 py-5 w-[25%] uppercase">Privileges / Security</th>
                            <th scope="col" className="px-8 py-5 w-[15%] uppercase text-center">Registration</th>
                            <th scope="col" className="px-8 py-5 text-right w-[15%] uppercase">Operations</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-white/5 bg-[#0A0A0A]/30">
                        {users.length === 0 ? (
                            <tr>
                                <td colSpan={5} className="px-8 py-20 text-center">
                                    <div className="flex flex-col items-center gap-3">
                                        <div className="w-12 h-12 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center">
                                            <FiUsers className="text-gray-600 w-6 h-6" />
                                        </div>
                                        <div className="text-[10px] font-black uppercase tracking-widest text-gray-600">
                                            Empty Result {localSearch && `for "${localSearch}"`}
                                        </div>
                                    </div>
                                </td>
                            </tr>
                        ) : (
                            users.map((user) => (
                                <tr
                                    key={user._id}
                                    className="hover:bg-white/5 transition-all group"
                                >
                                    <td className="px-8 py-5">
                                        <div className="flex items-center gap-4">
                                            <div className="h-10 w-10 shrink-0 rounded-xl overflow-hidden bg-black border border-white/10 relative p-[1px]">
                                                {user.avatar ? (
                                                    <div className="relative w-full h-full rounded-[10px] overflow-hidden">
                                                        <Image
                                                            src={user.avatar}
                                                            alt={user.userName}
                                                            fill
                                                            className="object-cover"
                                                        />
                                                    </div>
                                                ) : (
                                                    <div className="w-full h-full rounded-[10px] bg-white text-black flex items-center justify-center text-xs font-black">
                                                        {user.userName?.charAt(0).toUpperCase() || "?"}
                                                    </div>
                                                )}
                                                <div className={`absolute -bottom-1 -right-1 h-3 w-3 rounded-full ring-2 ring-black ${user.accountStatus === 'ACTIVE' ? 'bg-white' : 'bg-gray-800'}`}></div>
                                            </div>
                                            <div className="min-w-0">
                                                <div className="font-black text-white text-sm tracking-tight uppercase group-hover:text-white transition-colors truncate">
                                                    {user.userName}
                                                </div>
                                                <div className="text-[10px] font-bold text-gray-600 truncate max-w-[150px] uppercase tracking-wider mt-0.5">
                                                    {user.firstName} {user.lastName}
                                                </div>
                                            </div>
                                        </div>
                                    </td>
                                    <td className="px-8 py-5">
                                        <div className="text-gray-500 text-[10px] font-black bg-black px-3 py-1.5 rounded-lg inline-block border border-white/5 uppercase tracking-widest">
                                            {user.email || "NO EMAIL"}
                                        </div>
                                    </td>
                                    <td className="px-8 py-5">
                                        <div className="flex flex-col gap-1.5 items-start">
                                            <span
                                                className={`inline-flex items-center px-2.5 py-1 rounded-lg text-[9px] font-black uppercase tracking-[0.2em]
                                                    ${user.role === 'admin'
                                                        ? 'bg-white text-black'
                                                        : 'bg-white/5 text-gray-400 border border-white/10'
                                                    }
                                                `}
                                            >
                                                {user.role || 'USER'}
                                            </span>
                                            {user.profileStatus && (
                                                <div className="flex items-center gap-2">
                                                    <div className={`w-1.5 h-1.5 rounded-full ${user.profileStatus === 'COMPLETED' ? 'bg-white' : 'bg-gray-800'}`} />
                                                    <span className="text-[9px] text-gray-600 font-bold uppercase tracking-widest">
                                                        {user.profileStatus}
                                                    </span>
                                                </div>
                                            )}
                                        </div>
                                    </td>
                                    <td className="px-8 py-5 text-[10px] font-black text-gray-600 text-center uppercase tracking-widest">
                                        {new Date(Number(user.createdAt)).toLocaleDateString('en-US', {
                                            year: '2-digit', month: 'short', day: '2-digit'
                                        })}
                                    </td>
                                    <td className="px-8 py-5 text-right">
                                        <button
                                            onClick={() => onUserSelected(user._id)}
                                            className="inline-flex items-center gap-2 px-4 py-2 text-[10px] font-black text-black bg-white hover:bg-gray-200 rounded-xl transition-all shadow-xl uppercase tracking-widest active:scale-95"
                                        >
                                            <FiAward className="w-4 h-4" />
                                            Record
                                        </button>
                                    </td>
                                </tr>
                            ))
                        )}
                    </tbody>
                </table>
            </div>

            {/* Pagination Controls */}
            {paginationData.totalPages > 1 && (
                <div className="p-6 border-t border-white/5 flex items-center justify-between bg-black shrink-0 mt-auto rounded-b-3xl">
                    <span className="text-[10px] font-bold text-gray-600 uppercase tracking-widest">
                        Page {paginationData.page} / {paginationData.totalPages}
                        {isLoading && <span className="ml-3 animate-pulse text-white">SYNCING...</span>}
                    </span>
                    <div className="flex gap-3">
                        <button
                            disabled={paginationData.page <= 1 || isLoading}
                            onClick={() => onPageChange(paginationData.page - 1)}
                            className="w-10 h-10 flex items-center justify-center rounded-xl border border-white/5 bg-[#111] text-gray-500 hover:text-white hover:border-white/20 transition-all disabled:opacity-20 disabled:scale-90"
                        >
                            <FiChevronLeft className="w-5 h-5" />
                        </button>
                        <button
                            disabled={!paginationData.hasMore || isLoading}
                            onClick={() => onPageChange(paginationData.page + 1)}
                            className="w-10 h-10 flex items-center justify-center rounded-xl border border-white/5 bg-[#111] text-gray-500 hover:text-white hover:border-white/20 transition-all disabled:opacity-20 disabled:scale-90"
                        >
                            <FiChevronRight className="w-5 h-5" />
                        </button>
                    </div>
                </div>
            )}
        </div>
    );
}
