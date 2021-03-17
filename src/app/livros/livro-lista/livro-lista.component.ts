import { Component, OnInit, Input } from '@angular/core';
import { Livro } from '../livro.model';

@Component({
  selector: 'app-livro-lista',
  templateUrl: './livro-lista.component.html',
  styleUrls: ['./livro-lista.component.css']
})
export class LivroListaComponent implements OnInit {

  @Input() livros: Livro[] = [];

  constructor() { }

  ngOnInit(): void {
  }

}
