import { Injectable } from '@angular/core';
import { identity } from 'rxjs';
import { Usuario } from '../models/Usuario.model';
import { StorageService } from './storage.service';

@Injectable({
  providedIn: 'root'
})
export class UsuarioService {

  listaUsuarios: Usuario[] = [

  ];

  // Sempre declarar o servico no construtor "variavel: NomeDaClasse"
  constructor(private storageService: StorageService) { }

  async login(email: string, senha: string) {
    await this.buscarTodos();
    let usuario: Usuario;
    this.listaUsuarios.filter(item => {
      if (item.email.toLocaleLowerCase() == email.toLocaleLowerCase()) { }
      usuario = item;
    });
    if (usuario?.senha === senha) {
      return usuario;
    }
    return null;
  }


  //salvar usurio dentro da lista de usuarios.
  async salvar(usuario: Usuario) {
    await this.buscarTodos();
    this.listaUsuarios[usuario.id] = usuario;
    await this.storageService.set('usuarios', this.listaUsuarios);
  }

  async buscarUm(id:number) {
    await this.buscarTodos();
    await this.listaUsuarios[id];
   }

  // "listaUsuarios recebe a busca por "usuarios" / "as unknown as Usuario[]" caso nao tenho nd retorne vazio ou o usuario "
  async buscarTodos() {
    this.listaUsuarios = await this.storageService.get('usuarios') as null as Usuario[];
    if (!this.listaUsuarios) {
      this.listaUsuarios = [];
    }
    return this.listaUsuarios;
  }

  async deletar(id: number) { 
    await this.buscarTodos(); // atualiza a lista de usuarios
    this.listaUsuarios.slice(id, 1); //remove o usuario do array
    await this.storageService.set('usuarios', this.listaUsuarios)//salva o array
  }

  // Armazenamos o idUsuario 
  async salvarId(id: number) {
    await this.storageService.set('idUsuario', id);
  }
  //armazenamos nossa busca dentro de uma constante, e aplicamos uma condição para caso o id exista nos retorne ele.
  async buscarId() {
    const id = await this.storageService.get('idUsuario');
    if (!id) {
      return 0;
    }
    return id;
  }

}

