import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private readonly STORAGE_KEY = 'usuarios';

  constructor() {}

  registrar(email: string, password: string): boolean {
    const usuarios = JSON.parse(localStorage.getItem(this.STORAGE_KEY) || '[]');

    const existe = usuarios.find((u: any) => u.email === email);
    if (existe) return false;

    usuarios.push({ email, password });
    localStorage.setItem(this.STORAGE_KEY, JSON.stringify(usuarios));
    return true;
  }

  login(email: string, password: string): boolean {
    const usuarios = JSON.parse(localStorage.getItem(this.STORAGE_KEY) || '[]');
    return usuarios.some((u: any) => u.email === email && u.password === password);
  }
}
