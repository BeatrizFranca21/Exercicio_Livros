import { Component } from '@angular/core';
import { Livro } from './livros/livro.model';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  livros: Livro [] = [];
  onlivroAdicionado(livro){
    this.livros = [livro, ...this.livros];
    //console.log(livro);
  }
}
