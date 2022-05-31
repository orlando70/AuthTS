import {IsString, IsNotEmpty, IsEmail} from 'class-validator';

export class GetUserRequest{
    @IsString()
    userId: string;
}