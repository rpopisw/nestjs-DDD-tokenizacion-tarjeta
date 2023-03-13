import { Body, Controller, Post, Headers } from "@nestjs/common";
import { CommandBus } from "@nestjs/cqrs";
import { CreateTokenCommand } from "src/application/commands/create-token.command";
import { CreateTokenDto } from "./dtos/create-token.dto";

@Controller('card')
export class CardController {
    constructor(
        private readonly commandBus: CommandBus
    ) {}

    @Post('create-token')
    async createToken(@Body() body:CreateTokenDto,@Headers('pk') pk:string ){
        const { card_number:cardNumber, cvv, expiration_month:expirationMonth, expiration_year:expirationYear, email } = body;
        const command = new CreateTokenCommand(cardNumber, cvv, expirationMonth, expirationYear, email, pk);
        return await this.commandBus.execute(command);
    }
}