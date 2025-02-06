import { GetStartedButton } from "./GetStarted";
import HeroText from "./HeroText";
import NavbarLandingPage from "./NavbarLandingPage";

export function LandingPage(){
    return <div className="flex flex-col h-full">
        {/* Navbar */}
        <div className="py-2 h-20">
            <NavbarLandingPage/>
        </div>
        <div className="flex items-center justify-center h-full">
        <div className="flex flex-col items-center">
        <HeroText/>
        <GetStartedButton/>
        
        </div>

        </div>
    </div>
}