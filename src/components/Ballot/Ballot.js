import { Box } from '@mantine/core';
import React, { useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';

const Ballot = (props) => {
  let { ballotName } = useParams();

  useEffect(() => {
    const init = async () => {
      let voteCount = await window.contract.getVotes({
        prompt: ballotName,
      });
      console.log(voteCount);
      if (voteCount[0] == -1) {
        console.log('no existe votación');
      } else {
        let pairCandidate = await window.contract.getCandidatePair({
          prompt: ballotName,
        });
        console.log(pairCandidate);
        let didParticipate = await window.contract.didParticipate({
          prompt: ballotName,
          user: window.accountId,
        });

        console.log(didParticipate);
      }
    };

    init();
  }, []);

  console.log(ballotName);
  return (
    <>
      <Box>
        <h1>{ballotName}</h1>
      </Box>
      <div className="btn">
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
      </div>
    </>
  );
};

export default Ballot;
