import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { MaterialModule } from "./material.module";
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { DashboardComponent } from './dashboard/dashboard.component';
import { NewsStoriesComponent } from './news-stories/news-stories.component';
import { FormsModule } from '@angular/forms';
import { HackerNewsService } from 'src/providers/hacker-news.service';
import { UtilsService } from 'src/providers/utils.service';
import { HttpClientModule } from '@angular/common/http';


@NgModule({
  declarations: [
    AppComponent,
    DashboardComponent,
    NewsStoriesComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MaterialModule,
    FormsModule,
    HttpClientModule
  ],
  providers: [HackerNewsService,UtilsService],
  bootstrap: [AppComponent]
})
export class AppModule { }
