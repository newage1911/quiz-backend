import { Inject, Injectable } from "@nestjs/common";
import { InsertResult, Repository } from "typeorm";
import { Quiz } from "src/entities/quiz.entity";
import { Answer } from "src/entities/answer.entity";
import { User } from "src/entities/user.entity";

@Injectable()
export class quizService {
    constructor(
        @Inject('QUIZ_REPOSITORY')
        private quizRepository: Repository<Quiz>,
        @Inject('ANSWER_REPOSITORY')
        private answerRepository: Repository<Answer>,
        @Inject('USER_REPOSITORY')
        private userRepository: Repository<User>,
    ) {}

    async getQuiz(): Promise<Quiz[]> {
        return this.quizRepository.find();
    }

    async addQuiz(quiz: Quiz) {
        var uid = quiz.uid
        var number = quiz.quiz
        var check = await this.findByUidAndQuiz(uid, number)
        console.log(check)
            if (check) {
                return this.updateQuiz(quiz)
            } else {
                return this.newQuiz(quiz)
            }
    }

    async newQuiz(quiz: Quiz): Promise<InsertResult> {
        let id:number = Number(quiz.quiz);
        let answer:any = await this.findOneById(id);
        let correct_answer:number = Number(answer[0].answer_choice);
        let team:any = await this.findTeamByUid(quiz.uid);
        quiz.team = team[0].user_label;

        if (correct_answer === Number(quiz.choice)) {
            quiz.is_correct = true
        } else {
            quiz.is_correct = false
        }

        return this.quizRepository.insert(quiz)
    }

    async updateQuiz(quiz: Quiz) {
        let id:number = Number(quiz.quiz);
        let answer:any = await this.findOneById(id);
        let correct_answer:number = Number(answer[0].answer_choice);
        if (correct_answer === Number(quiz.choice)) {
            quiz.is_correct = true
        } else {
            quiz.is_correct = false
        }
        return this.quizRepository.update(
            { uid: quiz.uid, quiz: quiz.quiz, }, 
            { choice: quiz.choice, is_correct: quiz.is_correct })
    }

    async findByUidAndQuiz(uid: string, quiz: number) {
    let exist = await this.quizRepository.findOne({
        where: {
            uid: uid,
            quiz: quiz
        }
    });
    if (exist != null) {
        return true
    } else {
        return false
    }
    };

    findOneById(id: number) {
        const correct_answer = this.answerRepository
            .createQueryBuilder("answer")
            .where("answer.id = :id", {id})
            .select(["answer.choice"])
            .execute();
        return correct_answer;
    }
    
    findTeamByUid(uid: string) {
        const team = this.userRepository
            .createQueryBuilder("user")
            .where("user.uid = :uid", {uid})
            .select(["user.label"])
            .execute();
        return team;
    }

    // async getScoreBoard(): Promise<Quiz[]> {
    //     let score = await this.quizRepository
    //         .createQueryBuilder('quiz')
    //         .groupBy('quiz.team') // here is where we grup by the tag so we can count
    //         .select('quiz.team') // here is where we count :)
    //         .addSelect("COUNT(is_correct)", "score")
    //         .orderBy('count(TRUE)', 'DESC')
    //         // .limit(10) // here is the limit
    //         .execute();
    //     return score;
    // }
    async getScoreBoard(): Promise<Quiz[]> {
        let score = await this.quizRepository
            .createQueryBuilder('quiz')
            .where("quiz.team NOT LIKE 'Increase' ")
            .andWhere("quiz.team NOT LIKE 'Decrease' ")
            .groupBy('quiz.team') // here is where we grup by the tag so we can count
            .select('quiz.team') // here is where we count :)
            .addSelect("COUNT(CASE WHEN is_correct=true THEN 1 END)", "score")
            .orderBy('score', 'DESC')
            // .limit(10) // here is the limit
            .execute();
        return score;
    }
}
