import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { CqrsModule } from '@nestjs/cqrs';
import { MongooseModule } from '@nestjs/mongoose';
import { CreateTokenCommandHandler } from './application/commands/create-token.command';
import { FindCardByTokenQueryHandler } from './application/queries/find-card-by-token.query';
import { CardInfrastructure } from './infrastructure/card.infrastructure';
import { CardSchema } from './infrastructure/entities/card.entity';
import { CardController } from './interfaces/http/card.controller';
import { HealthController } from  './interfaces/http/health.controller';


const controllers = [HealthController, CardController];
const application = [CreateTokenCommandHandler, FindCardByTokenQueryHandler]
const infrastructure = [CardInfrastructure];
@Module({
  imports: [
    CqrsModule,
    ConfigModule.forRoot({
      envFilePath: '.env',
    }),
    MongooseModule.forRoot(process.env.MONGO_URL),
    MongooseModule.forFeature([
      { name: 'Cards', schema: CardSchema}
    ]),
  ],
  controllers: [...controllers],
  providers: [...application, ...infrastructure,],
})
export class AppModule {}
