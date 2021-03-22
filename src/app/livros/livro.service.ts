import { Injectable } from '@angular/core';
import { Livro } from './livro.model';
import { Subject } from 'rxjs';

@Injectable({providedIn:'root'})
export class LivroService{
private livros: Livro[] = [];
private listaLivrosAtualizada = new Subject<Livro[]>();

getLivros(): Livro[]{
  return[...this.livros];
}

adicionarLivro(id: string, titulo: string, autor: string, numpaginas: string) {
  const livro: Livro = {
    id: id,
    titulo: titulo,
    autor: autor,
    numpaginas:numpaginas,
  };
  this.livros.push(livro);
  this.listaLivrosAtualizada.next([...this.livros]);
}

getListaDeLivrosAtualizadaObservable() {
  return this.listaLivrosAtualizada.asObservable();
  }

}
