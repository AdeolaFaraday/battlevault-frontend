import LobbyScreen from '../../../../src/components/ludo/lobby/LobbyScreen';

export default function LudoLobbyPage({
    params,
}: {
    params: { gameId: string };
}) {
    return <LobbyScreen gameId={params.gameId} />;
}
