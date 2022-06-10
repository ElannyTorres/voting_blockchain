import { Box } from '@mantine/core';
import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';

import Swal from 'sweetalert2';

import { Ballpen } from 'tabler-icons-react';
import { Table, Group, Button } from '@mantine/core';

const Ballot = (props) => {
  let { ballotName } = useParams();

  const [voteCount, setVoteCount] = useState(0);  // [ 0 ,  0] si existe , sino [ -1, -1 ]
  const [pairCandidate, setPairCandidate] = useState('');
  const [didParticipate, setDidParticipate] = useState(false);

  const init = async () => {
    let voteCountResponse = await window.contract.getVotes({
      prompt: ballotName,
    });
    if (voteCount[0] == -1) {
      console.log('no existe votación');
    } else {
      let pairCandidateResponse = await window.contract.getCandidatePair({
        prompt: ballotName,
      });

      let didParticipateResponse = await window.contract.didParticipate({
        prompt: ballotName,
        user: window.accountId,
      });
      console.log(didParticipateResponse)
      setPairCandidate(pairCandidateResponse);
      setDidParticipate(didParticipateResponse);
    }
    setVoteCount(voteCountResponse);
  };

  useEffect(() => {
    init();
  }, []);

  const [created, setCreated] = useState(false)

  useEffect(() => {

    if (created) {
      setCreated(false)
      // cerrar el alert y abrir nuevo alert
      Swal.close()
    }
  }, [created])

  const vote = () => {
    return didParticipate ? 'You already voted' : 'Vote';
  };

  const loading = async (index) => {
    Swal.fire({
      title: 'Creating. It can take a moment.',
      didOpen: async () => {
        Swal.showLoading();
        const success = await recordVote(index);
        setCreated(success)
      },

    });
  };

  const recordVote = async (index) => {
    await window.contract.addVote({prompt: ballotName, index: index})
    await window.contract.recordUser({prompt: ballotName, user: window.accountId})
    return true
  }

  const voting = () => {
    const swalWithMaintainceButtons = Swal.mixin({
      customClass: {
        cancelButton: 'btn btn-danger',
        confirmButton: 'btn btn-success',
      },
      buttonsStyling: true,
    });

    swalWithMaintainceButtons
      .fire({
        title: 'Choose a candidate',
        text: "You won't be able to revert this!",
        icon: 'warning',
        reverseButtons: false,
        showCancelButton: true,
        showDenyButton: true,
        confirmButtonText: `${pairCandidate[0]}`,
        denyButtonText: `${pairCandidate[1]}`,
        cancelButtonText: 'Cancel',
      })
      .then(async (result) => {
        if (result.isConfirmed) {
          await loading(0)
          
          console.log('se voto por ' + pairCandidate[0]);
          let tmp = voteCount
          tmp[0]= tmp[0]+1
          setVoteCount(tmp);
          console.log(tmp);
        } else if (result.dismiss === Swal.DismissReason.deny) {
          await loading(1)
          
          console.log('se voto por ' + pairCandidate[1]);
          let tmp = voteCount
          tmp[1]= tmp[1]+1
          setVoteCount(tmp);
          console.log(tmp);
        }
        setDidParticipate(true)
      });
  };

  return (
    <div className="container" style={{ textAlign: 'center' }}>
      <Box>
        <h1>{ballotName}</h1>
        <Table
          style={{
            textAlign: 'center',
          }}
        >
          <thead>
            <tr>
              <th style={{ textAlign: 'center' }}>{pairCandidate[0]}</th>
              <th style={{ textAlign: 'center' }}>{pairCandidate[1]}</th>
            </tr>
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
            voting();
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
