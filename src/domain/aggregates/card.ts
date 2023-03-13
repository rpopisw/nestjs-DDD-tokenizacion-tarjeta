import { AggregateRoot } from "@nestjs/cqrs";
import { sign } from 'jsonwebtoken';

export type CardEssentials = {
    readonly cardNumber: string;
    readonly cvv: string;
    readonly expirationMonth: string;
    readonly expirationYear: string;
    readonly email: string;
}

export type CardOptional = {
    readonly id: string;
    readonly token: string;
}

export type CardProperties = Required<CardEssentials> & Partial<CardOptional>;

export class Card extends AggregateRoot{
    private readonly id: string;
    private readonly cardNumber: string;
    private readonly cvv: string;
    private readonly expirationMonth: string;
    private readonly expirationYear: string;
    private readonly email: string;
    private readonly createdAt: Date;
    private readonly token: string;

    constructor(props: CardProperties) {
        super();
        Object.assign(this, props);
        this.createdAt = new Date();
        this.token = this.generateToken();
    }

    private generateToken(): string{
        return sign({
            cardNumber: this.cardNumber,
            cvv: this.cvv,
            expirationMonth: this.expirationMonth,
            expirationYear: this.expirationYear,
            email: this.email
        }, process.env.SECRET_KEY, { expiresIn: '1m' });
    }

    properties(){
        return {
            id: this.id,
            cardNumber: this.cardNumber,
            cvv: this.cvv,
            expirationMonth: this.expirationMonth,
            expirationYear: this.expirationYear,
            email: this.email,
            createdAt: this.createdAt,
            token: this.token
        }
    }

}