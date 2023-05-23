import {
  Component,
  Input,
  OnChanges,
  OnDestroy,
  OnInit,
  SimpleChanges,
} from '@angular/core';
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
export class QuizComponent implements OnInit, OnChanges, OnDestroy {
  @Input() quiz: Quiz;
  subscription: Subscription = new Subscription();

  constructor(private sharingService: SharingService, private router: Router) {}

  ngOnChanges(changes: SimpleChanges): void {
    this.setAllAnswers();
  }

  ngOnInit() {}

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
