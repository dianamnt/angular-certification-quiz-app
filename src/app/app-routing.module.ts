import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { QuizMakerComponent } from './components/quiz-maker/quiz-maker.component';
import { ResultsComponent } from './components/results/results.component';

const routes: Routes = [
  { path: 'quiz-maker', component: QuizMakerComponent },
  { path: 'results', component: ResultsComponent },
  { path: '', redirectTo: 'quiz-maker', pathMatch: 'full' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
