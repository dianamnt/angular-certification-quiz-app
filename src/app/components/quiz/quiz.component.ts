import { Component, Input, OnChanges, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { Quiz } from '../../models/quiz.model';
import { SharingService } from '../../services/sharing.service';

@Component({
  selector: 'app-quiz',
  templateUrl: './quiz.component.html',
  styleUrls: ['./quiz.component.css'],
})
export class QuizComponent implements OnInit, OnChanges {
  @Input() quiz: Quiz;
  showSubmit: boolean;

  constructor(private sharingService: SharingService, private router: Router) {}

  ngOnChanges(): void {
    this.setAllAnswers();
    this.showSubmit = false;
    console.log(this.quiz);
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

  checkAllQuestionsAnswered() {
    let counter = 0;
    this.quiz.results.forEach((q) => {
      if (q.userAnswer) {
        counter++;
      }
    });
    if (counter === this.quiz.results.length) {
      this.showSubmit = true;
    }
  }

  goToResults() {
    this.sharingService.changeData(JSON.stringify(this.quiz));
    this.router.navigate(['results']);
  }
}
