export enum DomainExceptionCode {
    CARD_NUMBER_INVALID = 'CARD_NUMBER_INVALID',
    CARD_MONTH_INVALID = 'CARD_MONTH_INVALID',
    CARD_YEAR_INVALID = 'CARD_YEAR_INVALID',
    CARD_EMAIL_INVALID = 'CARD_EMAIL_INVALID',
    CLIENT_PK_INVALID = 'CLIENT_PK_INVALID',
    DEFAULT = 'DEFAULT',
}

export class DomainException extends Error {
    constructor(
        public readonly message: string,
    ) {
        super(message);
        this.name = DomainExceptionCode.DEFAULT;
    }
}