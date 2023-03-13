import { Card } from "src/domain/aggregates/card";

export interface FindCardResponse{
    cardNumber: string;
    expirationMonth: string;
    expirationYear: string;
    email: string;
}

export class CardResponse{
    static fromDomainToResponse(card: Card): FindCardResponse{
        return {
            cardNumber: card.properties().cardNumber,
            expirationMonth: card.properties().expirationMonth,
            expirationYear: card.properties().expirationYear,
            email: card.properties().email
        }
    }
}