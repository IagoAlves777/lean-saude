import React, { useState } from 'react';

import { ExpandLess, ExpandMore } from '@mui/icons-material';
import { Collapse, Divider, List, ListItemButton } from '@mui/material';
import { GridColDef, GridRenderCellParams } from '@mui/x-data-grid';
import styles from './styles.module.css';

interface Props {
  columns: GridColDef<any, any, any>[];
  rows: any[];
  keyAccessor: string;
  getTitle: (row: any) => string;
  getSubTitle: (row: any) => string;
}

const CardList: React.FC<Props> = ({ columns, rows, keyAccessor, getSubTitle, getTitle }) => {
  const [open, setOpen] = useState('');

  if (!rows.length) {
    return (
      <div className={styles.container}>
        <div className={styles.NoData}>Sem dados</div>
      </div>
    );
  }

  return (
    <div className={styles.container}>
      {rows.slice(0, 50).map((row) => (
        <List className={styles.customList} key={row[keyAccessor]}>
          <ListItemButton
            className={styles.CustomListItemButton}
            style={{
              flexDirection: 'column',
            }}
            onClick={() => (open === row[keyAccessor] ? setOpen('') : setOpen(row[keyAccessor]))}
          >
            <div className={open === row[keyAccessor] ? styles.headerOpen : styles.header}>
              {!(open === row[keyAccessor]) && (
                <div className={row}>
                  <div className={styles.label}>{getTitle(row)}</div>
                  <span className={styles.listItem}>{getSubTitle(row)}</span>
                </div>
              )}
              {open === row[keyAccessor] ? <ExpandLess /> : <ExpandMore />}
            </div>

            <Collapse
              in={open === row[keyAccessor]}
              timeout="auto"
              unmountOnExit
              sx={{
                width: '100%',
              }}
            >
              {columns.map((column) => (
                <div className={row} key={column.field}>
                  <div className={styles.label}>{column.headerName}</div>
                  {column.renderCell ? (
                    column.renderCell({ row, value: row[column.field] } as GridRenderCellParams<any, any, any>)
                  ) : (
                    <span className={styles.listItem}>{row[column.field]}</span>
                  )}
                  <Divider
                    style={{
                      margin: '0.5rem',
                    }}
                  />
                </div>
              ))}
            </Collapse>
          </ListItemButton>
        </List>
      ))}
    </div>
  );
};

export default CardList;
