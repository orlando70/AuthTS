import {IsString, IsNotEmpty, IsEmail, MinLength, IsUUID} from 'class-validator';

export class RegisterRequest{
    @IsString()
    @IsNotEmpty()
    firstName: string;

    @IsString()
    @IsNotEmpty()
    lastName: string;

    @IsEmail()
    email: string;

    @IsString()
    @MinLength(8, {
        message: "Password must contain at least 8 characters"
    })
    password: string;
}

export class LoginRequest {
    @IsEmail()
    email: string;

    @IsString()
    password: string;
}

export class EmailVerification {
    @IsString()
    token: string;
}

export class ResetPassword {
    @IsString()
    @IsUUID()
    userId: string;

    @IsString()
    @MinLength(8, {
        message: "Password must contain at least 8 characters"
    })
    newPassword: string;
}

export class ResetPasswordRequest {
    @IsEmail()
    email: string;
}

export class Logout {
    @IsString()
    token: string;
}