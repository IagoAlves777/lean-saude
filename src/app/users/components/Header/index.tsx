import { AppBar, Avatar, Button, IconButton, Tab, Tabs, Toolbar, Typography } from '@mui/material';
import styles from './styles.module.css';

export default function Header() {
  return (
    <div>
      <AppBar position="static" className={styles.appBar}>
        <Toolbar className={styles.toolbar}>
          <div className={styles.leftContainer}>
            <div className={styles.logoContainer}>
              <p>LOGO</p>
            </div>
            <div className={styles.optionsContainer}>
              <div className={styles.clients}>Clientes</div>
              <div className={styles.options}>Endereço</div>
              <div className={styles.options}>Entregas</div>
            </div>
          </div>
          <div className={styles.rightContainer}>
            <Avatar>IA</Avatar>
          </div>
        </Toolbar>
      </AppBar>
    </div>
  );
}
