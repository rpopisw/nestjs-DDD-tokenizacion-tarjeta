import { InjectModel } from "@nestjs/mongoose";
import { Model } from "mongoose";
import { Card } from "src/domain/aggregates/card";
import { CardRepository } from "src/domain/repositories/card.repository";
import { CardDto } from "./dtos/card.dto";
import { CardDocument } from "./entities/card.entity";

export class CardInfrastructure implements CardRepository {

    constructor(
        @InjectModel('Cards') private readonly cardModel: Model<CardDocument>
    ) {}

    async save(card: Card): Promise<Card> {
        const cardEntity = CardDto.fromDomainToEntity(card);
        console.log('cardEntity', cardEntity)
        const savedCard = await this.cardModel.create(cardEntity);
        return CardDto.fromEntityToDomain(savedCard);
    }
}