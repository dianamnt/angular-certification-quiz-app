import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { HttpClientModule } from '@angular/common/http';
import { AngularMaterialModule } from './angular-material/angular-material.module';
import { QuizComponent } from './components/quiz/quiz.component';
import { QuizMakerComponent } from './components/quiz-maker/quiz-maker.component';
import { ResultsComponent } from './components/results/results.component';

@NgModule({
  imports: [
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    AppRoutingModule,
    HttpClientModule,
    AngularMaterialModule,
  ],
  declarations: [
    AppComponent,
    QuizComponent,
    QuizMakerComponent,
    ResultsComponent,
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
