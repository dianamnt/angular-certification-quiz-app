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
        .getQuiz(this.categoryId, this.difficulty.toLowerCase())
        .subscribe((data) => {
          this.quiz = data;
          // this.sharingService.changeData(JSON.stringify(this.quiz));
        })
    );
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }
}
