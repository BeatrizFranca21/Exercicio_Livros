import { Component, OnInit, EventEmitter, Output } from '@angular/core';
import { Livro } from '../livro.model';

@Component({
selector: 'app-livros-inserir',
templateUrl: './livros-inserir.component.html',
styleUrls:['./livros-inserir.component.css'],
})
export class LivrosInserirComponent implements OnInit {

  @Output() livroAdicionado = new EventEmitter<Livro>();
  id!: string;
  titulo!:string ;
  autor!:string ;
  numpaginas!:string;


    onAdicionarLivro(){
      const livro: Livro = {
        id: this.id,
        titulo:this.titulo,
        autor:this.autor,
        numpaginas:this.numpaginas
      };
      this.livroAdicionado.emit(livro);
    }
//   livros = [{
//     id:'A1',
//     titulo:'Branca de Neve',
//     autor:'Walter',
//     numpaginas:'100',
//   },
//   {
//   id:'AC5',
//   titulo:'Cinderela',
//   autor:'John',
//   numpaginas:'150',
//   }
// ];
livros = [];
constructor(){}

ngOnInit():void{}
}
