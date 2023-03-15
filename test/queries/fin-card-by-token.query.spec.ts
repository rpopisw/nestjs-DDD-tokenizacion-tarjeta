import { Test, TestingModule } from "@nestjs/testing";
import { FindCardByTokenQuery, FindCardByTokenQueryHandler } from "src/application/queries/find-card-by-token.query";
import { CardInfrastructure } from "src/infrastructure/card.infrastructure";

let app: TestingModule
let findCardByTokenQueryHandler: any

jest.mock('jsonwebtoken', () => ({
    verify: jest.fn().mockReturnValue('mockedToken'),
}));

jest.mock('src/infrastructure/card.infrastructure', () => ({
    CardInfrastructure: jest.fn().mockImplementation(() => ({
        findByToken: jest.fn().mockImplementation(() => ({
            properties: () => ({
                cardNumber: '4111111111111111',
                cvv: '123',
                expirationMonth: '12',
                expirationYear: '2028',
                email: '',
                id: '1',
            }),
        })),
    })),
}));

describe('find-card-by-token query', () => {
    beforeAll(
        async () => {
            app = await Test.createTestingModule({
                providers: [FindCardByTokenQueryHandler, CardInfrastructure],
            })
                .compile();
            findCardByTokenQueryHandler = app.get<FindCardByTokenQueryHandler>(FindCardByTokenQueryHandler);
        }
    )
    test('should find a card by token', async () => {
        const query = new FindCardByTokenQuery('mockedToken');
        const result = await findCardByTokenQueryHandler.execute(query);
        expect(result).toEqual({
            cardNumber: '4111111111111111',
            expirationMonth: '12',
            expirationYear: '2028',
            email: '',  
        });
    })

    test('should throw an error if token is invalid', async () => {
        try {
            const query = new FindCardByTokenQuery('invalidToken');
            const result = await findCardByTokenQueryHandler.execute(query);            
        } catch (error) {   
           expect(error).toEqual(new Error('invalid token'));
        }
    })
})