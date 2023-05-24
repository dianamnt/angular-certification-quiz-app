import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { Question } from '../../models/question.model';
import { Quiz } from '../../models/quiz.model';
import { SharingService } from '../../services/sharing.service';

@Component({
  selector: 'app-results',
  templateUrl: './results.component.html',
  styleUrls: ['./results.component.css'],
})
export class ResultsComponent implements OnInit, OnDestroy {
  quiz: Quiz;
  score: number;
  subscription: Subscription = new Subscription();
  constructor(private sharingService: SharingService, private router: Router) {}

  ngOnInit() {
    this.getQuiz();
  }

  private getQuiz(): void {
    this.subscription.add(
      this.sharingService.currentData$.subscribe((data: string) => {
        this.quiz = JSON.parse(data);
        this.computeScore();
      })
    );
  }

  private computeScore(): void {
    this.score = 0;
    this.quiz.results.forEach((el: Question) => {
      if (el.userAnswer === el.correct_answer) {
        this.score++;
      }
    });
  }

  goToQuizMaker(): void {
    this.router.navigate(['quiz-maker']);
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }
}
