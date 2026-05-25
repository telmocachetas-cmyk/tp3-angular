import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';

import { AppComponent } from './app.component';
import { PortfolioTableComponent } from './components/portfolio-table/portfolio-table.component';
import { PortfolioFormComponent } from './components/portfolio-form/portfolio-form.component';

@NgModule({
  declarations: [
    AppComponent,
    PortfolioTableComponent,
    PortfolioFormComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    FormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
