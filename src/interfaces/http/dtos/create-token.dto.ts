import { ApiProperty } from "@nestjs/swagger";
import { IsEmail, IsString, MaxLength, MinLength} from "class-validator";

export class CreateTokenDto{

    
    @ApiProperty()
    @IsString()
    card_number: string;

    @ApiProperty()
    @IsString()
    @MinLength(3)
    @MaxLength(4)
    cvv: string;

    @ApiProperty()
    @IsString()
    expiration_month: string;


    @ApiProperty()
    @IsString()
    expiration_year: string;


    @ApiProperty()
    @IsEmail()
    email: string;
}