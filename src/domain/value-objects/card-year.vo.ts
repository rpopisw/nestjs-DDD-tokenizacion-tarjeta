import { err, ok,Result } from "neverthrow";
import { CardYearInvalidException } from "../exceptions/card-year";
import { ValueObject } from "./value-object";

interface CardProps{
    value: string;
}

export type cardYearResult = Result<CardYearVo, CardYearInvalidException>;

export class CardYearVo extends ValueObject<CardProps>{
    private constructor(props: CardProps){
        super(props);
    }

    get value(): string{
        return this.props.value;
    }

    static create(cardYear: string): cardYearResult{
        if(this.isValid(cardYear)){
            return ok(new CardYearVo({value: cardYear}));
        }
        return err(new CardYearInvalidException());
    }

    private static isValid(cardYear: string): boolean{
        return cardYear.length === 4 && parseInt(cardYear) >= new Date().getFullYear() && parseInt(cardYear) <= new Date().getFullYear() + 5;
    }
}