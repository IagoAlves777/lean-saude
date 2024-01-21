import { AppBar, Toolbar, useMediaQuery } from '@mui/material';
import styles from './styles.module.css';
import HamburgerMenu from '../HamburgerMenu';
import Avatar from '../Avatar';

export default function Header() {
  const isMobile = useMediaQuery('(max-width:800px)');

  return (
    <div>
      <AppBar position="static" className={styles.appBar}>
        <Toolbar className={styles.toolbar}>
          <div className={styles.leftContainer}>
            <div className={styles.logoContainer}>
              <p>LOGO</p>
            </div>
            {!isMobile && (
              <div className={styles.optionsContainer}>
                <div className={styles.clients}>Clientes</div>
                <div className={styles.options}>Endereço</div>
                <div className={styles.options}>Entregas</div>
              </div>
            )}
          </div>
          {isMobile ? (
            <HamburgerMenu />
          ) : (
            <div className={styles.rightContainer}>
              <Avatar />
            </div>
          )}
        </Toolbar>
      </AppBar>
    </div>
  );
}
