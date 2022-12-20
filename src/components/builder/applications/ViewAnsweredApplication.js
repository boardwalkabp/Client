import React from "react";
import { createAPIEndpoint, ENDPOINTS } from "../../../api";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Card, CardContent, Grid, Typography } from "@mui/material";
import $ from "jquery";

export default function ViewAnsweredApplication() {
  const [application, setApplication] = useState({});
  const [client, setClient] = useState({});
  const [category, setCategory] = useState({});
  const [questions, setQuestions] = useState([]);
  const [answers, setAnswers] = useState([]);
  const { id } = useParams();
  console.log(questions);
  console.log(answers);

  useEffect(() => {
    createAPIEndpoint(ENDPOINTS.applications)
      .fetchById(id)
      .then((res) => {
        setApplication(res.data);
        setQuestions(res.data.questions);
        setAnswers(res.data.answers);
      })
      .catch((err) => console.log(err));
  }, [id]);
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

  return (
    <div>
      <Card>
        <CardContent>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <Typography variant="h5" gutterBottom>
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
              <div>
                {questions.map((question, index) => (
                  <div key={index}>
                    <Typography variant="body1" gutterBottom>
                      {question.question}
                    </Typography>
                    <Typography variant="body1" gutterBottom>
                      {answers[index].answer}
                    </Typography>
                  </div>
                ))}
              </div>
            </Grid>
          </Grid>
        </CardContent>
      </Card>
    </div>
  );
}
