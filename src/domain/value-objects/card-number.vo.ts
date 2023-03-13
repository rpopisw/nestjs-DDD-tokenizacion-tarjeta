import { err, ok, Result } from 'neverthrow';
import { CardNumberInvalidException } from '../exceptions/card-number';
import { ValueObject } from './value-object';

interface CardProps {
    value: string;
}

export type cardNumberResult = Result<CardVo, CardNumberInvalidException>;

export class CardVo extends ValueObject<CardProps> {
    private constructor(props: CardProps) {
        super(props);
    }

    get value(): string {
        return this.props.value;
    }

    static create(cardNumber: string): cardNumberResult {
        if (this.isValid(cardNumber)) {
            return ok(new CardVo({ value: cardNumber }));
        }
        return err(new CardNumberInvalidException());
    }

    private static isValid(cardNumber: string): boolean {
        let sum = 0;
        let shouldDouble = false;
        for (let i = cardNumber.length - 1; i >= 0; i--) {
            let digit = parseInt(cardNumber.charAt(i));
            if (shouldDouble) {
                if ((digit *= 2) > 9) digit -= 9;
            }
            sum += digit;
            shouldDouble = !shouldDouble;
        }
        return sum % 10 === 0;    }
}