import { Card } from "../aggregates/card";

export interface CardRepository {
    save(card: Card): Promise<Card>;
    findByToken(token: string): Promise<Card>;
}