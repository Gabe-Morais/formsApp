/* eslint-disable no-underscore-dangle */ 
import { Injectable } from '@angular/core';
import { Storage } from '@ionic/storage-angular';

@Injectable({
  providedIn: 'root'
})
export class StorageService {
  
  //variavel "_storage" é o gerenciador do banco de dados;
  private _storage: Storage | null = null;
  constructor(private storage: Storage) {
    this.init();
  }

  //init pega a variavel local "storage" e cria o banco de dados e armazena na "_storage";
  async init() {
    const storage = await this.storage.create();
    this._storage = storage;
  }

  //O metodo "set" armazena os dados atraves de uma chave e valor; 
  public async set(key: string, value: any) {
    await this._storage?.set(key, value);
  }

  //O metodo "get" retorna a informação, o "return" é indispensavel;
  public async get(key: string ){
    return await this._storage.get(key);
  }

  //O metodo "delete" exclui uma informação;
  public async delete(key:string){
    await  this._storage.remove(key);
  }
}