import React from "react";
import useStateContext from "../../../hooks/useStateContext";
import { createAPIEndpoint, ENDPOINTS } from "../../../api";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router";
import { Box } from "@mui/system";
import { DataGrid } from "@mui/x-data-grid";
import { Card, CardContent, CardHeader, Grid, TextField, Button, IconButton } from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import VisibilityIcon from "@mui/icons-material/Visibility";

export default function Questions() {
  const { context } = useStateContext();
  // console.log(context);

  const [questions, setQuestions] = useState([]);
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

  const fetchQuestions = async () => {
    setLoading(true);
    createAPIEndpoint(ENDPOINTS.questions)
      .fetch()
      .then((res) => {
        console.log(res.data);
        setQuestions(res.data);
        setLoading(false);
      })
      .catch((err) => console.log(err));
  };

  useEffect(() => {
    fetchQuestions();
  }, []);

  const columns = [
    // { field: "id", headerName: "ID", width: 90 },
    { field: "body", headerName: "Body", width: 200 },
    // { field: "type", headerName: "Type", width: 200 },
    { field: "questionType", headerName: "Question Type", width: 150 },
    // { field: "options", headerName: "Options", width: 200 },
    { field: "mous", headerName: "Mous", width: 200 },


    // { field: "createdAt", headerName: "Created At", width: 200 },
    // { field: "updatedAt", headerName: "Updated At", width: 200 },
    {
      field: "actions",
      headerName: "Actions",
      width: 200,
      renderCell: (params) => (
        <div>
          <IconButton
            onClick={() => navigate(`/builder/questions/view/${params.row.id}`)}
          >
            <VisibilityIcon color="primary" />
          </IconButton>
          <IconButton
            onClick={() => navigate(`/builder/questions/edit/${params.row.id}`)}
          >
            <EditIcon color="primary" />
          </IconButton>
          <IconButton
            onClick={() =>
              navigate(`/builder/questions/delete/${params.row.id}`)
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
  };

  const handleSearchClick = () => {
    setSearchKeyword(search);
  };

  useEffect(() => {
    if (searchKeyword !== "") {
      const results = questions.filter((question) =>
        question.body.toLowerCase().includes(searchKeyword)
      );
      setSearchResults(results);
    } else {
      setSearchResults(questions);
    }
  }, [searchKeyword, questions]);

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

  const handleAdd = () => {
    navigate("/builder/questions/add");
  };

  return (
    <Card>
      <CardHeader title="Questions" />
      <CardContent>
        <Grid container spacing={2}>
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
                Add New Question
              </Button>
            </Box>
          </Grid>
          <Grid item xs={12}>
            <div style={{ height: 400, width: "100%" }}>
              <DataGrid
                rows={searchKeyword !== "" ? searchResults : questions}
                columns={columns}
                pageSize={rowsPerPage}
                rowsPerPageOptions={[5, 10, 20]}
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
  );
}
