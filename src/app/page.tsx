import Advantages from "@/components/Advantages/Advantages"
import {Services} from "@/components/Services/Services"
import {Vehicles} from "@/components/Vehicles/Vehicles"
import {Reviews} from "@/components/Reviews/Reviews"
import Header from "@/components/Header/Header"
import {getServerTranslations} from "@/lib/server-translations";
import {Footer} from "@/components/Footer/Footer";
import {HeroSection} from "@/components/HeroSection/HeroSection";

export default async function Home() {
    const translations = await getServerTranslations('he')

    return (
        <div dir="rtl">
            <Header lang="he"/>
            <div style={{marginBottom: 60}}/>
            <main>
                <HeroSection lang="he" translations={translations}/>
                <Advantages lang="he" translations={translations}/>
                <Services lang="he" translations={translations}/>
                <Vehicles lang="he" translations={translations}/>
                <Reviews lang="he" translations={translations}/>
            </main>
            <Footer lang="he" translations={translations}/>
        </div>
    )
}