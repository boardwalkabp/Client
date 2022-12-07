import React from "react";
import useStateContext from "../../../hooks/useStateContext";
import { createAPIEndpoint, ENDPOINTS } from "../../../api";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router";
import { Box } from "@mui/system";
import { Card, CardContent, CardHeader, Grid, TextField, Button, IconButton } from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import VisibilityIcon from "@mui/icons-material/Visibility";

export default function Clients() {
  const { context } = useStateContext();
  // console.log(context)
  const [clients, setClients] = useState([]);
  const [loading, setLoading] = useState(false);
  const [search, setSearch] = useState("");
  const [searchKeyword, setSearchKeyword] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [total, setTotal] = useState(0);
  const [error, setError] = useState(null);
  const [selected, setSelected] = useState([]);
  const [selectedRow, setSelectedRow] = useState(null);
  const [errors, setErrors] = useState({});
  const navigate = useNavigate();

  const fetchClients = async () => {
    setLoading(true);
    createAPIEndpoint(ENDPOINTS.clients)
      .fetch()
      .then((res) => {
        setClients(res.data);
        setLoading(false);
      })
      .catch((err) => console.log(err));
  };

  useEffect(() => {
    fetchClients();
  }, []);

  const columns = [
    // { field: "id", headerName: "ID", width: 90 },
    { field: "name", headerName: "Name", width: 200 },
    // { field: "username", headerName: "Username", width: 200 },
    { field: "email", headerName: "Email", width: 200 },
    // { field: "phoneNumber", headerName: "Phone Number", width: 200 },
    { field: "address", headerName: "Address", width: 200 },
    // { field: "applicationId", headerName: "Application ID", width: 200 },
    {
      field: "actions",
      headerName: "Actions",
      width: 200,
      renderCell: (params) => (
        <div>
          <IconButton onClick={() => navigate(`/builder/clients/view/${params.row.id}`)}>
            <VisibilityIcon color="primary" />
          </IconButton>
          <IconButton onClick={() => navigate(`/builder/clients/edit/${params.row.id}`)}>
            <EditIcon color="primary" />
          </IconButton>
          <IconButton onClick={() => navigate(`/builder/clients/delete/${params.row.id}`)}>
            <DeleteIcon color="primary" />
          </IconButton>
        </div>
      ),
    },
  ];

  const handleSearch = (e) => {
    setSearch(e.target.value);
  };

  const handleSearchClick = () => {
    setSearchKeyword(search);
  };

  useEffect(() => {
    if (searchKeyword !== "") {
      const results = clients.filter((client) =>
        client.name.toLowerCase().includes(searchKeyword)
      );
      setSearchResults(results);
    } else {
      setSearchResults(clients);
    }
  }, [searchKeyword, clients]);

  const handlePageChange = (e) => {
    setPage(e.target.value);
  };

  const handleRowsPerPageChange = (e) => {
    setRowsPerPage(e.target.value);
  };

  const handleSelectionChange = (params) => {
    setSelected(params.rowIds);
  };

  const handleRowClick = (params) => {
    setSelectedRow(params.row);
  };

  const handleAdd = (e) => {
    e.preventDefault();
    navigate("/builder/clients/add");
  };

  return (
    <div>
      <Box sx={{ width: "100%" }}>
        <Card>
          <CardHeader title="Clients" />
          <CardContent>
            <Grid container spacing={3}>
              <Grid item xs={12}>
                <Box sx={{ display: "flex" }}>
                  <TextField
                    fullWidth
                    variant="outlined"
                    label="Search"
                    value={search}
                    onChange={handleSearch}
                  />
                  <Button
                    variant="contained"
                    color="primary"
                    onClick={handleSearchClick}
                    sx={{ ml: 2 }}
                  >
                    Search
                  </Button>
                  <Button
                    variant="contained"
                    color="primary"
                    onClick={handleAdd}
                    sx={{ ml: 2 }}
                  >
                    Add New Client
                  </Button>
                </Box>
              </Grid>
              <Grid item xs={12}>
                <div style={{ height: 400, width: "100%" }}>
                  <DataGrid
                    rows={searchKeyword !== "" ? searchResults : clients}
                    columns={columns}
                    pageSize={rowsPerPage}
                    rowsPerPageOptions={[10, 20, 50]}
                    checkboxSelection
                    disableSelectionOnClick
                    onSelectionModelChange={handleSelectionChange}
                    onRowClick={handleRowClick}
                    onPageChange={handlePageChange}
                    onRowsPerPageChange={handleRowsPerPageChange}
                  />
                </div>
              </Grid>
            </Grid>
          </CardContent>
        </Card>
      </Box>
    </div>
  );
}
