import Image from 'next/image'
// import Link from 'next/link'
import logo from '../../public/logo.svg'
import loginImage from '../../public/login-image.png'
import RegisterForm from 'components/Form/RegisterForm'

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
                    <RegisterForm />
                </section>
            </div>
        </main>
    )
}

export default Register
