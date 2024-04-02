"use client"
import Button from "@/components/Button";
import styles from "./page.module.css";
import { useRouter } from "next/navigation";
import axios from "axios";

export default function Login() {
  const router = useRouter();

  async function handleFormSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    await axios
      .post('http://localhost:3000/api/login', {
        email: 'matheus@email.com',
        password: '123456@Mc',
      })
      .then((res) => {
        console.log(res.data)
        localStorage.setItem('token', res.data.accessToken);
        router.push('/tasks');
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

          <form onSubmit={(e) => handleFormSubmit(e)} className={styles.formContainer}>
            <input type="text" placeholder="Usuário" className={styles.input}/>
            <input type="password" placeholder="Senha" className={styles.input}/>
            <Button size='lg' variant='primary' type='submit'>Entrar</Button>
          </form>
        </main>
      </div>
    </>
  )
}
