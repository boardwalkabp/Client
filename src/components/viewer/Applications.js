import React from "react";
import useStateContext from "../../hooks/useStateContext";
import { createAPIEndpoint, ENDPOINTS } from "../../api";
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
import VisibilityIcon from "@mui/icons-material/Visibility";

export default function Applications() {
  const navigate = useNavigate();
  const { context, setContext } = useStateContext();
  const [applications, setApplications] = useState([]);
  const [page, setPage] = useState(0);
  const [pageSize, setPageSize] = useState(10);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [search, setSearch] = useState("");
  const [searchKeyword, setSearchKeyword] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const [selected, setSelected] = useState([]);
  const [selectedRow, setSelectedRow] = useState(null);
  const [loading, setLoading] = useState(false);
  const matches = useMediaQuery("(max-width:600px)");

  const fetchApplications = async () => {
    setLoading(true);
    createAPIEndpoint(ENDPOINTS.applications)
      .fetch()
      .then((res) => {
        const filteredApps = res.data.filter(
          (application) => application.clientId === context.id
        );
        setApplications(filteredApps);
      })
      .catch((err) => console.log(err));
  };

  const columns = [
    {
      field: "title",
      headerName: "Title",
      width: 300,
      editable: false,
      searchable: true,
      sortable: true,
    },
    {
      field: "status",
      headerName: "Status",
      width: 200,
      editable: false,
      searchable: true,
      sortable: true,
      // hide: matches,
    },
    {
      field: "actions",
      headerName: "Actions",
      width: 150,
      sortable: false,
      searchable: false,
      editable: false,
      renderCell: (params) => (
        <div>
          {params.row.status === "Completed" ? (
            <IconButton
              onClick={() =>
                navigate(`/viewer/applications/view/${params.row.id}`)
              }
            >
              <VisibilityIcon color="primary" />
            </IconButton>
          ) : (
            <IconButton
              onClick={() =>
                navigate(`/viewer/applications/answer/${params.row.id}`)
              }
            >
              <EditIcon color="primary" />
            </IconButton>
          )}
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

  useEffect(() => {
    if (searchKeyword !== "") {
      const results = applications.filter((application) =>
        application.title.toLowerCase().includes(searchKeyword)
      );
      setSearchResults(results);
    } else {
      setSearchResults(applications);
    }
  }, [searchKeyword, applications]);

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
        <CardHeader title="Your Applications" />
        <CardContent>
          {loading && <LinearProgress />}
          {!loading && (
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
                </Box>
              </Grid>
              <Grid item xs={12}>
                <div style={{ height: 640, width: "100%", overflow: "auto" }}>
                  <DataGrid
                    rows={searchKeyword !== "" ? searchResults : applications}
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
