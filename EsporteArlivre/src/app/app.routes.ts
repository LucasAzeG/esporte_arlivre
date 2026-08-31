import { Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { AtletaComponent } from './component/atleta/atleta.component';
import { CadastroCorridasComponent } from './component/cadastro-corridas/cadastro-corridas.component';
import { AtletaListaComponent } from './component/atleta/atleta-lista/atleta-lista.component';
import { ListaCorridasComponent } from './component/cadastro-corridas/lista-corridas/lista-corridas.component';
import { InscricoesComponent } from './component/inscricoes/inscricoes.component';

export const routes: Routes = [

    {
        path: "",
        redirectTo:"/home",
        pathMatch:"full"

    },
    {
        path:"home",
        component: HomeComponent
    },
    {
        path:"cadastroAtleta",
        component: AtletaComponent
    },
    {
        path:"cadastroAtleta/:id",
        component: AtletaComponent
    },
    {
        path:"cadastro-corridas",
        component: CadastroCorridasComponent
    },
    {
        path:"cadastro-corridas/:id",
        component: CadastroCorridasComponent
    },
    {
        path:"listaAtletas",
        component: AtletaListaComponent
    },
    {
        path:"listaCorridas",
        component: ListaCorridasComponent
    },
    {
    path: "inscricoes",
    component: InscricoesComponent
    }
];
