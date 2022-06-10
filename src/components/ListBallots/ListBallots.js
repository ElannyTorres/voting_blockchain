import { Box, List } from '@mantine/core';
import React from 'react';
import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { Bookmark } from 'tabler-icons-react';

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
      <Box
        style={{
          backgroundColor: 'white',
          borderRadius: '1rem',
          padding: '0.5rem',
          minWidth: '10rem',
          color: 'black',
        }}
      >
        <List
          center
          icon={<Bookmark size={20} strokeWidth={2} color={'black'} />}
        >
          {ballots.map((val, i) => (
            <Link
              key={i}
              to={'/list/' + val}
              style={{ textDecoration: 'none' }}
            >
              <List.Item key={i} style={{ padding: '0.2rem' }}>
                {val}
              </List.Item>
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
