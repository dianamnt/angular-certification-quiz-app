import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Subscription } from 'rxjs';
import { Category } from '../../models/category.model';
import { QuizService } from '../../services/quiz.service';

enum Difficulty {
  EASY = 'Easy',
  MEDIUM = 'Medium',
  HARD = 'Hard',
}

@Component({
  selector: 'app-quiz-maker',
  templateUrl: './quiz-maker.component.html',
  styleUrls: ['./quiz-maker.component.css'],
})
export class QuizMakerComponent implements OnInit, OnDestroy {
  categories: Category[];
  quizForm = new FormGroup({
    category: new FormControl<Category | null>(null, Validators.required),
    difficulty: new FormControl<string | null>(null, Validators.required),
  });
  readonly Difficulty = Difficulty;
  subscription: Subscription = new Subscription();

  constructor(private quizService: QuizService) {}

  ngOnInit() {
    this.getCategories();
  }

  getCategories() {
    this.subscription.add(
      this.quizService.getAllCategories().subscribe((data) => {
        this.categories = data.trivia_categories;
        console.log(this.categories);
      })
    );
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }
}
