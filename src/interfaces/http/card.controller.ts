import { Body, Controller, Post, Headers, Param, Get } from "@nestjs/common";
import { CommandBus, QueryBus } from "@nestjs/cqrs";
import { ApiHeader, ApiResponse, ApiTags } from "@nestjs/swagger";
import { CreateTokenCommand } from "src/application/commands/create-token.command";
import { CreateTokenResponse } from "src/application/dtos/create-token-response.dto";
import { FindCardByTokenQuery } from "src/application/queries/find-card-by-token.query";
import { CreateTokenDto } from "./dtos/create-token.dto";

@Controller('card')
@ApiTags('card')
export class CardController {
    constructor(
        private readonly commandBus: CommandBus,
        private readonly queryBus: QueryBus,
    ) { }

    @ApiResponse({
        status: 201,
        description: 'The card has been successfully created and create token',
        type: CreateTokenDto,
    })
    @ApiHeader({
        name: 'pk',
        description: 'pk business',
      })
    @Post('create-token')
    async createToken(@Body() body: CreateTokenDto, @Headers('pk') pk: string) {
        const { card_number: cardNumber, cvv, expiration_month: expirationMonth, expiration_year: expirationYear, email } = body;
        const command = new CreateTokenCommand(cardNumber, cvv, expirationMonth, expirationYear, email, pk);
        return await this.commandBus.execute(command);
    }

    @ApiResponse({
        status: 200,
        description: 'The card has been successfully found',
    })
    @ApiHeader({
        name: 'pk',
        description: 'pk business',
      })
    @Get(':token')
    async findCardByToken(@Param('token') token: string) {
        const query = new FindCardByTokenQuery(token);
        return await this.queryBus.execute(query);
    }
}