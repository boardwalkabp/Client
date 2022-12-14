import React from "react";
import useStateContext from "../../../hooks/useStateContext";
import { createAPIEndpoint, ENDPOINTS } from "../../../api";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router";
import { DataGrid } from "@mui/x-data-grid";
import {
  Card,
  CardContent,
  CardHeader,
  Grid,
  TextField,
  Button,
  IconButton,
  LinearProgress,
  Box,
} from "@mui/material";
import useMediaQuery from "@mui/material/useMediaQuery";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import VisibilityIcon from "@mui/icons-material/Visibility";

export default function Applications() {
  const navigate = useNavigate();
  const { context, setContext } = useStateContext();
  const [applications, setApplications] = useState([]);
  const [clients, setClients] = useState([]);
  const [categories, setCategories] = useState([]);
  const [page, setPage] = useState(0);
  const [pageSize, setPageSize] = useState(10);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [search, setSearch] = useState("");
  const [searchKeyword, setSearchKeyword] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const [selected, setSelected] = useState([]);
  const [selectedRow, setSelectedRow] = useState(null);
  const matches = useMediaQuery("(max-width:600px)");
  const [loading, setLoading] = useState(false);

  const fetchClients = async () => {
    setLoading(true);
    createAPIEndpoint(ENDPOINTS.clients)
      .fetch()
      .then((res) => {
        setClients(res.data);
      })
      .catch((err) => console.log(err));
  };

  const fetchCategories = async () => {
    createAPIEndpoint(ENDPOINTS.categories)
      .fetch()
      .then((res) => {
        setCategories(res.data);
      })
      .catch((err) => console.log(err));
  };

  const fetchApplications = async () => {
    setTimeout(() => {
      createAPIEndpoint(ENDPOINTS.applications)
        .fetch()
        .then((res) => {
          const filteredApps = res.data.filter(
            (application) => application.userId === context.id
          );
          setApplications(filteredApps);
        })
        .catch((err) => console.log(err));
    }, 100);
  };

  useEffect(() => {
    fetchClients();
    fetchCategories();
    fetchApplications();
  }, []);

  useEffect(() => {
    const results = applications.filter((application) =>
      application.title.toLowerCase().includes(search.toLowerCase())
    );
    setSearchResults(results);
  }, [search, applications]);

  const mappedApplications = applications.map((application) => {
    const client = clients.find((client) => client.id === application.clientId);
    const category = categories.find(
      (category) => category.id === application.categoryId
    );
    return {
      ...application,
      clientName: client ? client.name : "",
      categoryName: category ? category.name : "",
    };
  });

  const newApplications = mappedApplications
    .filter((application) => application.status !== "Completed")
    .map((application) => {
      return {
        ...application,
        clientName: application.clientName ? application.clientName : "",
        categoryName: application.categoryName ? application.categoryName : "",
      };
    });

  const rows = newApplications;

  const columns = [
    {
      field: "title",
      headerName: "Title",
      width: 200,
      editable: true,
      sortable: true,
      searchable: true,
    },
    {
      field: "status",
      headerName: "Status",
      width: 150,
      editable: false,
      searchable: true,
      sortable: true,
    },
    {
      field: "clientName",
      headerName: "Client",
      width: 150,
      editable: true,
      searchable: true,
      sortable: true,
      hide: matches,
    },
    {
      field: "categoryName",
      headerName: "Category",
      width: 150,
      editable: true,
      searchable: true,
      sortable: true,
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
            onClick={() => {
              setContext({ ...context, selectedApplication: params.row });
              navigate(`/builder/applications/view/${params.row.id}`);
            }}
          >
            <VisibilityIcon color="primary" />
          </IconButton>
          <IconButton
            onClick={() => {
              setContext({ ...context, selectedApplication: params.row });
              navigate(`/builder/applications/edit/${params.row.id}`);
            }}
          >
            <EditIcon color="primary" />
          </IconButton>
          <IconButton
            onClick={() => {
              setContext({ ...context, selectedApplication: params.row });
              navigate(`/builder/applications/delete/${params.row.id}`);
            }}
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

  const handleSearchClear = () => {
    setSearch("");
    setSearchKeyword("");
  };

  const handlePageChange = (params) => {
    setPage(params.page);
  };

  const handleRowsPerPageChange = (params) => {
    setRowsPerPage(params.pageSize);
  };

  const handleSelectionChange = (params) => {
    setSelected(params.rowIds);
  };

  const handleRowClick = (params) => {
    setSelectedRow(params.row);
  };

  useEffect(() => {
    fetchApplications();
  }, [searchKeyword]);

  const handleAdd = (e) => {
    e.preventDefault();
    navigate("/builder/applications/add");
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
        <CardHeader title="Application Builder" />
        <CardContent>
          {loading && <LinearProgress />}
          {!loading && (
            <Grid container spacing={3}>
              <Grid item xs={12}>
                <Box sx={{ display: "flex" }}>
                  <TextField
                    fullWidth
                    variant="outlined"
                    label="Search by title"
                    value={search}
                    onChange={handleSearch}
                  />
                  <Button
                    variant="contained"
                    color="primary"
                    onClick={handleAdd}
                    sx={{ ml: 2, mt: -1, mb: -1 }}
                  >
                    Add a New Application
                  </Button>
                </Box>
              </Grid>

              <Grid item xs={12}>
                <div style={{ height: 640, width: "100%", overflow: "auto" }}>
                  <DataGrid
                    rows={searchKeyword !== "" ? searchResults : rows}
                    columns={columns}
                    pageSize={pageSize}
                    onPageSizeChange={(newPageSize) => setPageSize(newPageSize)}
                    rowsPerPageOptions={[5, 10, 25]}
                    // checkboxSelection
                    disableSelectionOnClick
                    onSelectionModelChange={handleSelectionChange}
                    onRowClick={handleRowClick}
                    onRowsPerPageChange={handleRowsPerPageChange}
                    onPageChange={handlePageChange}
                    onSearchClear={handleSearchClear}
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
