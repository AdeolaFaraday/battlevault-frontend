"use client";

import React, { useState, useEffect } from "react";
import DashboardLayout from "../../components/dashboard/DashboardLayout";
import UsersList from "../../components/dashboard/UsersList";
import UserTournamentsDrawer from "../../components/dashboard/UserTournamentsDrawer";
import TournamentBracketModal from "../../components/dashboard/TournamentBracketModal";
import { useQuery } from "@apollo/client";
import { GET_ALL_USERS } from "../../graphql/admin/queries";
import { useRouter } from "next/navigation";

export default function DashboardPage() {
    const router = useRouter();
    const [page, setPage] = useState(1);
    const [limit] = useState(10);
    const [search, setSearch] = useState("");

    const { data, loading, error } = useQuery(GET_ALL_USERS, {
        variables: { page, limit, search },
        fetchPolicy: "network-only",
    });

    useEffect(() => {
        if (error && error.message.includes("Forbidden")) {
            router.push("/");
        }
    }, [error, router]);

    const [selectedUserId, setSelectedUserId] = useState<string | null>(null);
    const [isDrawerOpen, setIsDrawerOpen] = useState(false);

    const [selectedTournamentId, setSelectedTournamentId] = useState<string | null>(null);
    const [isBracketModalOpen, setIsBracketModalOpen] = useState(false);

    const usersData = data?.getAllUsers?.data;
    const users = usersData?.users || [];

    const handleUserSelect = (userId: string) => {
        setSelectedUserId(userId);
        setIsDrawerOpen(true);
    };

    const handleDrawerClose = () => {
        setIsDrawerOpen(false);
        setTimeout(() => setSelectedUserId(null), 300);
    };

    const handleTournamentSelect = (tournamentId: string) => {
        setSelectedTournamentId(tournamentId);
        setIsBracketModalOpen(true);
    };

    const handleBracketModalClose = () => {
        setIsBracketModalOpen(false);
        setTimeout(() => setSelectedTournamentId(null), 300);
    };

    return (
        <DashboardLayout>
            <div className="mb-10">
                <h1 className="text-4xl font-extrabold text-white tracking-tight">
                    Platform Overview
                </h1>
                <p className="text-gray-400 mt-2 text-lg">
                    Monitor user activity, manage tournaments, and track platform metrics.
                </p>
            </div>

            {error && !error.message.includes("Forbidden") ? (
                <div className="bg-red-500/10 border border-red-500/20 rounded-2xl p-6 text-center">
                    <h3 className="text-red-400 font-bold mb-2 text-lg">Failed to load user data</h3>
                    <p className="text-gray-400">{error.message}</p>
                </div>
            ) : (
                <UsersList
                    users={users}
                    isLoading={loading}
                    onUserSelected={handleUserSelect}
                    paginationData={{
                        page: usersData?.page || page,
                        limit: usersData?.limit || limit,
                        total: usersData?.total || 0,
                        totalPages: usersData?.totalPages || 0,
                        hasMore: usersData?.hasMore || false,
                    }}
                    onPageChange={(newPage) => setPage(newPage)}
                    onSearchChange={(newSearch) => {
                        setSearch(newSearch);
                        setPage(1);
                    }}
                    searchTerm={search}
                />
            )}

            {/* Slide-over Drawer for User Tournaments */}
            <UserTournamentsDrawer
                userId={selectedUserId}
                isOpen={isDrawerOpen}
                onClose={handleDrawerClose}
                onTournamentSelect={handleTournamentSelect}
            />

            {/* Modal for Tournament Bracket */}
            <TournamentBracketModal
                tournamentId={selectedTournamentId}
                isOpen={isBracketModalOpen}
                onClose={handleBracketModalClose}
            />
        </DashboardLayout>
    );
}
