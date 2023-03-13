import { DomainException, DomainExceptionCode } from "src/core/exceptions/domain.exceptions";

export class TokenInvalidException extends DomainException {
    constructor() {
        super(TokenInvalidException.getMessage());
        this.name = DomainExceptionCode.TOKEN_INVALID;
    }

    static getMessage(): string {
        return 'Token is expired';
    }
}