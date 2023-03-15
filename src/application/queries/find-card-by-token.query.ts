import { BadRequestException, Inject } from "@nestjs/common";
import { IQuery, IQueryHandler, QueryHandler } from "@nestjs/cqrs";
import { CardRepository } from "src/domain/repositories/card.repository";
import { TokenVo } from "src/domain/value-objects/token.vo";
import { CardInfrastructure } from "src/infrastructure/card.infrastructure";
import { CardResponse } from "../dtos/find-card-by-token.response.dto";

export class FindCardByTokenQuery implements IQuery{
    constructor(
        public readonly token: string,
    ) {}
}

@QueryHandler(FindCardByTokenQuery)
export class FindCardByTokenQueryHandler implements IQueryHandler<FindCardByTokenQuery,CardResponse >{
    
    constructor(@Inject(CardInfrastructure) private repository: CardRepository) {}

    async execute(query: FindCardByTokenQuery): Promise<CardResponse> {
        const { token } = query;

        const tokenResult = TokenVo.create(token);

        if (tokenResult.isErr()) {
            throw new BadRequestException(tokenResult.error.message, tokenResult.error.name);
        }
        const card = await this.repository.findByToken(token);
        return CardResponse.fromDomainToResponse(card);
    }
}