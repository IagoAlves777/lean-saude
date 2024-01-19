'use client';

import {
  Button,
  FormControl,
  IconButton,
  Input,
  InputAdornment,
  InputLabel,
  OutlinedInput,
  TextField,
} from '@mui/material';
import styles from './styles.module.css';
import { FormEvent, useState } from 'react';
import { VisibilityOff, Visibility } from '@mui/icons-material';
import { useRouter } from 'next/navigation';
import { LoadingButton } from '@mui/lab';

export default function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [passwordError, setPasswordError] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [emailError, setEmailError] = useState(false);
  const [loading, setLoading] = useState(false);

  const router = useRouter();

  const onSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    let error = false;

    if (email !== process.env.EMAIL) {
      setEmailError(true);

      error = true;
    }

    if (password !== process.env.PASSWORD) {
      setPasswordError(true);

      error = true;
    }

    if (error) return;
    setLoading(true);

    setTimeout(() => {
      setLoading(false);
      router.push('/users');
    }, 2000);
  };

  return (
    <div className={styles.container}>
      <div className={styles.left}>
        <div className={styles.logoContainer}>
          <p className={styles.logo}>LOGO</p>
        </div>
        <div className={styles.welcomeContainer}>
          <h1>Bem-vindo(a)</h1>
          <p>Acesse sua conta para iniciar a sessão</p>
        </div>
        <form className={styles.formContainer} onSubmit={(e) => onSubmit(e)}>
          <div className={styles.inputsContainer}>
            <TextField
              label="Email"
              type="email"
              error={emailError}
              helperText={emailError ? 'Email não encontrado. Confira e tente novamente' : ''}
              value={email}
              onChange={(e) => {
                setEmailError(false);
                setEmail(e.target.value);
              }}
            />
            <FormControl variant="outlined" error={passwordError}>
              <TextField
                type={showPassword ? 'text' : 'password'}
                error={passwordError}
                helperText={passwordError ? 'Senha incorreta. Por favor, verifique e tente novamente.' : ''}
                InputProps={{
                  endAdornment: (
                    <InputAdornment position="end">
                      <IconButton onClick={() => setShowPassword(!showPassword)} edge="end">
                        {showPassword ? <VisibilityOff /> : <Visibility />}
                      </IconButton>
                    </InputAdornment>
                  ),
                }}
                label="Password"
                value={password}
                onChange={(e) => {
                  setPasswordError(false);
                  setPassword(e.target.value);
                }}
              />
            </FormControl>
          </div>
          <p className={styles.forgetPassword}>Esqueceu sua senha</p>
          <div className={styles.buttonContainer}>
            <LoadingButton type="submit" loading={loading}>
              Acessar plataforma
            </LoadingButton>
          </div>
        </form>
      </div>
      <div className={styles.right} />
    </div>
  );
}
