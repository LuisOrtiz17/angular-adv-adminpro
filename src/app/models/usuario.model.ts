import { environment } from 'src/environments/environment';

const base_url = environment.base_url;

export class Usuario {
  constructor(
    public nombre: string,
    public email: string,
    public password?: string,
    public img?: string,
    public google?: string,
    public role?: 'ADMIN_ROLE' | 'USER_ROLE',
    public uid?: string
  ) {}

  get imagenUrl() {
    //  /upload/hospitales/8e12be77-42cc-44ad-b652-aq5c31efa224.jpg
    //console.log(this.img);

    if (!this.img) {
      return `${base_url}/upload/usuarios/no-image`;
    } else if (this.img?.includes('https')) {
      return this.img;
    } else if (this.img) {
      return `${base_url}/upload/usuarios/${this.img}`;
    } else {
      return `${base_url}/upload/usuarios/no-image`;
    }
  }
}
