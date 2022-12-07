import { Module } from '@nestjs/common';
import { RouterModule } from '@nestjs/core';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { QuizModule } from './quiz/quiz.module';


@Module({
  imports: [
    QuizModule,
    RouterModule.register([
      {
        path: 'api/quiz',
        module: QuizModule
      }
    ])],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
