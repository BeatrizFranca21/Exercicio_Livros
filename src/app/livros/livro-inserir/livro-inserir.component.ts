import { mimeTypeValidator } from './mime-type.validator';
import { Component, EventEmitter, Output, OnInit } from '@angular/core';
import { FormControl, FormGroup, NgForm, Validators } from '@angular/forms';
import { ActivatedRoute, ParamMap } from '@angular/router';

import { Livro } from '../livro.model';
import { LivroService } from '../livro.service';

@Component({
  selector: 'app-livro-inserir',
  templateUrl: "./livro-inserir.component.html",
  styleUrls: ["./livro-inserir.component.css"]
})
export class LivroInserirComponent implements OnInit {

  private modo: string = "criar";
  private idLivro: string;
  public livro: Livro;
  public estaCarregando: boolean = false;
  form: FormGroup;
  previewImagem: string;

  constructor (
    private livroService: LivroService,
    public route: ActivatedRoute
  ){

  }

  ngOnInit(): void{
    this.form = new FormGroup({
      titulo: new FormControl (null, {
        validators: [Validators.required, Validators.minLength(3)]
      }),
      autor: new FormControl(null, {
        validators: [Validators.required]
      }),
      numpaginas: new FormControl(null, {
        validators: [Validators.required]
      }),
      imagem: new FormControl (null, {
        validators: [Validators.required],
        asyncValidators: [mimeTypeValidator]
      })
    });
    this.route.paramMap.subscribe((paramMap: ParamMap) => {
      if (paramMap.has("idLivro")){
        this.modo = "editar";
        this.idLivro = paramMap.get("idLivro");
        this.estaCarregando = true;
       this.livroService.getLivro(this.idLivro).subscribe(dadosli => {
         this.estaCarregando = false;
          this.livro = {
            id: dadosli._id,
            titulo: dadosli.titulo,
            autor: dadosli.autor,
            numpaginas: dadosli.numpaginas,
            imagemURL: null
          }
          this.form.setValue({
            titulo: this.livro.titulo,
            autor: this.livro.autor,
            numpaginas: this.livro.numpaginas
          })
        });
      }
      else{
        this.modo = "criar";
        this.idLivro = null;
      }
    })

  }

  onSalvarLivro(){
    //console.log(form);
    if(this.form.invalid) return;
    this.estaCarregando = true;
    if (this.modo === "criar"){
      this.livroService.adicionarLivro(
        this.form.value.titulo,
        this.form.value.autor,
        this.form.value.numpaginas,
        this.form.value.imagem
      );
    }
    else{
      this.livroService.atualizarLivro(
        this.idLivro,
        this.form.value.titulo,
        this.form.value.autor,
        this.form.value.numpaginas
      )
    }
    this.form.reset();
  }
  onImagemSelecionada (event: Event){
    const arquivo = (event.target as HTMLInputElement).files[0];
    this.form.patchValue({'imagem': arquivo});
    this.form.get('imagem').updateValueAndValidity();
    const reader = new FileReader();
    reader.onload = () => {
      this.previewImagem = reader.result as string;
    }
    reader.readAsDataURL(arquivo);
  }
}
