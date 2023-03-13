import { IsEmail, IsString, MaxLength, MinLength} from "class-validator";

export class CreateTokenDto{
    @IsString()
    card_number: string;

    @IsString()
    @MinLength(3)
    @MaxLength(4)
    cvv: string;

    @IsString()
    expiration_month: string;

    @IsString()
    expiration_year: string;
    
    @IsEmail()
    email: string;
}