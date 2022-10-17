import Footer from 'components/Layout/Footer/Footer'
import NavBar from 'components/Layout/NavBar/NavBar'
import FrequentlyQuestions from 'components/Sections/FrequentlyQuestions/FrequentlyQuestions'
import Header from 'components/Sections/Header/Header'
import SolutionSteps from 'components/Sections/SolutionSteps/SolutionSteps'
import Specialties from 'components/Sections/Specialties/Specialties'
import TeamExperience from 'components/Sections/TeamExperience/TeamExperience'
import Testimonials from 'components/Sections/Testimonials/Testimonials'
import type { NextPage } from 'next'
import Head from 'next/head'

const Home: NextPage = () => {
    return (
        <div className="flex min-h-screen flex-col items-center py-2">
            <Head>
                <title>Create Next App</title>
                <link rel="icon" href="/favicon.ico" />
            </Head>

            <main className="w-full h-full">
                <NavBar />
                <div className="px-[9.375rem] mt-[4.375rem]">
                    <Header />
                    <SolutionSteps />
                    <Specialties />
                    <TeamExperience />
                    <Testimonials />
                    <FrequentlyQuestions />
                    <Footer />
                </div>
            </main>
        </div>
    )
}

export default Home
