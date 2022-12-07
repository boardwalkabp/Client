import React from "react";
import useStateContext from "../../../hooks/useStateContext";
import { createAPIEndpoint, ENDPOINTS } from "../../../api";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router";
import { useParams } from "react-router-dom";
import { Box } from "@mui/system";
import { DataGrid } from "@mui/x-data-grid";
import { Card, CardContent, CardHeader, Grid, TextField, Button, IconButton } from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import VisibilityIcon from "@mui/icons-material/Visibility";

export default function Applications() {
  const { context, setContext } = useStateContext();
  const [applications, setApplications] = useState([]);
  const navigate = useNavigate();
  const { id } = useParams();
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [search, setSearch] = useState("");
  const [searchKeyword, setSearchKeyword] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const [total, setTotal] = useState(0);
  const [error, setError] = useState(null);
  const [selected, setSelected] = useState([]);
  const [selectedRow, setSelectedRow] = useState(null);

  const fetchApplications = async () => {
    createAPIEndpoint(ENDPOINTS.applications)
      .fetch()
      .then((res) => {
        setApplications(res.data);
      })
      .catch((err) => console.log(err));
  };

  useEffect(() => {
    fetchApplications();
  }, []);

  const columns = [
    // { field: "id", headerName: "ID", width: 90 },
    {
      field: "title",
      headerName: "Title",
      width: 200,
      editable: true,
    },
    {
      field: "createdAt",
      headerName: "Created At",
      width: 150,
      editable: true,
    },
    // {
    //   field: "updatedAt",
    //   headerName: "Updated At",
    //   width: 150,
    //   editable: true,
    // },
    {
      field: "actions",
      headerName: "Actions",
      width: 150,
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
  };

  const handleSearchClick = () => {
    setSearchKeyword(search);
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

  const handleAdd = (e) => {
    e.preventDefault();
    navigate("/builder/applications/add");
  };

  return (
    <div>
      <Box sx={{ width: "100%" }}>
        <Card>
          <CardHeader title="Applications" />
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
                    Add New Application
                  </Button>
                </Box>
              </Grid>
              <Grid item xs={12}>
                <div style={{ height: 400, width: "100%" }}>
                  <DataGrid
                    rows={searchKeyword !== "" ? searchResults : applications}
                    columns={columns}
                    pageSize={rowsPerPage}
                    rowsPerPageOptions={[5, 10, 25]}
                    checkboxSelection
                    disableSelectionOnClick
                    onSelectionModelChange={handleSelectionChange}
                    onRowClick={handleRowClick}
                    onPageSizeChange={handleRowsPerPageChange}
                    onPageChange={handlePageChange}
                    onSearchClear={handleSearchClear}
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
