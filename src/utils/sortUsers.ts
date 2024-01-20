import { Dictionary } from '@/types/dictionary';
import { User } from '@/types/user';

export function sortUsers(a: User, b: User, orderBy: string) {
  const dictionary = {
    Id: 'id',
    Nome: 'name',
    Telefone: 'phone',
    Status: 'status',
  };

  if (orderBy === 'Data de cadastro') {
    return new Date(a.registrationDate) > new Date(b.registrationDate) ? 1 : -1;
  }

  if (orderBy) {
    const newA = a[dictionary[orderBy as keyof Dictionary] as keyof User];
    const newB = b[dictionary[orderBy as keyof Dictionary] as keyof User];

    if (newA < newB) {
      return -1;
    }
    if (newA > newB) {
      return 1;
    }
    return 0;
  }

  return 0;
}
