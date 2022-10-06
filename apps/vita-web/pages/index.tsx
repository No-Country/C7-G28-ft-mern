import NavBar from 'components/NavBar/NavBar'
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
                <NavBar isLogged />
            </main>
        </div>
    )
}

export default Home
