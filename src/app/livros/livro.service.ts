import {map} from 'rxjs/operators';
import { Injectable } from '@angular/core';
import { Livro } from './livro.model';
import { Subject } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Router, RouterModule } from '@angular/router';

@Injectable({providedIn:'root'})
export class LivroService{
  [x: string]: any;
private livros: Livro[] = [];
private listaLivrosAtualizada = new Subject<Livro[]>();

constructor(private httpClient: HttpClient, private router: Router){

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
        this.router.navigate(['/']);
      })
    // this.livros.push(livro);
    // this.listaLivrosAtualizada.next([...this.livros]);
  }


  atualizarLivro (id: string, autor: string, titulo: string, numpaginas: string){
    const livro: Livro = {id, titulo, autor, numpaginas};
    this.httpClient.put(`http://localhost:3000/api/livros/${id}`, livro)
    .subscribe((res => {
      const copia = [...this.livros];
      const indice = copia.findIndex (livro => livro.id === livro.id);
      copia[indice] = livro;
      this.livros = copia;
      this.listaLivrosAtualizada.next([...this.livros]);
      this.router.navigate(['/']);
    }));
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
  getLivro (idLivro: string){
    //return {...this.livros.find((livro) => livro.id === idLivro)};
    return this.httpClient.get<{_id: string, autor: string, titulo: string, numpaginas: string
      }>(`http://localhost:3000/api/livros/${idLivro}`);
       }

    }









