import React from "react";
import { createAPIEndpoint, ENDPOINTS } from "../../../api";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router";
import {
  Card,
  CardContent,
  CardHeader,
  Grid,
  TextField,
  Button,
  IconButton,
  Box,
  LinearProgress,
} from "@mui/material";
import useMediaQuery from "@mui/material/useMediaQuery";
import { DataGrid } from "@mui/x-data-grid";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import VisibilityIcon from "@mui/icons-material/Visibility";

export default function Clients() {
  const [clients, setClients] = useState([]);
  const [loading, setLoading] = useState(false);
  const [search, setSearch] = useState("");
  const [searchKeyword, setSearchKeyword] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const [page, setPage] = useState(0);
  const [pageSize, setPageSize] = useState(10);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [selected, setSelected] = useState([]);
  const [selectedRow, setSelectedRow] = useState(null);
  const navigate = useNavigate();
  const matches = useMediaQuery("(max-width:600px)");

  const fetchClients = async () => {
    setLoading(true);
    createAPIEndpoint(ENDPOINTS.clients)
      .fetch()
      .then((res) => {
        setClients(res.data);
      })
      .catch((err) => console.log(err));
  };

  useEffect(() => {
    fetchClients();
  }, []);

  useEffect(() => {
    const results = clients.filter((client) =>
      client.name.toLowerCase().includes(search.toLowerCase())
    );
    setSearchResults(results);
  }, [search, clients]);

  const columns = [
    {
      field: "name",
      headerName: "Name",
      width: 200,
      editable: true,
      sortable: true,
      searchable: true,
    },
    {
      field: "email",
      headerName: "Email",
      width: 200,
      editable: true,
      sortable: true,
      searchable: true,
      hide: matches,
    },
    {
      field: "address",
      headerName: "Address",
      width: 200,
      editable: true,
      sortable: true,
      searchable: true,
      hide: matches,
    },
    {
      field: "actions",
      headerName: "Actions",
      width: 200,
      sortable: false,
      searchable: false,
      editable: false,
      renderCell: (params) => (
        <div>
          <IconButton
            onClick={() => navigate(`/builder/clients/view/${params.row.id}`)}
          >
            <VisibilityIcon color="primary" />
          </IconButton>
          <IconButton
            onClick={() => navigate(`/builder/clients/edit/${params.row.id}`)}
          >
            <EditIcon color="primary" />
          </IconButton>
          <IconButton
            onClick={() => navigate(`/builder/clients/delete/${params.row.id}`)}
          >
            <DeleteIcon color="primary" />
          </IconButton>
        </div>
      ),
    },
  ];

  const handleSearch = (e) => {
    setSearch(e.target.value);
    setSearchKeyword(e.target.value);
  };

  const handlePageChange = (params) => {
    setPage(params.page);
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

  if (loading) {
    setTimeout(() => {
      setLoading(false);
    }, 1000);
  }

  return (
    <Box sx={{ width: "100%" }}>
      <Card
        sx={{
          opacity: loading ? 0.5 : 1,
          transition: "opacity 1s",
        }}
      >
        <CardHeader title="Client Builder" />
        <CardContent>
          {loading && <LinearProgress />}
          {!loading && (
            <Grid container spacing={3}>
              <Grid item xs={12}>
                <Box sx={{ display: "flex" }}>
                  <TextField
                    fullWidth
                    variant="outlined"
                    label="Search by name"
                    value={search}
                    onChange={handleSearch}
                  />
                  <Button
                    variant="contained"
                    color="primary"
                    onClick={handleAdd}
                    sx={{ ml: 2, mt: -1, mb: -1 }}
                  >
                    Add a New Client
                  </Button>
                </Box>
              </Grid>
              <Grid item xs={12}>
                <div style={{ height: 640, width: "100%", overflow: "auto" }}>
                  <DataGrid
                    rows={searchKeyword !== "" ? searchResults : clients}
                    columns={columns}
                    pageSize={pageSize}
                    onPageSizeChange={(newPageSize) => setPageSize(newPageSize)}
                    rowsPerPageOptions={[5, 10, 20]}
                    // checkboxSelection
                    disableSelectionOnClick
                    onSelectionModelChange={handleSelectionChange}
                    onRowClick={handleRowClick}
                    onPageChange={handlePageChange}
                    onRowsPerPageChange={handleRowsPerPageChange}
                  />
                </div>
              </Grid>
            </Grid>
          )}
        </CardContent>
      </Card>
    </Box>
  );
}
