import { DomainException, DomainExceptionCode } from "src/core/exceptions/domain.exceptions";

export class ClientPkInvalidException extends DomainException {
    constructor() {
        super(ClientPkInvalidException.getMessage());
        this.name = DomainExceptionCode.CLIENT_PK_INVALID;
    }
    static getMessage(): string {
        return 'Client pk is invalid';
    }
}