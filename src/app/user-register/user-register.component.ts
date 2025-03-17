import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormGroup, FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { AuthService } from '../services/auth.service';
import { inject } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-user-register',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './user-register.component.html',
  styleUrl: './user-register.component.css'
})
export class UserRegisterComponent {

  registerForm: FormGroup;  
  authService = inject(AuthService);
  router = inject(Router);
  @Output() exportLoggedIn = new EventEmitter<boolean>();

 constructor(private fb:FormBuilder){
  this.registerForm=this.fb.group({
    name:['',Validators.required],
    email: ['', [Validators.required, Validators.email]],
    password: ['', [Validators.required, Validators.minLength(8)]],
  });
}

hasError(controlName: string, errorType: string): boolean {
  const control = this.registerForm.get(controlName);
  if(!control)return false;
  return control.hasError(errorType) && control?.touched;
}

register(){
  console.log('Método register llamado');

  if(this.registerForm.invalid){
    this.registerForm.markAllAsTouched();
    console.log("Formulario inválido",this.registerForm.errors);
    return;
  }

  const registerData = this.registerForm.value;
  console.log("Formulario válido", this.registerForm.value);

  this.authService.register(registerData).subscribe({
    next: (response) => {
      console.log('Respuesta del servidor:', response);
      this.exportLoggedIn.emit(true);
      this.router.navigate(['/usuario']);
},
error: (error) => {
  console.error('Error en el registro:', error);
  alert('Error en el registro, verifica tus credenciales'+error.message);
}
});
}
}