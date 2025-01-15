import Paper from '@mui/material/Paper';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import * as React from 'react';
import { useEffect, useState } from 'react';
import './User.css';


const User = (args) => {
  const [modalUser, setModalUser] = useState(false);
  const [users, setUsers] = useState([]); // Initialize as an empty array

  const toggleUsers = () => setModalUser(!modalUser);

  function getUsers() {
    fetch('http://localhost:3001/users')
      .then(response => response.json()) // Assuming the response is JSON
      .then(data => {
        setUsers(data);
      });
  }

  useEffect(() => {
    getUsers();
  }, []);

  return (
    <>
      {/* <div>{courses.length ? JSON.stringify(courses) : 'No courses available'}</div> */}
      {/* <Button className='userButton' onClick={toggleUsers}>
        View Users
      </Button>
      <Modal size='lg' isOpen={modalUser} toggle={toggleUsers} {...args}>
        <ModalHeader toggle={toggleUsers}>Users</ModalHeader>
        <ModalBody> */}
          <TableContainer component={Paper}>
            <Table sx={{ minWidth: 650 }} aria-label="simple table">
              <TableHead>
                <TableRow>
                  <TableCell>Username</TableCell>
                  <TableCell align="right">Name</TableCell>
                  <TableCell align="right">Adjunct</TableCell>
                  <TableCell align="right">Admin</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {users.map((row) => (
                  <TableRow
                    key={row.ins_id}
                    sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                  >
                    <TableCell component="th" scope="row">
                      {row.username}
                    </TableCell>
                    <TableCell align="right">{row.ins_name}</TableCell>
                    <TableCell align='right'>{row.is_adjunct}</TableCell>
                    <TableCell align="right">{row.is_admin}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        {/* </ModalBody>
        <ModalFooter>
          <Button color="primary" onClick={toggleUsers}>
            Add User
          </Button>{' '}
          <Button color="secondary" onClick={toggleUsers}>
            Remove User
          </Button>
        </ModalFooter>
      </Modal> */}
    </>
  );
}

export default User;
