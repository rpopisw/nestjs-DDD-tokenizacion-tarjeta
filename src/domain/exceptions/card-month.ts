import { DomainException, DomainExceptionCode } from "src/core/exceptions/domain.exceptions";

export class CardMonthInvalidException extends DomainException {
    constructor() {
        super(CardMonthInvalidException.getMessage());
        this.name = DomainExceptionCode.CARD_MONTH_INVALID;
    }
    static getMessage(): string {
        return 'Card month is invalid';
    }
}