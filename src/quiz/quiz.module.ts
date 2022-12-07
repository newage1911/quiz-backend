import { Module } from "@nestjs/common";
import { DatabaseModule } from "src/database/database.module";
import { answerProvider } from "src/providers/answer.provider";
import { userProvider } from "src/providers/user.provider";
import { quizProvider } from "src/providers/quiz.provider";
import { quizController } from "./quiz.controller";
import { quizService } from "./quiz.service";

@Module({
    imports:[DatabaseModule],
    controllers:[quizController],
    providers: [...quizProvider, quizService, ...answerProvider, ...userProvider],
})
export class QuizModule {}
