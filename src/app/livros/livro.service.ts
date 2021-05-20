import { map } from 'rxjs/operators';
import { Injectable } from '@angular/core';
import { Livro } from './livro.model';
import { Subject } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Router, RouterModule } from '@angular/router';

@Injectable({providedIn: 'root'})
export class LivroService{
  private livros: Livro[] = [];
  private listaLivrosAtualizada = new Subject <Livro[]> ();

  constructor (
    private httpClient: HttpClient,
    private router: Router
  ){

  }

  getClientes(): void{
    this.httpClient.get<{mensagem: string, livros: any}>('http://localhost:3000/api/livros')
    .pipe(map ((dados) => {
        return dados.livros.map((livro) => {
          return {
            id: livro._id,
            titulo: livro.titulo,
            autor: livro.autor,
            numpaginas: livro.numpaginas,
            imagemURL: livro.imagemURL
          }
        })
    })).
    subscribe(
      (livros) => {
        this.livros = livros;
        this.listaLivrosAtualizada.next([...this.livros])
      }
    )
    //return [...this.livros];
  }

  adicionarLivro(titulo: string, autor: string, numpaginas: string, imagem: File){
    // const livro: Livro = {
    //   id: null,
    //   titulo: titulo,
    //   autor: autor,
    //   numpaginas: numpaginas
    // }
    const dadosLivro = new FormData();
    dadosLivro.append('titulo', titulo);
    dadosLivro.append('autor', autor);
    dadosLivro.append('numpaginas', numpaginas);
    dadosLivro.append('imagem', imagem);
    this.httpClient.post<{ mensagem: string, livro: Livro }>('http://localhost:3000/api/livros', dadosLivro).subscribe(
      (dados) => {
        console.log(dados.mensagem)
        //livro.id = dados.id;
        const livro: Livro = {
          id: dados.livro.id,
          titulo: titulo,
          autor: autor,
          numpaginas: numpaginas,
          imagemURL: dados.livro.imagemURL
        };
        this.livros.push(livro)
        this.listaLivrosAtualizada.next([...this.livros])
        this.router.navigate(['/']);
      }
    )
  }

  atualizarLivro (id: string, titulo: string, autor: string, numpaginas: string){
    const livro: Livro = {id, titulo, autor, numpaginas, imagemURL: null};
    this.httpClient.put (`http://localhost:3000/api/livros/${id}`, livro).
    subscribe((res) => {
      const copia = [...this.livros];
      const indice = copia.findIndex (li => li.id === livro.id);
      copia[indice] = livro;
      this.livros = copia;
      this.listaLivrosAtualizada.next([...this.livros]);
      this.router.navigate(['/']);
    });
  }

  removerLivro (id: string): void{
    this.httpClient.delete(`http://localhost:3000/api/livros/${id}`).subscribe(() => {
      this.livros = this.livros.filter((li) => {
        return li.id !== id
      })
      this.listaLivrosAtualizada.next([...this.livros])
    })
  }

  getListaDeLivrosAtualizadaObservable() {
    return this.listaLivrosAtualizada.asObservable();
  }

  getLivro(idLivro: string|any){
    // return {
    //   ...this.livros.find(li => li.id === idLivro)
    // };
    return this.httpClient.get<{_id: string, titulo: string, autor: string, numpaginas:string}>(`http://localhost:3000/api/livros/${idLivro}`);
  }
}
