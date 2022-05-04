import {IsString, IsNotEmpty, MaxLength, MinLength} from 'class-validator';

export class CreateUserRequest{
    @IsString()
    @IsNotEmpty()
    firstName: string

    @IsString()
    @IsNotEmpty()
    lastName: string

    @IsString()
    @IsNotEmpty()
    @MinLength(5, {
        message: "username must be at least 5 characters"
    })
    @MaxLength(20, {
        message: "username must not be more than 20 characters"
    })
    username: string;
}

export class GetUserValidation{
    req: Express.Request;
}