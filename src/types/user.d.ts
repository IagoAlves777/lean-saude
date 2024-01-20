export interface User {
  id: number;
  name: string;
  phone: string;
  registrationDate: string;
  status: 'Inativo' | 'Ativo';
}
