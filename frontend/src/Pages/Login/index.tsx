import {
    Paper,
    TextInput,
    PasswordInput,
    Button,
    Title
  } from '@mantine/core';
  import styles from './styles.module.css';
  import {FC} from 'react';
  import axios from 'axios';

  const Login :FC = () => {

    const handleLogin = async() => {
      let res = await axios.get("/api/login/google");
      window.location.href = res.data.url;
    }

    return (
      <div style={{display : "flex", alignItems : "center", justifyContent : "center", height : "80vh"}}>
              <button className={styles.btn} onClick={() => {handleLogin();}}>Login with Google</button>

      </div>
    );
  }

export default Login;