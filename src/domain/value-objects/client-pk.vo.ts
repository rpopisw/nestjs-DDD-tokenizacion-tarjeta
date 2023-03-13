import { err, ok, Result } from "neverthrow";
import { ClientPkInvalidException } from "../exceptions/client-pk";
import { ValueObject } from "./value-object";

interface CardProps{
    value: string;
}

export type clientPkResult = Result<ClientPkVo, ClientPkInvalidException>;

export class ClientPkVo extends ValueObject<CardProps>{
    private constructor(props: CardProps){
        super(props);
    }

    get value(): string{
        return this.props.value;
    }

    static create(clientPk: string): clientPkResult{
        if(this.isValid(clientPk) && this.isExist(clientPk)){
            return ok(new ClientPkVo({value: clientPk}));
        }
        return err(new ClientPkInvalidException());
    }

    private static isExist(clientPk: string): boolean{
        return clientPk.length > 0;
    }

    private static isValid(clientPk: string): boolean{
        const pattern = /^pk_(test|prod)_[a-zA-Z0-9]+$/;
        return pattern.test(clientPk);
    }
}