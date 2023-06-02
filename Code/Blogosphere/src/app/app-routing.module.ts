import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { ContentDetailsComponent } from './content-details/content-details.component';
import { ListCardsComponent } from './list-cards/list-cards.component';
import { ProfilPageComponent } from './profil-page/profil-page.component';
import { ContactComponent } from './contact/contact.component';
import { Route } from '@angular/router';
import { ActivatedRoute } from '@angular/router';


const appRoute: Routes =[
  {path: '#', redirectTo:'home', pathMatch:'full'},
  {path: '', redirectTo:'home', pathMatch:'full'},
  {path: 'trends', component:ListCardsComponent},
  {path: 'category', component:ListCardsComponent},
  {path: 'content-details/:id', component:ContentDetailsComponent},
  {path: 'home', component:ListCardsComponent},
  {path: 'profil/:id', component:ProfilPageComponent},
  {path: 'login',component:LoginComponent},
  {path: 'register', component:RegisterComponent},
  {path: 'contact', component:ContactComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(appRoute)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
