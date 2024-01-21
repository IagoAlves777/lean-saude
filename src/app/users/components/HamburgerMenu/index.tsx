'use client';

import React, { useState } from 'react';
import styles from './styles.module.css';
import { AppBar, Dialog, IconButton, Slide, Toolbar } from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import CloseIcon from '@mui/icons-material/Close';
import { TransitionProps } from '@mui/material/transitions';
import Cookie from 'js-cookie';
import { useRouter } from 'next/navigation';

const Transition = React.forwardRef(function Transition(
  props: TransitionProps & {
    children: React.ReactElement;
  },
  ref: React.Ref<unknown>
) {
  return <Slide direction="up" ref={ref} {...props} />;
});

const HamburgerMenu: React.FC = () => {
  const [open, setOpen] = useState(false);

  const router = useRouter();

  const handleLogout = () => {
    Cookie.remove('token');
    router.push('/login');
  };

  return (
    <>
      <div className={styles.menuIconContainer}>
        <IconButton size="large" edge="start" aria-label="menu" sx={{ mr: 2 }} onClick={() => setOpen(true)}>
          <MenuIcon />
        </IconButton>
      </div>
      <Dialog fullScreen open={open} onClose={() => setOpen(false)} TransitionComponent={Transition}>
        <AppBar position="static" className={styles.appBar}>
          <Toolbar className={styles.toolbar}>
            <IconButton edge="start" onClick={() => setOpen(false)} aria-label="close">
              <CloseIcon />
            </IconButton>
          </Toolbar>
        </AppBar>
        <div className={styles.optionsContainer}>
          <div className={styles.clients}>Clientes</div>
          <div className={styles.options}>Endereço</div>
          <div className={styles.options}>Entregas</div>
          <button className={styles.logout} onClick={handleLogout}>
            Sair
          </button>
        </div>
      </Dialog>
    </>
  );
};

export default HamburgerMenu;
