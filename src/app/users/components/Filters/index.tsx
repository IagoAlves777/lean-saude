import { MenuItem, OutlinedInput } from '@mui/material';
import styles from './styles.module.css';

import React from 'react';
import Select from '../Select';
import CreateFilters from '../CreateFilters';
import { IFilters } from '@/types/filter';

interface Props {
  search: string;
  setSearch: (value: string) => void;
  orderBy: string;
  setOrderBy: (value: string) => void;
  filters: IFilters[];
  setFilters: (f: IFilters[]) => void;
}

const ORDER_BY_OPTIONS = [
  {
    label: 'Id',
    value: 'Id',
  },
  {
    label: 'Nome',
    value: 'Nome',
  },
  {
    label: 'Telefone',
    value: 'Telefone',
  },
  {
    label: 'Data de cadastro',
    value: 'Data de cadastro',
  },
  {
    label: 'Status',
    value: 'Status',
  },
];

const Filters: React.FC<Props> = ({ orderBy, setOrderBy, search, setSearch, filters, setFilters }) => {
  return (
    <div className={styles.container}>
      <h1>Usuários</h1>
      <div className={styles.filtersRow}>
        <OutlinedInput
          placeholder="Pesquisar ID ou nome ou telefone"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
        <div className={styles.filtersSelect}>
          <Select value={orderBy} onChange={setOrderBy} options={ORDER_BY_OPTIONS} title="Ordenar por" />
          <CreateFilters filters={filters} setFilters={setFilters} />
        </div>
      </div>
    </div>
  );
};

export default Filters;
