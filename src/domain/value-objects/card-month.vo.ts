import { err, ok, Result } from "neverthrow";
import { CardMonthInvalidException } from "../exceptions/card-month";
import { ValueObject } from "./value-object";

interface CardProps {
    value: string;
}

export type cardMonthResul = Result<CardMonthVo, CardMonthInvalidException>;

export class CardMonthVo extends ValueObject<CardProps> {
    private constructor(props: CardProps) {
        super(props);
    }

    get value(): string {
        return this.props.value;
    }

    static create(cardMonth: string): cardMonthResul {
        if (this.isValid(cardMonth)) {
            return ok(new CardMonthVo({ value: cardMonth }));
        }
        return err(new CardMonthInvalidException());
    }

    private static isValid(cardMonth: string): boolean {
        return cardMonth.length === 2 && parseInt(cardMonth) >= 1 && parseInt(cardMonth) <= 12;
    }
}