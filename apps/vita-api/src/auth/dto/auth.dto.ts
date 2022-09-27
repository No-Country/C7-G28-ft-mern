import { IsEmail, IsNotEmpty, IsString } from 'class-validator'

export class AuthDto {
    @IsNotEmpty()
    @IsEmail()
    email: string

    @IsNotEmpty()
    @IsString()
    password: string

    private saludar(name: string) {
        console.log(`Hola ${name}`)
    }
}
