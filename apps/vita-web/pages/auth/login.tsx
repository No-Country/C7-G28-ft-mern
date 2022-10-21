import Image from 'next/image'
import logo from '../../public/logo.svg'
import loginImage from '../../public/login-image.png'
import Link from 'next/link'
import React from 'react'

type Props = {}

const Login = (props: Props) => {
    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        console.log('submit')
    }

    return (
        <main className="px-40 overflow-hidden">
            <div className="flex w-full h-screen">
                <section className="flex-1 w-full">
                    <div className="absolute z-10 bg-background w-96 h-40 px-10 flex items-center">
                        <Image
                            src={logo}
                            alt="Vita Logo"
                            width={345}
                            height={130}
                        />
                    </div>
                    <Image src={loginImage} alt="doctors walking on hospital" />
                </section>
                <section className="flex-1 flex-col w-full px-20 py-40 flex items-center gap-[6.25rem]">
                    <h1>
                        <span className="text-4xl font-semibold">
                            Welcome to
                        </span>
                        <span className="text-4xl font-semibold text-primary">
                            {' '}
                            Vita
                        </span>

                        <span className="text-4xl font-semibold">
                            {' '}
                            Health Care
                        </span>
                    </h1>
                    <form
                        className="w-full flex flex-col items-center gap-24"
                        onSubmit={handleSubmit}
                    >
                        <div className="flex flex-col gap-4 w-4/6">
                            <label
                                htmlFor=""
                                className="text-2xl tracking-wide"
                            >
                                Email
                            </label>
                            <input
                                type="text"
                                className="border-b border-primary-600 bg-transparent focus:outline-none focus:border-primary-900 pb-2"
                            />
                        </div>
                        <div className="flex flex-col gap-4 w-4/6">
                            <label
                                htmlFor=""
                                className="text-2xl tracking-wide"
                            >
                                Password
                            </label>
                            <input
                                type="paswword"
                                className="border-b border-primary-600 bg-transparent focus:outline-none focus:border-primary-900 pb-2"
                            />
                        </div>
                        <div className="flex flex-col w-full items-center gap-14">
                            <div className="flex items-center justify-between w-4/6">
                                <div className="flex items-center gap-4">
                                    <label htmlFor="" className="order-1">
                                        Remember for 10 days
                                    </label>
                                    <input
                                        type="checkbox"
                                        className="w-4 h-4"
                                    />
                                </div>
                                <Link href="/">
                                    <span className="cursor-pointer underline underline-offset-2">
                                        Are you forgot your password?
                                    </span>
                                </Link>
                            </div>
                            <button
                                type="submit"
                                className="bg-secondary-600 text-white w-4/6 py-2 rounded-md"
                            >
                                <span className="text-2xl font-semibold">
                                    Login
                                </span>
                            </button>
                            <div>
                                <p>
                                    Don&apos;t have an account?{' '}
                                    <Link href="/auth/register">
                                        <span className="cursor-pointer underline underline-offset-2 text-secondary-900">
                                            Sign up here
                                        </span>
                                    </Link>
                                </p>
                            </div>
                        </div>
                    </form>
                </section>
            </div>
        </main>
    )
}

export default Login
