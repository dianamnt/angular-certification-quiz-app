import { Component, Input, OnChanges, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Question } from '../../models/question.model';
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
  }

  ngOnInit(): void {}

  private setAllAnswers(): void {
    this.quiz.results.forEach((el: Question) => {
      el.all_answers = this.shuffleAnswers([
        ...el.incorrect_answers,
        el.correct_answer,
      ]);
    });
  }

  private shuffleAnswers(answers: string[]): string[] {
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

  checkAllQuestionsAnswered(): void {
    let counter = 0;
    this.quiz.results.forEach((q: Question) => {
      if (q.userAnswer) {
        counter++;
      }
    });
    if (counter === this.quiz.results.length) {
      this.showSubmit = true;
    }
  }

  goToResults(): void {
    this.sharingService.changeData(JSON.stringify(this.quiz));
    this.router.navigate(['results']);
  }
}
