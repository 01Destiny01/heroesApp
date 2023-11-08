import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ErrorPageComponent } from './shared/error-page/error-page.component';
import { HttpClientModule } from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';
import { HomeComponent } from './heroes/pages/home/home.component';
import { MaterialModule } from './material/material.module';
import { ListadoComponent } from './heroes/pages/listado/listado.component';
import { HeroesRoutingModule } from './heroes/heroes-routing.module';



@NgModule({ 
  declarations: [
    AppComponent,
    ErrorPageComponent,
    HomeComponent,
    

  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    MaterialModule,
    HttpClientModule
    
    
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
