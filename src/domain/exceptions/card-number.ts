import { DomainException, DomainExceptionCode } from "src/core/exceptions/domain.exceptions";

export class CardNumberInvalidException extends DomainException {
    constructor() {
        super(CardNumberInvalidException.getMessage());
        this.name = DomainExceptionCode.CARD_NUMBER_INVALID;
    }
    static getMessage(): string {
        return 'Card number is invalid';
    }
}