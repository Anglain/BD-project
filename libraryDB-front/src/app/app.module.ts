import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatMenuModule } from '@angular/material/menu';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatRadioModule } from '@angular/material/radio';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatInputModule } from '@angular/material/input';
import { MatIconModule } from '@angular/material/icon';
import { UpperBarComponent } from './upper-bar/upper-bar.component';
import { LoginViewComponent } from './login-view/login-view.component';
import { ReactiveFormsModule } from "@angular/forms";
import { BooksComponent } from './books/books.component';
import { LibrariansComponent } from './librarians/librarians.component';
import { ReadersComponent } from './readers/readers.component';
import { DepartmentsComponent } from './departments/departments.component';

@NgModule({
  declarations: [
    AppComponent,
    UpperBarComponent,
    LoginViewComponent,
    BooksComponent,
    LibrariansComponent,
    ReadersComponent,
    DepartmentsComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    NgbModule,
    MatToolbarModule,
    MatMenuModule,
    MatButtonModule,
    MatFormFieldModule,
    MatRadioModule,
    MatCheckboxModule,
    MatInputModule,
    MatIconModule,
    ReactiveFormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})

export class AppModule { }
