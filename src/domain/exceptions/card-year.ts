import { DomainException, DomainExceptionCode } from "src/core/exceptions/domain.exceptions";

export class CardYearInvalidException extends DomainException {
    constructor() {
        super(CardYearInvalidException.getMessage());
        this.name = DomainExceptionCode.CARD_YEAR_INVALID;
    }
    static getMessage(): string {
        return 'Card year is invalid';
    }
}