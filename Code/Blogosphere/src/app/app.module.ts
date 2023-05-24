import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ListCardsComponent } from './list-cards/list-cards.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { TopBarComponent } from './top-bar/top-bar.component';
import { BottomBarComponent } from './bottom-bar/bottom-bar.component';
import { ContentDetailsComponent } from './content-details/content-details.component';
import { ProfilPageComponent } from './profil-page/profil-page.component';

@NgModule({
  declarations: [
    AppComponent,
    ListCardsComponent,
    TopBarComponent,
    BottomBarComponent,
    ContentDetailsComponent,
    ProfilPageComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    NgbModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
