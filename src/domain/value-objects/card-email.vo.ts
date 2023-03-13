import { err, ok, Result } from "neverthrow";
import { CardEmailInvalidException } from "../exceptions/card-email";
import { ValueObject } from "./value-object";

interface CardProps{
    value: string;
}

export type cardEmailResult = Result<CardEmailVo, CardEmailInvalidException>;

export class CardEmailVo extends ValueObject<CardProps>{
    private constructor(props: CardProps){
        super(props);
    }

    get value(): string{
        return this.props.value;
    }

    static create(cardEmail: string): cardEmailResult{
        if(this.isValid(cardEmail)){
            return ok(new CardEmailVo({value: cardEmail}));
        }
        return err(new CardEmailInvalidException());
    }

    private static isValid(cardEmail: string): boolean{
        const emailDomain = cardEmail.split('@')[1];
        return cardEmail.includes('@') && ['gmail.com', 'hotmail.com', 'yahoo.com'].includes(emailDomain);
    }
}