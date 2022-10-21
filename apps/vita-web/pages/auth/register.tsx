import Image from 'next/image'
import Link from 'next/link'
import logo from '../../public/logo.svg'
import loginImage from '../../public/login-image.png'

type Props = {}

const Register = (props: Props) => {
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
                            Create an account
                        </span>
                    </h1>
                    <form className="w-full flex flex-col items-center gap-10">
                        <div className="flex flex-col gap-4 w-4/6">
                            <label
                                htmlFor=""
                                className="text-2xl tracking-wide"
                            >
                                First Name
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
                                Last Name
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
                            <button
                                type="submit"
                                className="bg-secondary-600 text-white w-4/6 py-2 rounded-md"
                            >
                                <span className="text-2xl font-semibold">
                                    Next
                                </span>
                            </button>
                            <div>
                                <p>
                                    Already have an account?{' '}
                                    <Link href="/auth/register">
                                        <span className="cursor-pointer underline underline-offset-2 text-secondary-900">
                                            Login here
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

export default Register
