import { bootstrapApplication } from '@angular/platform-browser'; // Dar partida a aplicação no navegador //
import { appConfig } from './app/app.config'; // Trás o objeto de configuração global a aplicação //
import { AppComponent } from './app/app.component';

bootstrapApplication(AppComponent, appConfig)
  .catch((err) => console.error(err));

  //Aqui é o ponto de entrada principal //
