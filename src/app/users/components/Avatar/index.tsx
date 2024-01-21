import React from 'react';
import { Avatar as AvatarMUI, Popover } from '@mui/material';
import styles from './styles.module.css';
import LogoutIcon from '@mui/icons-material/Logout';
import { useRouter } from 'next/navigation';
import Cookie from 'js-cookie';

const Avatar: React.FC = () => {
  const [anchorEl, setAnchorEl] = React.useState<HTMLButtonElement | null>(null);

  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const router = useRouter();

  const handleLogout = () => {
    Cookie.remove('token');
    router.push('/login');
  };

  const open = Boolean(anchorEl);

  return (
    <>
      <button className={styles.avatarButton} onClick={handleClick}>
        <AvatarMUI>IA</AvatarMUI>
      </button>
      <Popover
        open={open}
        anchorEl={anchorEl}
        onClose={handleClose}
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'left',
        }}
      >
        <button
          style={{
            backgroundColor: 'transparent',
            border: 'none',
            cursor: 'pointer',
          }}
          onClick={handleLogout}
        >
          <div className={styles.logoutContainer}>
            <LogoutIcon />
            <p>Sair</p>
          </div>
        </button>
      </Popover>
    </>
  );
};

export default Avatar;
