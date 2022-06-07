import { Box, List, Table } from '@mantine/core';
import React from 'react';
import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { Paperclip } from 'tabler-icons-react';

const ListBallots = (props) => {
  const [ballots, setBallots] = useState([]);

  const getBallots = async () => {
    setBallots(await window.contract.getAllPrompts());
    console.log(await window.contract.getAllPrompts());
  };

  useEffect(() => {
    getBallots();
  }, []);

  //console.log(await window.contract.getAllPrompts())
  return (
    <>
      <h1>Ballot(s) List</h1>
      <p>If you want more information please click.</p>
      <Box>
        <List center icon={<Paperclip />}>
          {ballots.map((val, i) => (
            <Link key={i} to={'/list/' + val}>
              <List.Item key={i}>{val}</List.Item>
            </Link>
          ))}
        </List>
      </Box>
      <Box
        sx={(theme) => ({
          backgroundColor:
            theme.colorScheme === 'dark'
              ? theme.colors.dark[6]
              : theme.colors.gray[0],
          textAlign: 'center',
          padding: '1em',
          borderRadius: theme.radius.md,
          cursor: 'pointer',
          minWidth: '10em',
          marginTop: '2em',

          '&:hover': {
            backgroundColor:
              theme.colorScheme === 'dark'
                ? theme.colors.dark[5]
                : theme.colors.gray[1],
          },
        })}
      >
        <Link to={'/'}>Back to Home</Link>
      </Box>
    </>
  );
};

export default ListBallots;
