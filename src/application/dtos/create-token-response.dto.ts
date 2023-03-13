import { Card } from "src/domain/aggregates/card";

export class CreateTokenResponse{
    token: string;
    cardNumber: string;
    cvv: string;
    expirationMonth: string;
    expirationYear: string;
    email: string;
}

export class CreateTokenResponseDto{
    static fromDomaintoResponse(card: Card): CreateTokenResponse{
        return {
            token: card.properties().token,
            cardNumber: card.properties().cardNumber,
            cvv: card.properties().cvv,
            expirationMonth: card.properties().expirationMonth,
            expirationYear: card.properties().expirationYear,
            email: card.properties().email
        }
    }
}