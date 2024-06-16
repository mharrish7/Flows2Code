import {
    Paper,
    TextInput,
    PasswordInput,
    Button,
    Title
  } from '@mantine/core';
  import classes from './styles.module.css';
  import {FC} from 'react';

  const Login :FC = () => {
    return (
      <div className={classes.wrapper}>
        <Paper className={classes.form} radius={0} p={30}>
          <Title order={2} className={classes.title} ta="center" mt="md" mb={50}>
            LOGIN
          </Title>
  
          <TextInput label="Username" placeholder="Your Username" size="md" />
          <PasswordInput label="Password" placeholder="Your password" mt="md" size="md" />
          <Button fullWidth mt="xl" size="md">
            Login
          </Button>
  
          
        </Paper>
      </div>
    );
  }

export default Login;