import LudoComponent from "@/src/screens/LudoScreen"

const LudoScreen = async ({ params }: { params: Promise<{ id: string }> }) => {
    const { id } = await params;
    return <LudoComponent id={id} />
}

export default LudoScreen
