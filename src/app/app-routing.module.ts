import { LivroListaComponent } from './livros/livro-lista/livro-lista.component';
import { LivrosInserirComponent } from './livros/livros-inserir/livros-inserir.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {path: '', component: LivroListaComponent},
  { path: 'criar', component: LivrosInserirComponent},
  {path: 'editar/:idLivro', component: LivrosInserirComponent}


];

@NgModule({
  imports: [
    RouterModule.forRoot(routes)
    ],
    exports:[RouterModule]
})
export class AppRoutingModule{
}
