import { Box } from '@mantine/core';
import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';

import '../../stylesheets/Ballot.css';
import { Ballpen } from 'tabler-icons-react';
import { Table, Group, Button } from '@mantine/core';

const Ballot = (props) => {
  let { ballotName } = useParams();

  const [voteCount, setVoteCount] = useState(0);
  const [pairCandidate, setPairCandidate] = useState('');
  const [didParticipate, setDidParticipate] = useState('false');

  const init = async () => {
    let voteCountResponse = await window.contract.getVotes({
      prompt: ballotName,
    });
    console.log(voteCountResponse);
    if (voteCount[0] == -1) {
      console.log('no existe votación');
    } else {
      let pairCandidateResponse = await window.contract.getCandidatePair({
        prompt: ballotName,
      });
      console.log(pairCandidateResponse);

      let didParticipateResponse = await window.contract.didParticipate({
        prompt: ballotName,
        user: window.accountId,
      });
      console.log(didParticipateResponse);
      setPairCandidate(pairCandidateResponse);
      setDidParticipate(didParticipateResponse);
    }
    setVoteCount(voteCountResponse);
  };

  useEffect(() => {
    init();
  }, []);

  const vote = () => {
    console.log(didParticipate);
    return didParticipate ? 'You already voted' : 'Vote';
  };

  vote();

  console.log(ballotName);
  return (
    <div className="container">
      <Box>
        <h1>{ballotName}</h1>
        <Table>
          <thead>
            <th>{pairCandidate[0]}</th>
            <th>{pairCandidate[1]}</th>
          </thead>
          <tbody>
            <tr>
              <td>{voteCount[0]}</td>
              <td>{voteCount[1]}</td>
            </tr>
          </tbody>
        </Table>
        <Button
          style={{
            marginTop: '2em',
          }}
          disabled={didParticipate}
          leftIcon={<Ballpen size={18} />}
          onClick={() => {
            console.log('votando');
          }}
        >
          {vote()}
        </Button>
      </Box>
      <Group
        style={{
          marginTop: '2em',
        }}
      >
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
          <Link to={'/list'}>Back to List</Link>
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
      </Group>
    </div>
  );
};

export default Ballot;
