import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { HydratedDocument } from "mongoose";

export type CardDocument = HydratedDocument<CardEntity>;

@Schema()
export class CardEntity {
    @Prop(
        {
            type: String,
            required: true,
        }
    )
    cardNumber: string;

    @Prop(
        {
            type: String,
            required: true,
        }
    )
    cvv: string;

    @Prop(
        {
            type: String,
            required: true,
        }
    )
    expirationMonth: string;

    @Prop(
        {
            type: String,
            required: true,
        }
    )
    expirationYear: string;

    @Prop(
        {
            type: String,
            required: true,
        }
    )
    email: string;

    @Prop(
        {
            type: String,
            required: true,
        }
    )
    token: string;

    @Prop(
        {
            type: Date,
            required: true,
        }
    )
    createdAt: Date;
}

export const CardSchema = SchemaFactory.createForClass(CardEntity);