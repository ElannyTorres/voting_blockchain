import { Box, Button, Group, TextInput } from '@mantine/core';
import { useForm } from '@mantine/form';
import React from 'react';

import { Link } from 'react-router-dom';

import '../../stylesheets/BallotForm.css';

const NewBallot = (props) => {
  const form = useForm({
    initialValues: {
      ballotName: '',
      candidate1: '',
      candidate2: '',
    },
    /* validate: (values) => ({
      ballotName:
        values.ballotName === undefined ? 'Ballot Name is required' : null,
    }), */
  });

  const createBallot = async (values) => {
    console.log(values.candidate1);
    await window.contract.addCandidatePair({
      prompt: values.ballotName,
      name1: values.candidate1,
      name2: values.candidate2,
    });

    await window.contract.addToPromptArray({
      prompt: values.ballotName,
    });

    await window.contract.addVote({
      prompt: values.ballotName,
      index: 0,
    });

    alert('Votación registrada con éxito');
  };

  return (
    <>
      <h2>Fill the blanks with the required information</h2>
      <Box className="ballotForm">
        <form onSubmit={form.onSubmit((values) => createBallot(values))}>
          <TextInput
            label="Nombre de la votación"
            {...form.getInputProps('ballotName')}
          />
          <TextInput
            label="Nombre del candidato 1"
            {...form.getInputProps('candidate1')}
          />
          <TextInput
            label="Nombre del candidato 2"
            {...form.getInputProps('candidate2')}
          />
          <Group position="right" mt="md">
            <Button type="submit">Crear votación</Button>
          </Group>
        </form>
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

export default NewBallot;
