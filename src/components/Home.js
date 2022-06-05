import React from 'react';
import { Link } from 'react-router-dom';

import { Box, List, ThemeIcon } from '@mantine/core';
import { CircleCheck, CircleDashed } from 'tabler-icons-react';

import '../stylesheets/Home.css';

const Home = () => {
  console.log('home');
  return (
    <>
      <h1>Choose one option to continue</h1>
      <Box
        className="optionBox"
        sx={(theme) => ({
          backgroundColor:
            theme.colorScheme === 'dark'
              ? theme.colors.dark[6]
              : theme.colors.gray[0],
          textAlign: 'center',
          padding: theme.spacing.xl,
          borderRadius: theme.radius.md,
          cursor: 'pointer',
          minWidth: '20em',

          '&:hover': {
            backgroundColor:
              theme.colorScheme === 'dark'
                ? theme.colors.dark[5]
                : theme.colors.gray[1],
          },
        })}
      >
        <List
          spacing="xs"
          size="sm"
          center
          icon={
            <ThemeIcon color="teal" size={24} radius="xl">
              <CircleCheck size={16} />
            </ThemeIcon>
          }
        >
          <Link to={'/create'}>
            <List.Item>Create New Ballot</List.Item>
          </Link>
        </List>
      </Box>
      <Box
        className="optionBox"
        sx={(theme) => ({
          backgroundColor:
            theme.colorScheme === 'dark'
              ? theme.colors.dark[6]
              : theme.colors.gray[0],
          textAlign: 'center',
          padding: theme.spacing.xl,
          borderRadius: theme.radius.md,
          cursor: 'pointer',

          '&:hover': {
            backgroundColor:
              theme.colorScheme === 'dark'
                ? theme.colors.dark[5]
                : theme.colors.gray[1],
          },
        })}
      >
        <List
          spacing="xs"
          size="sm"
          center
          icon={
            <ThemeIcon color="teal" size={24} radius="xl">
              <CircleCheck size={16} />
            </ThemeIcon>
          }
        >
          <Link to={'/list'}>
            <List.Item>Ballot List</List.Item>
          </Link>
        </List>
      </Box>
    </>
  );
};

export default Home;
