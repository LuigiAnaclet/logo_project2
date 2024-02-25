import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { ClassDetailsComponent } from './class-details/class-details.component';
import { CreateClassComponent } from './create-class/create-class.component';

const routes: Routes = [
  { path: '', redirectTo: 'console', pathMatch: 'full' },
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },
  { path: 'create-class', component: CreateClassComponent },
  { path: 'class-details/:classId', component: ClassDetailsComponent }
  // Ajoutez d'autres routes selon les besoins de votre projet
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
