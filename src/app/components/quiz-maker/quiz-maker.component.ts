import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Subscription } from 'rxjs';
import { Category } from '../../models/category.model';
import { Quiz } from '../../models/quiz.model';
import { QuizService } from '../../services/quiz.service';

@Component({
  selector: 'app-quiz-maker',
  templateUrl: './quiz-maker.component.html',
  styleUrls: ['./quiz-maker.component.css'],
})
export class QuizMakerComponent implements OnInit, OnDestroy {
  categories: Category[];
  difficulties: string[] = ['Easy', 'Medium', 'Hard'];
  category = new FormControl<Category | null>(null, Validators.required);
  difficulty = new FormControl<string | null>(null, Validators.required);
  quiz: Quiz;

  subscription: Subscription = new Subscription();

  constructor(private quizService: QuizService) {}

  ngOnInit() {
    this.getCategories();
  }

  private getCategories() {
    this.subscription.add(
      this.quizService.getAllCategories().subscribe({
        next: (data) => (this.categories = data.trivia_categories),
        error: (e) => {
          console.error(e);
          alert('The server ran into an issue! Please try again later.');
        },
      })
    );
  }

  createQuiz() {
    this.subscription.add(
      this.quizService
        .getQuiz(this.category.value.id, this.difficulty.value.toLowerCase())
        .subscribe({
          next: (data) => (this.quiz = data),
          error: (e) => {
            console.error(e);
            alert('The server ran into an issue! Please try again later.');
          },
        })
    );
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }
}
