import { DomainException, DomainExceptionCode } from "src/core/exceptions/domain.exceptions";

export class CardEmailInvalidException extends DomainException {
    constructor() {
        super(CardEmailInvalidException.getMessage());
        this.name = DomainExceptionCode.CARD_EMAIL_INVALID;
    }
    static getMessage(): string {
        return 'Card email is invalid';
    }
}