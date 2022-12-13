import {
    Controller,
    Get,
    Post,
    Body,
    Param,
    Patch,
    Delete,
  } from '@nestjs/common';
  import { Quiz } from '../entities/quiz.entity';
  import { User } from '../entities/user.entity';
  import { Answer } from '../entities/answer.entity';
  import { quizService } from './quiz.service';
  
  @Controller()
  export class quizController {
    constructor(private quizService: quizService) {}
  
    @Get()
    getQuiz() {
      return this.quizService.getQuiz();
    }
  
    @Get('score')
    getScore(): Promise<Quiz[]> {
      return this.quizService.getScoreBoard();
    }
  
    @Post()
    create(@Body() quiz: Quiz) {
      return this.quizService.addQuiz(quiz);
    }
  
    @Patch()
    update(@Body() quiz: Quiz) {
      return this.quizService.updateQuiz(quiz);
    }
  
    @Get('team/:uid')
    async findTeam(@Param('uid') uid: string): Promise<User> {
      return await this.quizService.findTeamByUid(uid);
    }
  
    @Get('answer/:id')
    async findAnswer(@Param('id') id: number): Promise<Answer> {
      return await this.quizService.findOneById(id);
    }
  
    @Delete('reset')
    deleteAllQuiz() {
      return this.quizService.deleteAllQuiz();
    }
  }
  