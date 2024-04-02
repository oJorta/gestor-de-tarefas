'use client';
import Button from '@/components/Button';
import styles from './page.module.css';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import axios from 'axios';

export default function Login() {
  const router = useRouter();
  const [credentials, setCredentials] = useState({
    email: '',
    password: '',
  });

  async function handleFormSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    await axios
      .post('http://localhost:3000/api/login', credentials)
      .then((response) => {
        localStorage.setItem('token', response.data.accessToken);
        router.push('/tasks');
      })
      .catch((error) => {
        console.log(error);
      });
  }

  return (
    <>
      <div className={styles.container}>
        <main className={styles.loginContainer}>
          <header className={styles.loginHeader}>
            <h1>📋 Gestor de Tarefas</h1>
            <p>Insira suas informações de login:</p>
          </header>

          <form
            onSubmit={(e) => handleFormSubmit(e)}
            className={styles.formContainer}
          >
            <input
              type="text"
              placeholder="Usuário"
              className={styles.input}
              onChange={(e) =>
                setCredentials({
                  ...credentials,
                  email: e.target.value,
                })
              }
            />
            <input
              type="password"
              placeholder="Senha"
              className={styles.input}
              onChange={(e) =>
                setCredentials({
                  ...credentials,
                  password: e.target.value,
                })
              }
            />
            <Button size="lg" variant="primary" type="submit">
              Entrar
            </Button>
          </form>
        </main>
      </div>
    </>
  );
}
