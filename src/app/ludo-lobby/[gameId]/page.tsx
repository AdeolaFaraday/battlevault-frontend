import LobbyScreen from '../../../../src/components/ludo/lobby/LobbyScreen';

interface PageProps {
    params: Promise<{ gameId: string }>; // Note: params is a Promise here
}


export default async function LudoLobbyPage({
    params,
}: PageProps) {
    const gameId = (await params).gameId;
    return <LobbyScreen gameId={gameId} />;
}
