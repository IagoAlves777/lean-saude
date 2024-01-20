import React from 'react';
import styles from './styles.module.css';
import { KeyboardArrowDown } from '@mui/icons-material';
import {
  Popover,
  Badge,
  Button,
  IconButton,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  TextField,
} from '@mui/material';
import { IFilters } from '@/types/filter';
import AddIcon from '@mui/icons-material/Add';
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import CloseIcon from '@mui/icons-material/Close';

interface Props {
  filters: IFilters[];
  setFilters: (f: IFilters[]) => void;
}

const CreateFilters: React.FC<Props> = ({ filters, setFilters }) => {
  const [anchorEl, setAnchorEl] = React.useState<HTMLButtonElement | null>(null);

  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const open = Boolean(anchorEl);

  const handleChange = (v: string) => {
    handleClose();
  };

  const deleteAll = () => {
    setFilters([]);
  };

  const createFilter = () => {
    const newFilter: IFilters = {
      id: Date.now(),
      column: 'name',
      logicalOperator: 'AND',
      operator: 'contains',
      value: '',
    };

    setFilters([...filters, newFilter]);
  };

  const removeFilter = (id: number) => {
    const newFilter = filters.filter((f) => f.id !== id);

    setFilters(newFilter);
  };

  const onChangeFilter = (id: number, key: string, value: any) => {
    const selectedFilter = filters.find((f) => f.id === id);

    const newFilter = { ...selectedFilter, [key]: value };

    const removeFilter = filters.filter((f) => f.id !== id);

    const newFilters = [...removeFilter, newFilter];

    setFilters(newFilters as any);
  };

  return (
    <>
      <Badge badgeContent={filters.length} color="primary">
        <button className={styles.container} onClick={handleClick}>
          <p>Filtros</p>
          <KeyboardArrowDown />
        </button>
      </Badge>
      <Popover
        open={open}
        anchorEl={anchorEl}
        onClose={handleClose}
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'left',
        }}
      >
        <div className={styles.optionsContainer}>
          <div className={styles.filterList}>
            {filters?.map((f, index) => (
              <div className={styles.newFilter} key={f.id}>
                <IconButton className={styles.delete} onClick={() => removeFilter(f.id)}>
                  <CloseIcon />
                </IconButton>
                {index > 0 ? (
                  <FormControl fullWidth>
                    <Select defaultValue="AND" disabled>
                      <MenuItem value="AND">AND</MenuItem>
                      <MenuItem value="OR">OR</MenuItem>
                    </Select>
                  </FormControl>
                ) : (
                  <div
                    style={{
                      width: '100%',
                    }}
                  />
                )}
                <FormControl fullWidth>
                  <InputLabel>Colunas</InputLabel>
                  <Select value={f.column} onChange={(e) => onChangeFilter(f.id, 'column', e.target.value)}>
                    <MenuItem value="id">Id</MenuItem>
                    <MenuItem value="name">Nome</MenuItem>
                    <MenuItem value="phone">Telefone</MenuItem>
                    <MenuItem value="registrationDate">Data de cadastro</MenuItem>
                    <MenuItem value="status">Status</MenuItem>
                  </Select>
                </FormControl>
                <FormControl fullWidth>
                  <InputLabel>Operador</InputLabel>
                  {f.column === 'registrationDate' ? (
                    <Select value={f.operator} onChange={(e) => onChangeFilter(f.id, 'operator', e.target.value)}>
                      <MenuItem value="is">É</MenuItem>
                      <MenuItem value="isAfter">Depois de</MenuItem>
                      <MenuItem value="notIsAfter">Antes de</MenuItem>
                    </Select>
                  ) : (
                    <Select value={f.operator} onChange={(e) => onChangeFilter(f.id, 'operator', e.target.value)}>
                      <MenuItem value="contains">Contem</MenuItem>
                      <MenuItem value="equals">Igual</MenuItem>
                    </Select>
                  )}
                </FormControl>
                <FormControl fullWidth>
                  <TextField
                    label={f.column === 'registrationDate' ? '' : 'Valor'}
                    variant="outlined"
                    type={f.column === 'registrationDate' ? 'date' : 'text'}
                    value={f.value}
                    onChange={(e) => onChangeFilter(f.id, 'value', e.target.value)}
                  />
                </FormControl>
              </div>
            ))}
          </div>
          <div className={styles.footer}>
            <Button className={styles.add} onClick={createFilter}>
              <AddIcon
                style={{
                  fontSize: '1rem',
                }}
              />
              Adicionar filtro
            </Button>
            <Button className={styles.add} disabled={!filters.length} onClick={deleteAll}>
              <DeleteForeverIcon
                style={{
                  fontSize: '1rem',
                }}
              />
              Remover todos
            </Button>
          </div>
        </div>
      </Popover>
    </>
  );
};

export default CreateFilters;
