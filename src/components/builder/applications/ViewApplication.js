import React from "react";
import { createAPIEndpoint, ENDPOINTS } from "../../../api";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router";
import { useParams } from "react-router-dom";
import {
  Card,
  CardContent,
  Grid,
  Button,
  Typography,
  Checkbox,
  FormControlLabel,
  FormGroup,
  Radio,
  FormControl,
  RadioGroup,
  TextField,
  Link,
  CircularProgress,
  Box,
} from "@mui/material";
import ContentCopyOutlinedIcon from "@mui/icons-material/ContentCopyOutlined";

export default function ViewApplication() {
  const [application, setApplication] = useState({});
  const [questions, setQuestions] = useState([]);
  const [client, setClient] = useState({});
  const [category, setCategory] = useState({});
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const { id } = useParams();

  const fetchApplication = async () => {
    setLoading(true);
    createAPIEndpoint(ENDPOINTS.applications)
      .fetchById(id)
      .then((res) => {
        setApplication(res.data);
        // console.log(res.data);
        const questionIds = res.data.questions.map(
          (question) => question.value
        );
        createAPIEndpoint(ENDPOINTS.questions)
          .fetch()
          .then((res) => {
            const filteredQuestions = res.data.filter((question) =>
              questionIds.includes(question.id)
            );
            setQuestions(filteredQuestions);
            // setLoading(false);
          })
          .catch((err) => console.log(err));
      })
      .catch((err) => console.log(err));
  };

  useEffect(() => {
    fetchApplication();
  }, []);

  const clientId = application.clientId;
  const categoryId = application.categoryId;

  useEffect(() => {
    if (clientId) {
      createAPIEndpoint(ENDPOINTS.clients)
        .fetchById(clientId)
        .then((res) => {
          setClient(res.data);
        })
        .catch((err) => console.log(err));
    }
  }, [clientId]);

  useEffect(() => {
    if (categoryId) {
      createAPIEndpoint(ENDPOINTS.categories)
        .fetchById(categoryId)
        .then((res) => {
          setCategory(res.data);
        })
        .catch((err) => console.log(err));
    }
  }, [categoryId]);

  const applicationURL = `https://abp-demo.netlify.app/viewer/applications/answer/${application.id}`;

  if (loading) {
    setTimeout(() => {
      setLoading(false);
    }, 1000);
  }

  return (
    <Card
      sx={{
        opacity: loading ? 0.5 : 1,
        transition: "opacity 1s",
      }}
    >
      <CardContent>
        {loading && (
          <Box
            sx={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              height: "100%",
            }}
          >
            <CircularProgress />
          </Box>
        )}
        {!loading && (
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <Typography variant="h4" gutterBottom>
                {application.title}
              </Typography>
            </Grid>
            <Grid item xs={12}>
              <Typography variant="body1" gutterBottom>
                Client: {client.name}
              </Typography>
            </Grid>
            <Grid item xs={12}>
              <Typography variant="body1" gutterBottom>
                Category: {category.name}
              </Typography>
            </Grid>
            <Grid item xs={12}>
              <Typography variant="body1" gutterBottom>
                Status: {application.status}
              </Typography>
            </Grid>
            <Grid item xs={12}>
              <Typography variant="body1" gutterBottom>
                Client URL:{" "}
                <Link
                  href={applicationURL}
                  target="_blank"
                  rel="noopener noreferrer"
                  underline="hover"
                >
                  {applicationURL}
                </Link>{" "}
                <Button
                  variant="outlined"
                  color="primary"
                  onClick={() => {
                    navigator.clipboard.writeText(applicationURL);
                  }}
                  size="small"
                  startIcon={<ContentCopyOutlinedIcon />}
                >
                  Copy
                </Button>
              </Typography>
            </Grid>

            <Grid item xs={12}>
              {questions.map((question) => (
                <div className="added_question" key={question.id}>
                  <Typography variant="h6" gutterBottom>
                    {question.body}
                  </Typography>
                  {question.questionType === "Radio" && (
                    <FormControl>
                      <RadioGroup
                        aria-labelledby="demo-controlled-radio-buttons-group"
                        name={question.id}
                      >
                        {question.choices.map((option, index) => {
                          let checked;
                          return (
                            <FormControlLabel
                              key={index}
                              value={option.value}
                              control={<Radio />}
                              label={option.value}
                              disabled
                              checked={checked}
                            />
                          );
                        })}
                      </RadioGroup>
                    </FormControl>
                  )}
                  {question.questionType === "CheckBox" && (
                    <FormGroup>
                      {question.choices.map((option, index) => {
                        let checked;
                        return (
                          <FormControlLabel
                            key={index}
                            control={
                              <Checkbox
                                name={question.id}
                                value={option.value}
                                key={option.id}
                                disabled
                                checked={checked}
                              />
                            }
                            label={option.value}
                          />
                        );
                      })}
                    </FormGroup>
                  )}
                  {question.questionType === "Text" && (
                    <TextField
                      fullWidth
                      variant="outlined"
                      margin="normal"
                      required
                      name={question.id}
                      placeholder={question.placeholder}
                      disabled
                    />
                  )}
                </div>
              ))}
            </Grid>
            <Grid item xs={12}>
              <Button
                fullWidth
                variant="contained"
                color="primary"
                onClick={() => navigate(`/builder/applications/edit/${id}`)}
              >
                Edit
              </Button>
            </Grid>
          </Grid>
        )}
      </CardContent>
    </Card>
  );
}
