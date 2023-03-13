import { Card } from "src/domain/aggregates/card";
import { CardEntity } from "src/infrastructure/entities/card.entity";

export class CardDto {
    static fromDomainToEntity(card: Card): CardEntity {
        const cardEntity = new CardEntity();
        cardEntity.cardNumber = card.properties().cardNumber;
        cardEntity.cvv = card.properties().cvv;
        cardEntity.expirationMonth = card.properties().expirationMonth;
        cardEntity.expirationYear = card.properties().expirationYear;
        cardEntity.email = card.properties().email;
        cardEntity.createdAt = card.properties().createdAt;
        cardEntity.token = card.properties().token;
        return cardEntity;
    }

    static fromEntityToDomain(cardEntity: CardEntity): Card {
        const card = new Card({
            cardNumber: cardEntity.cardNumber,
            cvv: cardEntity.cvv,
            expirationMonth: cardEntity.expirationMonth,
            expirationYear: cardEntity.expirationYear,
            email: cardEntity.email,
            token: cardEntity.token
        });
        return card;
    }
}