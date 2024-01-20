import { IFilters } from '@/types/filter';
import { User } from '@/types/user';
import { convertStringToDateUTC, parseDateFromString } from './dataFormat';

// queria deixar uma observação de que o filtro não está completo, mas creio que com mais algum tempo ficaria igualzinho :)

export function filterUser(users: User[], filters: IFilters[]) {
  if (!filters.length) return users;

  const filteredUsers = users.filter((user) => {
    const isValid = filters.map((filter) => {
      if (!filter.value) return true;

      if (filter.operator === 'contains') {
        return !!user[filter.column as keyof User]
          .toString()
          .toLocaleLowerCase()
          .includes(filter.value.toLocaleLowerCase());
      }

      if (filter.operator === 'equals') {
        const userValue = user[filter.column as keyof User].toString().toLocaleLowerCase();
        const filterValue = filter.value.toLocaleLowerCase();

        return userValue === filterValue;
      }

      if (filter.operator === 'is') {
        const userValue = parseDateFromString(user[filter.column as keyof User] as string);
        const filterValue = filter.value;

        return userValue?.getTime() === convertStringToDateUTC(filterValue).getTime();
      }

      if (filter.operator === 'isAfter') {
        const userValue = parseDateFromString(user[filter.column as keyof User] as string);
        const filterValue = filter.value;
        if (!userValue) return false;

        return userValue > convertStringToDateUTC(filterValue);
      }

      if (filter.operator === 'notIsAfter') {
        const userValue = parseDateFromString(user[filter.column as keyof User] as string);
        const filterValue = filter.value;

        if (!userValue) return false;

        return userValue < convertStringToDateUTC(filterValue);
      }

      return false;
    });

    return isValid.every((is) => is);
  });

  return filteredUsers;
}
