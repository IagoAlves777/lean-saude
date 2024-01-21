'use client';

import useFetch from '@/hooks/useFetch';
import Header from './components/Header';
import Filters from './components/Filters';
import { DataGrid, GridColDef } from '@mui/x-data-grid';
import styles from './styles.module.css';
import { Chip, useMediaQuery } from '@mui/material';
import { useMemo, useState } from 'react';
import { filteredList } from '@/utils/filteredList';
import { User } from '@/types/user';
import { sortUsers } from '@/utils/sortUsers';
import { IFilters } from '@/types/filter';
import { dataMask } from '@/utils/dataFormat';
import { filterUser } from '@/utils/filterUser';
import CardList from './components/CardList';

export default function Users() {
  const { data: users } = useFetch<User[]>('users', { suspense: true });
  const isMobile = useMediaQuery('(max-width:800px)');

  const [search, setSearch] = useState('');
  const [orderBy, setOrderBy] = useState('');
  const [filters, setFilter] = useState<IFilters[]>([]);

  const filteredUser = useMemo(
    () =>
      filterUser(
        filteredList(users || [], search).sort((a: User, b: User) => sortUsers(a, b, orderBy)),
        filters
      ),
    [search, users, orderBy, filters]
  );

  const columns: GridColDef[] = useMemo(
    () => [
      {
        field: 'id',
        headerName: 'ID',
        flex: 1,
        sortable: false,
      },
      {
        field: 'name',
        headerName: 'Nome',
        flex: 1,
        sortable: false,
      },
      {
        field: 'phone',
        headerName: 'Telefone',
        flex: 1,
        sortable: false,
      },
      {
        field: 'registrationDate',
        headerName: 'Data de cadastro',
        flex: 1,
        sortable: false,
        renderCell: ({ value }) => dataMask(value),
      },
      {
        field: 'status',
        headerName: 'Status',
        flex: 1,
        sortable: false,
        renderCell: ({ value }) => (
          <Chip
            className={value === 'Inativo' ? styles.inative : styles.active}
            label={value}
            style={{
              width: '5rem',
              fontWeight: 'bold',
            }}
          />
        ),
      },
    ],
    []
  );

  return (
    <div>
      <Header />
      <div className={styles.container}>
        <Filters
          orderBy={orderBy}
          setOrderBy={setOrderBy}
          search={search}
          setSearch={setSearch}
          filters={filters}
          setFilters={setFilter}
        />
        <div className={styles.tableContainer}>
          {isMobile ? (
            <CardList
              columns={columns}
              rows={filteredUser || []}
              keyAccessor="id"
              getTitle={(row: User) => row.name}
              getSubTitle={(row: User) => `${row.name}`}
            />
          ) : (
            <DataGrid
              rows={filteredUser || []}
              columns={columns}
              initialState={{
                pagination: {
                  paginationModel: { page: 0, pageSize: 10 },
                },
              }}
              pageSizeOptions={[5, 10]}
            />
          )}
        </div>
      </div>
    </div>
  );
}
