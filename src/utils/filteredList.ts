import { omit } from 'underscore';
import unorm from 'unorm';

export function filteredList<T>(list: T[], search: string, skipKeys?: string[], splice?: number): any {
  const normalizedSearch = unorm.nfd(search).toLowerCase();

  const filterList = list.map((l) => omit(l, skipKeys || []));

  return (
    filterList
      ?.filter((l) =>
        JSON.stringify(Object.values(l as Record<string, unknown>))
          .toLowerCase()
          .normalize('NFD')
          .replace(/[\u0300-\u036f]/g, '')
          .includes(normalizedSearch)
      )
      .splice(0, splice || list.length) || []
  );
}
