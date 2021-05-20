import { Component, OnInit, OnDestroy } from '@angular/core';

import { Livro } from '../livro.model';
import { LivroService } from '../livro.service'
import { Subscription } from 'rxjs'
@Component({
  selector: 'app-livro-lista',
  templateUrl: './livro-lista.component.html',
  styleUrls: ['./livro-lista.component.css']
})
export class LivroListaComponent implements OnInit, OnDestroy {

  livros: Livro[] = []
  private livrosSubscription: Subscription;
  public estaCarregando: boolean = false;

  constructor(private livroService: LivroService) {

  }



  ngOnInit(): void {
    this.estaCarregando = true;
    this.livroService.getLivro;
    this.livrosSubscription = this.livroService.getListaDeLivrosAtualizadaObservable().subscribe(
      (livros: Livro[]) => {
        this.estaCarregando = false;
        this.livros = livros;
      }
    )
  }

  onDelete (id: string): void{
    this.livroService.removerLivro(id);
  }

  ngOnDestroy(): void{
    this.livrosSubscription.unsubscribe();
  }

}
