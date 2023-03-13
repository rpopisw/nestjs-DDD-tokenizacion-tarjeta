import { Module } from '@nestjs/common';
import { AppController } from  './interfaces/http/app.controller';

@Module({
  imports: [],
  controllers: [AppController],
  providers: [],
})
export class AppModule {}
