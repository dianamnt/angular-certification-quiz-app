import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { Subscription } from 'rxjs';
import { Categories } from '../../models/categories.model';
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
  categoryControl = new FormControl<Category | null>(null, Validators.required);
  difficultyControl = new FormControl<string | null>(null, Validators.required);
  quiz: Quiz;
  showLoading: boolean = false;

  subscription: Subscription = new Subscription();

  constructor(private quizService: QuizService) {}

  ngOnInit(): void {
    this.getCategories();
  }

  private getCategories(): void {
    this.subscription.add(
      this.quizService.getAllCategories().subscribe({
        next: (data: Categories) => (this.categories = data.trivia_categories),
        error: (e: Error) => {
          console.error(e);
          alert('The server ran into an issue! Please try again later.');
        },
      })
    );
  }

  createQuiz(): void {
    this.showLoading = true;
    const categoryId = this.categoryControl.value.id;
    const difficulty = this.difficultyControl.value.toLowerCase();
    this.subscription.add(
      this.quizService.getQuiz(categoryId, difficulty).subscribe({
        next: (data: Quiz) => {
          this.quiz = data;
          this.showLoading = false;
        },
        error: (e: Error) => {
          console.error(e);
          alert('The server ran into an issue! Please try again later.');
        },
      })
    );
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }
}
