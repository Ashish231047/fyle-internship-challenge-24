import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms'; // Import FormsModule

import { AppComponent } from './app.component';
import { GithubRepoComponent } from './github-repo/github-repo.component';

@NgModule({
  declarations: [
    AppComponent,
    GithubRepoComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    FormsModule // Add FormsModule to imports
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
