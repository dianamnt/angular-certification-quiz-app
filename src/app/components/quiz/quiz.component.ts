import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { Quiz } from '../../models/quiz.model';
import { QuizService } from '../../services/quiz.service';
import { SharingService } from '../../services/sharing.service';

@Component({
  selector: 'app-quiz',
  templateUrl: './quiz.component.html',
  styleUrls: ['./quiz.component.css'],
})
export class QuizComponent implements OnInit, OnDestroy {
  @Input() categoryId: number;
  @Input() difficulty: string;
  quiz: Quiz;
  subscription: Subscription = new Subscription();

  constructor(
    private quizService: QuizService,
    private sharingService: SharingService,
    private router: Router
  ) {}

  ngOnInit() {
    this.getQuiz();
  }

  private getQuiz() {
    this.subscription.add(
      this.quizService
        .getQuiz(this.categoryId, this.difficulty)
        .subscribe((data) => {
          this.quiz = data;
          this.setAllAnswers();
          console.log(this.quiz);
        })
    );
  }

  private setAllAnswers() {
    this.quiz.results.forEach((el) => {
      el.all_answers = this.shuffleAnswers([
        ...el.incorrect_answers,
        el.correct_answer,
      ]);
    });
  }

  private shuffleAnswers(answers: string[]) {
    let currentIndex = answers.length;
    while (currentIndex != 0) {
      let randomIndex = Math.floor(Math.random() * currentIndex);
      currentIndex--;
      [answers[currentIndex], answers[randomIndex]] = [
        answers[randomIndex],
        answers[currentIndex],
      ];
    }
    return answers;
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }
}
