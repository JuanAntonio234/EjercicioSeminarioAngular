import { Routes } from '@angular/router';
import { UserRegisterComponent } from './user-register/user-register.component';
import{ UsuarioComponent } from './usuario/usuario.component';
import { LoginComponent } from './login/login.component';

export const routes: Routes = [
    {path: '', redirectTo: '/login', pathMatch: 'full'},
    {path: 'login', component: LoginComponent},
    {path: 'usuario', component: UsuarioComponent},  
    {path: 'register', component: UserRegisterComponent},
    {path: '**', redirectTo: '/login'}
];