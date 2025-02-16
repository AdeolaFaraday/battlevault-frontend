import Navbar from "../nav-bar"

const profilePhoto = "https://lh3.googleusercontent.com/a/ACg8ocIn_wSdYaOBH1NyPXP1BRVzJ2Ulzr-jQyia3Ev-4wzGILTDaIs=s96-c"

const NavWrapper = ({ children }: { children: React.ReactNode }) => {
    return <div>
        <Navbar profilePicture={profilePhoto} walletBalance={100000} />
        {children}
    </div>
}

export default NavWrapper;