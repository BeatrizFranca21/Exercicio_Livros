import { LivroListaComponent } from './livros/livro-lista/livro-lista.component';
import { LivroInserirComponent } from './livros/livro-inserir/livro-inserir.component';
import { NgModule } from "@angular/core";
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {path: '', component: LivroListaComponent},
  { path: 'criar', component: LivroInserirComponent},
  { path: 'editar/:idLivro', component: LivroInserirComponent}
];


@NgModule({
  imports: [
    RouterModule.forRoot(routes)
  ],
  exports: [
    RouterModule
  ]
})
export class AppRoutingModule{


}
