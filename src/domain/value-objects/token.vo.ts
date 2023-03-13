import { err, ok, Result } from "neverthrow";
import { TokenInvalidException } from "../exceptions/token";
import { ValueObject } from "./value-object";
import { verify } from 'jsonwebtoken';

interface CardProps {
    value: string;
}

export type tokenResult = Result<TokenVo, TokenInvalidException>;

export class TokenVo extends ValueObject<CardProps> {
    private constructor(props: CardProps) {
        super(props);
    }

    get value(): string {
        return this.props.value;
    }

    static create(token: string): tokenResult {
        if (this.isValid(token)) {
            return ok(new TokenVo({ value: token }));
        }
        return err(new TokenInvalidException());
    }

    private static isValid(token: string): boolean {
        try {
            verify(token, process.env.JWT_SECRET);
            return true;
        } catch (error) {
            return false;
        }
    }
}