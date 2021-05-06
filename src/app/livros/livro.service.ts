import {map} from 'rxjs/operators';
import { Injectable } from '@angular/core';
import { Livro } from './livro.model';
import { Subject } from 'rxjs';
import { HttpClient } from '@angular/common/http';

@Injectable({providedIn:'root'})
export class LivroService{
  [x: string]: any;
private livros: Livro[] = [];
private listaLivrosAtualizada = new Subject<Livro[]>();

constructor(private httpClient: HttpClient){

}


getLivros(): void{
  this.httpClient.get<{mensagem: string, livros: any}>('http://localhost:3000/api/livros').pipe(map((dados)=>{
    return dados.livros.map((livro: any)=>{
      return {
        id: livro._id,
        titulo: livro.titulo,
        autor: livro.autor,
        numpaginas:livro.numpaginas
      }
    })
  })).
  subscribe(
    (livros) => {
    this.livros = livros;
    this.listaLivrosAtualizada.next([...this.livros])
  })
  //return[...this.livros];
  }
  adicionarLivro(id: string, titulo: string, autor: string, numpaginas: string) {
    const livro: Livro = {
      id: id,
      titulo: titulo,
      autor: autor,
      numpaginas:numpaginas,
    };
    this.httpClient.post<{mensagem:string, id:string}>('http://localhost:3000/api/livros',livro).
    subscribe(
      (dados) => {
        console.log(dados.mensagem)
        livro.id = dados.id;
        this.livros.push(livro);
        this.listaLivrosAtualizada.next([...this.livros])
      })
    // this.livros.push(livro);
    // this.listaLivrosAtualizada.next([...this.livros]);
  }
  removerLivro (id: string): void{
    this.httpClient.delete(`http://localhost:3000/api/livros/${id}`).subscribe(() => {
    this.livros = this.livros.filter((livro)=>{
      return livro.id !== id
    });
    this.listaLivrosAtualizada.next([...this.livros]);
    });
    }

  getListaDeLivrosAtualizadaObservable() {
    return this.listaLivrosAtualizada.asObservable();
  }

}







