import React from "react";
import { createAPIEndpoint, ENDPOINTS } from "../../../api";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router";
import { Box } from "@mui/system";
import { DataGrid } from "@mui/x-data-grid";
import {
  Card,
  CardContent,
  CardHeader,
  Grid,
  TextField,
  Button,
  IconButton,
} from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import VisibilityIcon from "@mui/icons-material/Visibility";

export default function Categories() {
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(false);
  const [search, setSearch] = useState("");
  const [searchKeyword, setSearchKeyword] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const [page, setPage] = useState(0);
  const [pageSize, setPageSize] = useState(10);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [total, setTotal] = useState(0);
  const [error, setError] = useState(null);
  const [selected, setSelected] = useState([]);
  const [selectedRow, setSelectedRow] = useState(null);
  const [errors, setErrors] = useState({});
  const navigate = useNavigate();

  const fetchCategories = async () => {
    setLoading(true);
    createAPIEndpoint(ENDPOINTS.categories)
      .fetch()
      .then((res) => {
        setCategories(res.data);
        setLoading(false);
      })
      .catch((err) => console.log(err));
  };

  useEffect(() => {
    fetchCategories();
  }, []);

  useEffect(() => {
    const results = categories.filter((category) =>
      category.name.toLowerCase().includes(search.toLowerCase())
    );
    setSearchResults(results);
  }, [search, categories]);

  const columns = [
    {
      field: "name",
      headerName: "Name",
      width: 400,
      editable: true,
      sortable: true,
      searchable: true,
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
            onClick={() =>
              navigate(`/builder/categories/view/${params.row.id}`)
            }
          >
            <VisibilityIcon color="primary" />
          </IconButton>
          <IconButton
            onClick={() =>
              navigate(`/builder/categories/edit/${params.row.id}`)
            }
          >
            <EditIcon color="primary" />
          </IconButton>
          <IconButton
            onClick={() =>
              navigate(`/builder/categories/delete/${params.row.id}`)
            }
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

  const handleRowsPerPageChange = (params) => {
    setRowsPerPage(params.pageSize);
  };

  const handleSelect = (params) => {
    setSelected(params.rowIds);
    setSelectedRow(params.row);
  };

  const handleAdd = () => {
    navigate("/builder/categories/add");
  };

  return (
    <Card>
      <CardHeader title="Category Builder" />
      <CardContent>
        <Grid container spacing={2}>
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
                Add a New Category
              </Button>
            </Box>
          </Grid>
          <Grid item xs={12}>
            <div style={{ height: 400, width: "100%" }}>
              <DataGrid
                rows={searchKeyword !== "" ? searchResults : categories}
                columns={columns}
                pageSize={pageSize}
                onPageSizeChange={(newPageSize) => setPageSize(newPageSize)}
                rowsPerPageOptions={[5, 10, 20]}
                // checkboxSelection
                disableSelectionOnClick
                onSelectionModelChange={handleSelect}
                onPageChange={handlePageChange}
                onRowsPerPageChange={handleRowsPerPageChange}
              />
            </div>
          </Grid>
        </Grid>
      </CardContent>
    </Card>
  );
}
