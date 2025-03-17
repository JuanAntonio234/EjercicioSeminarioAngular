import { CommonModule } from '@angular/common';
import { Component, inject, OnInit } from '@angular/core';
import { User } from '../models/user.model';
import { ColaboradoresComponent } from "../colaboradores/colaboradores.component";
import { FormsModule } from '@angular/forms';
import { AuthService } from '../services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-usuario',
  imports: [CommonModule, ColaboradoresComponent, FormsModule],
  templateUrl: './usuario.component.html',
  styleUrl: './usuario.component.css',
  standalone: true
})
export class UsuarioComponent implements OnInit {

  foto: string;
  mostrardata: boolean;
  usuario: User;
  
  /* 
  usuario: User = {
    id: 1,
    name: "Toni",
    age: 40,
    email: "toni.oller@gmail.com",
  };
  */
  constructor(     
    private authService: AuthService,
    private router: Router
  ) {
    this.mostrardata = false;
    this.usuario={
      id: 1,
      name: "",
      age: 40,
      email: ""
    };
    this.foto = "";
    /* this.foto = "https://github.com/tonioller.png";
    this.mostrardata = false;*/
  }
  ngOnInit() {
    this.authService.currentUser$.subscribe(userData => {
      if (userData) {
        this.usuario = {
          ...this.usuario,
          id: userData.id || 0,
          name: userData.name,
          email: userData.email
        };
        this.foto = `https://github.com/${this.usuario.name}.png`;
      } else {
        this.router.navigate(['/login']);
      }
    });
  }

  mostrardatos(){
    this.mostrardata = true;
  }

  getName(Name: string){
    this.usuario.name = Name;
  }
}
