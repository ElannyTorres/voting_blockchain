import React from 'react';

import { login } from '../utils';

/* Styles */
import '../stylesheets/Signin.css';
import {
  MantineProvider,
  Button,
  Badge,
  ButtonStylesParams,
} from '@mantine/core';

export default function SignIn() {
  return (
    <main>
      <h1>Welcome to NEAR!</h1>
      <p>
        To make use of the NEAR blockchain, you need to sign in. The button
        below will sign you in using NEAR Wallet.
      </p>
      <p>
        By default, when your app runs in "development" mode, it connects to a
        test network ("testnet") wallet. This works just like the main network
        ("mainnet") wallet, but the NEAR Tokens on testnet aren't convertible to
        other currencies – they're just for testing!
      </p>
      <p>Go ahead and click the button below to try it out:</p>
      <MantineProvider
        styles={{
          Button: (theme, params = ButtonStylesParams) => ({
            root: { height: 42, padding: '0 30px' },

            filled: {
              color: theme.colors[params.color || theme.primaryColor][1],
            },

            outline: {
              '&:hover': {
                backgroundColor:
                  theme.colorScheme === 'dark'
                    ? theme.colors.dark[8]
                    : theme.colors.gray[0],
              },
            },
          }),
        }}
      >
        <Button onClick={login} variant="filled">
          Sign in
        </Button>
      </MantineProvider>
    </main>
  );
}
