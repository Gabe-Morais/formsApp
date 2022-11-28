import { Component, OnInit } from '@angular/core';
import {FormBuilder, Validators} from '@angular/forms'
import { Router } from '@angular/router';
import { Usuario } from '../models/Usuario.model';
import { StorageService } from '../services/storage.service';
import { UsuarioService } from '../services/usuario.service';

@Component({
  selector: 'app-registro',
  templateUrl: './registro.page.html',
  styleUrls: ['./registro.page.scss'],
})
export class RegistroPage implements OnInit {

  usuario:Usuario = new Usuario()

  registerForm = this.formBuilder.group({
    nome: ['', Validators.required],
    email: ['', Validators.compose([Validators.required, Validators.email])],
    cpf: ['',Validators.compose([Validators.required, Validators.minLength(11), Validators.maxLength(11)])],
    senha: ['',Validators.compose([Validators.required, Validators.minLength(6)])],
    confirmeSenha: ['',Validators.compose([Validators.required, Validators.minLength(6)])],
  });

  mensagensErro = {
    nome: [{tipo: 'required', aviso: 'O campo não pode estar vazio'}],
    email: [{tipo: 'required', aviso: 'O campo não pode estar vazio'}, {tipo: 'email', aviso: 'E-mail inválido'}],
    cpf: [{tipo: 'required', aviso: 'O CPF não pode estar vazio'}, {tipo: 'minlength', aviso: 'Número de CPF inválido!'}, {tipo: 'maxlength', aviso: 'Número de CPF inválido!'}],
    senha: [{tipo: 'required', aviso: 'A senha não pode estar vazia'}, {tipo: 'minlength', aviso: 'A senha deve ter no mínimo 6 dígitos'}],
    confirmeSenha: [{tipo: 'required', aviso: 'A senha não pode estar vazia'}, {tipo: 'minlength', aviso: 'A senha deve ter no mínimo 6 dígitos'}],
  };
  pessoa = {};

  constructor(private formBuilder: FormBuilder, private bd: StorageService, private usuarioService:UsuarioService, private route:Router) { }

    get nome(){
      return this.registerForm.get('nome');
    }

    get email(){
      return this.registerForm.get('email');
    }
    q
    get cpf(){
      return this.registerForm.get('cpf');
    }

    get senha(){
      return this.registerForm.get('senha');
    }

    get confirmeSenha(){
      return this.registerForm.get('confirmeSenha');
    }

  ngOnInit() {
  }

  async salvar(){
    if(this.registerForm.valid) {
      this.usuario.nome = this.registerForm.get('nome').value
      this.usuario.email = this.registerForm.get('email').value
      this.usuario.cpf = this.registerForm.get('cpf').value
      this.usuario.senha = this.registerForm.get('senha').value

      const id = await this.usuarioService.buscarId();

      this.usuario.id = id;

      this.usuarioService.salvar(this.usuario);

      this.usuarioService.salvarId(id+1);
      alert('Sucesso!')
      this.route.navigateByUrl('/login')
    } else {
      alert('Fomulario Inválido.')
    }
  }
}
