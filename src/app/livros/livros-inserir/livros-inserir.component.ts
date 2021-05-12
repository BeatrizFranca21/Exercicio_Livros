import { Component, EventEmitter, Output, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ActivatedRoute, ParamMap } from '@angular/router';
import { Livro } from '../livro.model';
import { LivroService } from '../livro.service';

@Component({
selector: 'app-livros-inserir',
templateUrl: './livros-inserir.component.html',
styleUrls:['./livros-inserir.component.css'],
})


export class LivrosInserirComponent implements OnInit {

  private modo: string = "criar";
  private idLivro: any;
  public livro: Livro|any;
  public estaCarregando: boolean = false;

  constructor (
    private livroService: LivroService,
    public route: ActivatedRoute
  ){}

  ngOnInit():void{
    this.route.paramMap.subscribe((paramMap: ParamMap) => {
      if (paramMap.has("idLivro")){
        this.modo="editar";
        this.idLivro = paramMap.get("idLivro");
        this.estaCarregando = false;
        this.livroService.getLivro(this.idLivro).subscribe( dadoslivro => {
          this.livro = {
          id: dadoslivro._id,
          titulo: dadoslivro.titulo,
          autor: dadoslivro.autor,
          numpaginas: dadoslivro.numpaginas
          };
          });
        // this.modo = "editar";
        // this.idLivro = paramMap.get("idLivro");
        // this.livro = this.livroService.getLivro(this.idLivro);
 }
      else{
        this.modo = "criar";
        this.idLivro = null;
 }

      });
  }

    onSalvarLivro(form: NgForm){
      if(form.invalid) return;
      this.estaCarregando = true;
      if(this.modo === "criar"){
        this.livroService.adicionarLivro(
        form.value.id,
        form.value.titulo,
        form.value.autor,
        form.value.numpaginas
        );

      }
      else{
        this.livroService.atualizarLivro(
          this.idLivro,
          form.value.titulo,
          form.value.autor,
          form.value.numpaginas
        );
      }
       form.resetForm();
      }

}
