import 'regenerator-runtime/runtime';
import React from 'react';

import { Logout } from 'tabler-icons-react';
import getConfig from './config';
import SignIn from './components/SignIn';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';

import Home from './components/Home';
import { AppShell, Grid, Button } from '@mantine/core';
import { logout } from './utils';
import NewBallot from './components/NewBallot/NewBallot';
import ListBallots from './components/ListBallots/ListBallots';
import Ballot from './components/Ballot/Ballot';

const { networkId } = getConfig(process.env.NODE_ENV || 'development');

export default function App() {
  if (!window.walletConnection.isSignedIn()) {
    return <SignIn />;
  }

  return (
    <AppShell
      style={{
        marginTop: '0.5em',
        position: 'fixed',
      }}
      header={
        <Grid columns={12} justify="space-between" align="center">
          <Grid.Col span={3} style={{ textAlign: 'center' }}>
            LOGO
          </Grid.Col>

          <Grid.Col span={3} style={{ textAlign: 'center' }}>
            <Button leftIcon={<Logout size={14} />} onClick={logout}>
              Log out
            </Button>
          </Grid.Col>
        </Grid>
      }
    >
      <Router>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/create" element={<NewBallot />} />
          <Route path="/list" element={<ListBallots />} />
          <Route path="/list/:ballotName" element={<Ballot />} />
        </Routes>
      </Router>
    </AppShell>
  );
}
