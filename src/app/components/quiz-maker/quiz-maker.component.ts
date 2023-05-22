import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Subscription } from 'rxjs';
import { Category } from '../../models/category.model';
import { QuizService } from '../../services/quiz.service';
import { SharingService } from '../../services/sharing.service';

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
  showQuiz: boolean = false;

  subscription: Subscription = new Subscription();

  constructor(private quizService: QuizService) {}

  ngOnInit() {
    this.getCategories();
  }

  private getCategories() {
    this.subscription.add(
      this.quizService.getAllCategories().subscribe((data) => {
        this.categories = data.trivia_categories;
      })
    );
  }

  openQuiz() {
    this.showQuiz = true;
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }
}
