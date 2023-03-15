import { Test, TestingModule } from '@nestjs/testing';
import { CreateTokenCommand, CreateTokenCommandHandler } from '../../src/application/commands/create-token.command';
import { CardInfrastructure } from 'src/infrastructure/card.infrastructure';
let app: TestingModule;
let createTokenCommandHandler: any
jest.mock('jsonwebtoken', () => ({
    sign: jest.fn().mockReturnValue('mockedToken'),
}));
jest.mock('src/infrastructure/card.infrastructure', () => ({
    CardInfrastructure: jest.fn().mockImplementation(() => ({
        save: jest.fn().mockImplementation(() => ({
            properties: () => ({
                cardNumber: '4111111111111111',
                cvv: '123',
                expirationMonth: '12',
                expirationYear: '2028',
                email: 'robert@gmail.com',
                id: '1',
                token: 'mockedToken'
            }),
        })),
    })),
}));
describe('create-token command', () => {
    beforeAll(
        async () => {
            app = await Test.createTestingModule({
                providers: [CreateTokenCommandHandler, CardInfrastructure],
            })
                .compile();
            createTokenCommandHandler = app.get<CreateTokenCommandHandler>(CreateTokenCommandHandler);
        }
    )
    test('should create a token', async () => {
        const command = new CreateTokenCommand('4111111111111111', '123', '12', '2028', 'robert@gmail.com', 'pk_test_ddsasdasda');
        const result = await createTokenCommandHandler.execute(command);
        expect(result).toEqual({
            cardNumber: '4111111111111111',
            cvv: '123',
            expirationMonth: '12',
            expirationYear: '2028',
            email: 'robert@gmail.com',
            token: 'mockedToken'
        });
    })
});