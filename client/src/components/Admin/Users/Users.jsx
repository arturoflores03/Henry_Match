import { filter } from "lodash";
// owo
// import { useState } from 'react';
import { Link as RouterLink } from "react-router-dom";
// material
import {
  Card,
  Table,
  Stack,
  Avatar,
  Button,
  Checkbox,
  TableRow,
  TableBody,
  TableCell,
  Container,
  Typography,
  TableContainer,
  TablePagination,
} from "@mui/material";
import { styled } from "@mui/material/styles";
// components
import Page from "./Page";
import { useAuth0 } from "@auth0/auth0-react";

import Scrollbar from "./Scrollbar";
import Iconify from "./Iconify";
import SearchNotFound from "./SearchNotFound";
import { UserListHead, UserListToolbar, UserMoreMenu } from "./dashboard";
// mock
// import USERLIST from '../_mock/user';
// import DashboardNavbar from './layouts/DashboardNavBar';
// import DashboardSidebar from "./layouts/DashboardSidebar";

import axios from "axios";
import { React, useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getUserByNick } from "../../../Redux/actions";

const APP_BAR_MOBILE = 64;
const APP_BAR_DESKTOP = 115;

const RootStyle = styled("div")({
  display: "flex",
  minHeight: "100%",
  overflow: "hidden",
});

const MainStyle = styled("div")(({ theme }) => ({
  flexGrow: 1,
  overflow: "auto",
  minHeight: "100%",
  paddingTop: APP_BAR_MOBILE + 24,
  paddingBottom: theme.spacing(10),
  [theme.breakpoints.up("lg")]: {
    paddingTop: APP_BAR_DESKTOP,
    paddingLeft: theme.spacing(2),
    paddingRight: theme.spacing(2),
  },
}));

// ----------------------------------------------------------------------

const TABLE_HEAD = [
  { id: "name", label: "Nombre", alignRight: false },
  { id: "age", label: "Edad", alignRight: false },
  { id: "email", label: "email", alignRight: false },
  { id: "isAdmin", label: "Es administrador?", alignRight: false },
  { id: "active", label: "Activo?", alignRight: false },
  { id: "" },
];

// ----------------------------------------------------------------------

function descendingComparator(a, b, orderBy) {
  if (b[orderBy] < a[orderBy]) {
    return -1;
  }
  if (b[orderBy] > a[orderBy]) {
    return 1;
  }
  return 0;
}

function getComparator(order, orderBy) {
  return order === "desc"
    ? (a, b) => descendingComparator(a, b, orderBy)
    : (a, b) => -descendingComparator(a, b, orderBy);
}

function applySortFilter(array, comparator, query) {
  const stabilizedThis = array.map((el, index) => [el, index]);
  stabilizedThis.sort((a, b) => {
    const order = comparator(a[0], b[0]);
    if (order !== 0) return order;
    return a[1] - b[1];
  });
  if (query) {
    // if(query > 0){

    return filter(
      array,
      (_user) => _user.name?.toLowerCase().indexOf(query?.toLowerCase()) !== -1
    );
    // }
  }
  return stabilizedThis.map((el) => el[0]);
}

