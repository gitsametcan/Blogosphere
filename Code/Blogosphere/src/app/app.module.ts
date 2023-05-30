import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouterModule, Routes } from '@angular/router';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ListCardsComponent } from './list-cards/list-cards.component';
import { NgbModal, NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { TopBarComponent } from './top-bar/top-bar.component';
import { BottomBarComponent } from './bottom-bar/bottom-bar.component';
import { ContentDetailsComponent } from './content-details/content-details.component';
import { ProfilPageComponent } from './profil-page/profil-page.component';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { ReactiveFormsModule } from '@angular/forms';
import { FormsModule } from '@angular/forms';
import { NgbAlertModule } from '@ng-bootstrap/ng-bootstrap';
import { ContentListComponent } from './content-list/content-list.component';
import { UserListComponent } from './user-list/user-list.component';
import { ContactComponent } from './contact/contact.component';


@NgModule({
  declarations: [
    AppComponent,
    ListCardsComponent,
    TopBarComponent,
    BottomBarComponent,
    ContentDetailsComponent,
    ProfilPageComponent,
    LoginComponent,
    RegisterComponent,
    ContentListComponent,
    UserListComponent,
    ContactComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    NgbModule,
    FormsModule,
    ReactiveFormsModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {
  constructor(private modalService: NgbModal) {}
 }
