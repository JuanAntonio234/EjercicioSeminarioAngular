import { CommonModule } from '@angular/common';
import { UserService } from '../services/user.service';
import { User } from '../models/user.model';
import { Component, inject,EventEmitter, Input, Output } from '@angular/core';
import { ConfirmDialogComponent } from '../confirmDialog/confirm-dialog.component';
import { MatDialog } from '@angular/material/dialog';
import { NombrePipe } from '../pipes/nombre.pipe';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-colaboradores',
  imports: [CommonModule, NombrePipe, FormsModule],
  templateUrl: './colaboradores.component.html',
  styleUrl: './colaboradores.component.css',
  standalone: true
})
export class ColaboradoresComponent {
  users: User [];
  query = '';
  //Para recibir el usuario que proviene del componente usuario
  @Input() usuario: User = new User();

  constructor() {
    this.users = [];
  }

  //Para poder usar los servicios que son get de usuario/usuarios
  userService = inject(UserService);

  //Función que se usa cuando se hace click a listar usuarios
  async obtenerUsuarios() {

    //Usa getUsers() del servicio UserService para hacer la peticion get a la API de todos los usuarios
    this.userService.getUsers().subscribe({
      next: (users) => {
        //se añaden los usuarios recibidos por la peticion getUsers() a la lista de usuarios
        this.users = users;
        console.log(this.users);
        //se añade el usuario recibido del componente usuario a la lista de usuarios
        this.users.push(this.usuario);
        console.log(this.users);
      },
      error: (error) => {
        console.error('Error al obtener usuarios:', error);
      }
    });

  }

  trackByUserId(index: number, user: any): number {
    return user.id;
  }

  //Cuando se hace click en el nombre de algun usuario listado se pasa el nombre de este al componente usuario, que canviara el nombre del usuario al del listado.
  @Output() changeNameEvent = new EventEmitter<string>();
  changeName(Name: string){
    this.changeNameEvent.emit(Name);
  }

  //Para poder usar el componente de dialogo de confirmación
  dialog: MatDialog = inject(MatDialog);

  //Función que se usa para eliminar un usuario de la lista de users
  deleteUser(i: number) {
    //Antes de eliminar un usuario se muestra un dialogo de confirmación.
    const dialogRef = this.dialog.open(ConfirmDialogComponent);
    //Una vez se da al boton eliminar/cancelar en el dialogo de confimación se devuelve un booleano para proceder o no a la eliminacion de este.
    dialogRef.afterClosed().subscribe((confirmed: boolean) => {
      if (confirmed) {
        console.log("delete User ",i);
        this.users.splice(i, 1);
    }
    });
  }
}