export default function AdminUsers2() {
  const dispatch = useDispatch();
  const [currentCustomers, setCurrentCustomers] = useState([]);
  const [update, setUpdate] = useState(false);
  // const localUserNickname = user.sub;

  let USERLIST = [];

  const getUsers = async () => {
    const customers = await axios.get(
      "https://henrymatch-pg.herokuapp.com/users",
      {
        headers: {
          Authorization: localStorage.getItem("token"),
        },
      }
    );
    setCurrentCustomers(customers);
  };

  useEffect(() => {
    getUsers();
    setUpdate(false);
  }, [update]);

  if (currentCustomers) {
    USERLIST = currentCustomers.data;
  }

  const [page, setPage] = useState(0);

  const [order, setOrder] = useState("asc");

  const [selected, setSelected] = useState([]);

  const [orderBy, setOrderBy] = useState("name");

  const [filterName, setFilterName] = useState("");

  const [rowsPerPage, setRowsPerPage] = useState(5);

  if (USERLIST) {
    const handleRequestSort = (event, property) => {
      const isAsc = orderBy === property && order === "asc";
      setOrder(isAsc ? "desc" : "asc");
      setOrderBy(property);
    };

    // const handleSelectAllClick = (event) => {
    //   if (event.target.checked) {
    //     const newSelecteds = USERLIST.map((n) => n.id);
    //     setSelected(newSelecteds);
    //     return;
    //   }
    //   setSelected([]);
    // };

    const handleClick = (event, _id, active, isAdmin) => {
      const selectedIndex = selected.indexOf(_id);
      let newSelected = [];
      if (selectedIndex === -1) {
        newSelected = newSelected.concat(selected, _id, active, isAdmin);
      } else if (selectedIndex === 0) {
        newSelected = newSelected.concat(selected.slice(1));
      } else if (selectedIndex === selected.length - 1) {
        newSelected = newSelected.concat(selected.slice(0, -1));
      } else if (selectedIndex > 0) {
        newSelected = newSelected.concat(
          selected.slice(0, selectedIndex),
          selected.slice(selectedIndex + 1)
        );
      }
      setSelected(newSelected);
    };

    const handleChangePage = (event, newPage) => {
      setPage(newPage);
    };

    const handleChangeRowsPerPage = (event) => {
      setRowsPerPage(parseInt(event.target.value, 10));
      setPage(0);
    };

    const handleFilterByName = (event) => {
      setFilterName(event.target.value);
    };

    const emptyRows =
      page > 0 ? Math.max(0, (1 + page) * rowsPerPage - USERLIST.length) : 0;

    const filteredUsers = applySortFilter(
      USERLIST,
      getComparator(order, orderBy),
      filterName
    );

    const isUserNotFound = filteredUsers.length === 0;
    // ban de usuarios

    // console.log(selected)

    function banUser() {
      // eslint-disable-next-line prefer-const
      let id = selected[0];
      // eslint-disable-next-line prefer-const
      let active = selected[1];
      if (!active) {
        const data = {
          active: true,
        };

        axios.put(`https://henrymatch-pg.herokuapp.com/usersID/${id}`, data, {
          headers: {
            Authorization: localStorage.getItem("token"),
          },
        });
      } else {
        const dataBanned = {
          active: false,
        };

        axios.put(
          `https://henrymatch-pg.herokuapp.com/usersID/${id}`,
          dataBanned,
          {
            headers: {
              Authorization: localStorage.getItem("token"),
            },
          }
        );
      }
      setUpdate(true);
      setSelected([]);
    }

    function setAdmin() {
      // eslint-disable-next-line prefer-const
      let id = selected[0];
      // eslint-disable-next-line prefer-const
      let isAdmin = selected[2];
      if (!isAdmin) {
        const data = {
          isAdmin: true,
        };

        axios.put(`https://henrymatch-pg.herokuapp.com/usersID/${id}`, data, {
          headers: {
            Authorization: localStorage.getItem("token"),
          },
        });
      } else {
        const dataAdmin = {
          isAdmin: false,
        };

        axios.put(
          `https://henrymatch-pg.herokuapp.com/usersID/${id}`,
          dataAdmin,
          {
            headers: {
              Authorization: localStorage.getItem("token"),
            },
          }
        );
      }
      setUpdate(true);
      setSelected([]);
    }

    return (
      <RootStyle>
        {/* <DashboardSidebar /> */}

        <MainStyle>
          <Page title="User">
            {USERLIST.length > 0 ? (
              <Container>
                <Stack
                  direction="row"
                  alignItems="center"
                  justifyContent="space-between"
                  mb={5}
                >
                  <Typography variant="h4" gutterBottom>
                    Gestion de usuarios
                  </Typography>
                  <Button
                    variant="contained"
                    onClick={banUser}
                    component={RouterLink}
                    to="#"
                    startIcon={
                      <Iconify icon="eva:plus-fill" sx={{ color: "white" }} />
                    }
                    color="secondary"
                  >
                    {selected[1] === false ? (
                      <Typography color="white">Perdonar</Typography>
                    ) : (
                      <Typography color="white">Banear</Typography>
                    )}
                  </Button>
                  <Button
                    variant="contained"
                    onClick={setAdmin}
                    component={RouterLink}
                    to="#"
                    startIcon={<Iconify icon="eva:plus-fill" />}
                    color="info"
                  >
                    {selected[2] === true ? "Quitar ADMIN" : "Hacer ADMIN"}
                  </Button>
                </Stack>

                <Card>
                  <UserListToolbar
                    // numSelected={selected.length}
                    filterName={filterName}
                    onFilterName={handleFilterByName}
                  />

                  <Scrollbar>
                    <TableContainer sx={{ minWidth: 800 }}>
                      <Table>
                        <UserListHead
                          order={order}
                          orderBy={orderBy}
                          headLabel={TABLE_HEAD}
                          rowCount={USERLIST.length}
                          numSelected={1}
                          onRequestSort={handleRequestSort}
                          // onSelectAllClick={handleSelectAllClick}
                        />
                        <TableBody>
                          {filteredUsers
                            .slice(
                              page * rowsPerPage,
                              page * rowsPerPage + rowsPerPage
                            )
                            .map((row) => {
                              const {
                                _id,
                                name,
                                email,
                                active,
                                age,
                                image,
                                isAdmin,
                              } = row;
                              const isItemSelected =
                                selected.indexOf(_id) !== -1;

                              return (
                                <TableRow
                                  hover
                                  key={_id}
                                  tabIndex={-1}
                                  role="checkbox"
                                  selected={isItemSelected}
                                  aria-checked={isItemSelected}
                                >
                                  <TableCell padding="checkbox">
                                    <Checkbox
                                      checked={isItemSelected}
                                      onChange={(event) =>
                                        handleClick(event, _id, active, isAdmin)
                                      }
                                    />
                                  </TableCell>
                                  <TableCell
                                    component="th"
                                    scope="row"
                                    padding="none"
                                  >
                                    <Stack
                                      direction="row"
                                      alignItems="center"
                                      spacing={2}
                                    >
                                      <Avatar alt={name} src={image} />
                                      <Typography variant="subtitle2" noWrap>
                                        {name}
                                      </Typography>
                                    </Stack>
                                  </TableCell>
                                  <TableCell align="left">{age}</TableCell>
                                  <TableCell align="left">{email}</TableCell>

                                  <TableCell align="left">
                                    {isAdmin ? "Si" : "No"}
                                  </TableCell>
                                  <TableCell align="left">
                                    {active ? "Si" : "No"}
                                  </TableCell>

                                  <TableCell align="right"></TableCell>
                                </TableRow>
                              );
                            })}
                          {emptyRows > 0 && (
                            <TableRow style={{ height: 53 * emptyRows }}>
                              <TableCell colSpan={6} />
                            </TableRow>
                          )}
                        </TableBody>

                        {isUserNotFound && (
                          <TableBody>
                            <TableRow>
                              <TableCell
                                align="center"
                                colSpan={6}
                                sx={{ py: 3 }}
                              >
                                <SearchNotFound searchQuery={filterName} />
                              </TableCell>
                            </TableRow>
                          </TableBody>
                        )}
                      </Table>
                    </TableContainer>
                  </Scrollbar>

                  <TablePagination
                    rowsPerPageOptions={[5, 10, 25]}
                    component="div"
                    count={USERLIST.length}
                    rowsPerPage={rowsPerPage}
                    page={page}
                    onPageChange={handleChangePage}
                    onRowsPerPageChange={handleChangeRowsPerPage}
                  />
                </Card>
              </Container>
            ) : (
              <p></p>
            )}
          </Page>
        </MainStyle>
      </RootStyle>
    );
  }
}
