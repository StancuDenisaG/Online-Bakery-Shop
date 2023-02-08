import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AngularFireModule } from '@angular/fire/compat';
import { HeaderComponent } from './header/header.component';
import { HomeComponent } from './home/home.component'

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    HomeComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    AngularFireModule
    

  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
