import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Categories } from '../models/category.model';
import { Quiz } from '../models/quiz.model';

@Injectable({
  providedIn: 'root',
})
export class QuizService {
  constructor(private http: HttpClient) {}

  getAllCategories(): Observable<Categories> {
    return this.http.get<Categories>('https://opentdb.com/api_category.php');
  }

  getQuiz(categoryId: number, difficulty: string): Observable<Quiz> {
    return this.http.get<Quiz>(
      `https://opentdb.com/api.php?amount=5&category=${categoryId}&difficulty=${difficulty}&type=multiple`
    );
  }
}
