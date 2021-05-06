import { Component, Output } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Livro } from '../livro.model';
import { LivroService } from '../livro.service';

@Component({
selector: 'app-livros-inserir',
templateUrl: './livros-inserir.component.html',
styleUrls:['./livros-inserir.component.css'],
})

export class LivrosInserirComponent  {
constructor(private livroService: LivroService){

}


    onAdicionarLivro(form: NgForm){

      if(form.invalid) return;

      this.livroService.adicionarLivro(
      form.value.id,
      form.value.titulo,
      form.value.autor,
      form.value.numpaginas
      );
       form.resetForm();
      }

}
