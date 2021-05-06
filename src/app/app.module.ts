import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { BrowserAnimationsModule} from '@angular/platform-browser/animations';
import { AppRoutingModule } from './app-routing.module';

import { MatInputModule } from '@angular/material/input';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatExpansionModule } from '@angular/material/expansion';
import { HttpClientModule }  from '@angular/common/http';

import { AppComponent } from './app.component';
import { LivrosInserirComponent } from './livros/livros-inserir/livros-inserir.component';
import { CabecalhoComponent } from './cabecalho/cabecalho.component';
import { LivroListaComponent } from './livros/livro-lista/livro-lista.component';

@NgModule({
  declarations: [
    AppComponent, LivrosInserirComponent, CabecalhoComponent, LivroListaComponent
  ],
  imports: [
    AppRoutingModule,
    BrowserModule,
    FormsModule,
    BrowserAnimationsModule,
    MatInputModule,
    MatCardModule,
    MatButtonModule,
    MatToolbarModule,
    MatExpansionModule,
    HttpClientModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
