import { BadRequestException, Inject } from "@nestjs/common";
import { CommandHandler, ICommand, ICommandHandler } from "@nestjs/cqrs";
import { Card } from "src/domain/aggregates/card";
import { CardRepository } from "src/domain/repositories/card.repository";
import { CardEmailVo } from "src/domain/value-objects/card-email.vo";
import { CardMonthVo } from "src/domain/value-objects/card-month.vo";
import { CardVo } from "src/domain/value-objects/card-number.vo";
import { CardYearVo } from "src/domain/value-objects/card-year.vo";
import { ClientPkVo } from "src/domain/value-objects/client-pk.vo";
import { CardInfrastructure } from "src/infrastructure/card.infrastructure";
import { CreateTokenResponseDto } from "../dtos/create-token-response.dto";

export class CreateTokenCommand implements ICommand {
    constructor(
        public readonly cardNumber: string,
        public readonly cvv: string,
        public readonly expirationMonth: string,
        public readonly expirationYear: string,
        public readonly email: string,
        public readonly pk: string
    ) { }
    }
    @CommandHandler(CreateTokenCommand)
    export class CreateTokenCommandHandler implements ICommandHandler < CreateTokenCommand, CreateTokenResponseDto > {
        constructor(
            @Inject(CardInfrastructure)
            private repository: CardRepository
        ) { }

        async execute(command: CreateTokenCommand): Promise<CreateTokenResponseDto> {
            const { cardNumber, cvv, expirationMonth, expirationYear, email,pk } = command;

            const cardNumberResult = CardVo.create(cardNumber);
            if (cardNumberResult.isErr()) {
                throw new BadRequestException(cardNumberResult.error.message, cardNumberResult.error.name);
            }

            const cardEmailResult = CardEmailVo.create(email);
            if (cardEmailResult.isErr()) {
                throw new BadRequestException(cardEmailResult.error.message, cardEmailResult.error.name);
            }

            const cardYearResult = CardYearVo.create(expirationYear);
            if (cardYearResult.isErr()) {
                throw new BadRequestException(cardYearResult.error.message, cardYearResult.error.name);
            }

            const cardMonthResult = CardMonthVo.create(expirationMonth);
            if (cardMonthResult.isErr()) {
                throw new BadRequestException(cardMonthResult.error.message, cardMonthResult.error.name);
            }

            const pkExistResult = ClientPkVo.create(pk);
            if (pkExistResult.isErr()) {
                throw new BadRequestException(pkExistResult.error.message, pkExistResult.error.name);
            }

            const card = new Card({cardNumber, cvv, expirationMonth, expirationYear, email});
            const carsSaved = await this.repository.save(card);
            return CreateTokenResponseDto.fromDomaintoResponse(carsSaved);
        }
    }
