import React, { useState } from "react";
import { Paper, Grid, TextField, Button } from "@material-ui/core/";
import axios from "axios";
import AlertPop from "../alert/AlertPop";

function ModalDelete(props) {
  const [transactionId, setTransactionId] = useState("");
  const [resp, setResp] = useState("");

  const handleSubmit = async (evt) => {
    evt.preventDefault();

    const response = await axios({
      method: "delete",
      url: "http://34.122.82.176:3000/post/deleteRecord",
      data: {
        transactionID: transactionId,
      },
    });
    setResp(response.data);
    console.log(response.data);
    console.log(transactionId);
    console.log(response);
  };
  const alertMessage = () => {
    if (resp === "record does not exists") {
      return false;
    } else if (resp === "successfully updated") {
      return true;
    }
  };
  const SubmitButton = () => {
    if (transactionId.trim()) {
      return (
        <Button
          variant="contained"
          color="primary"
          onClick={(e) => {
            handleSubmit(e);
            props.fetchData();
            props.loader();
          }}
        >
          DELETE
        </Button>
      );
    } else {
      return (
        <Button
          variant="contained"
          color="primary"
          disabled
          onClick={(e) => {
            handleSubmit(e);
            props.fetchData();
            props.loader();
          }}
        >
          DELETE
        </Button>
      );
    }
  };
  return (
    // <div style={{ margin: "1.5rem" }}>
    //   <Container
    //     fixed
    //     style={{
    //       justifyContent: "center",
    //       alignItems: "center",
    //       display: "flex",
    //     }}
    //   >
    <Grid style={{ width: "100%", margin: "2%" }}>
      <Paper elevation={3}>
        <div
          style={{
            width: "100%",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            padding: "1rem",
          }}
        >
          <TextField
            style={{ marginBottom: "0.8rem" }}
            id="standard"
            label="Transaction ID"
            fullWidth="True"
            onChange={(e) => setTransactionId(e.target.value)}
            autoComplete="off"
          />
          <AlertPop
            pop={alertMessage()}
            success="Record deleted."
            failure="Record doesn't exist."
          />
          <div
            style={{
              width: "100%",
              display: "flex",
              justifyContent: "space-around",
            }}
          >
            <SubmitButton />
            <Button variant="contained" color="secondary" onClick={props.close}>
              CLOSE
            </Button>
          </div>
        </div>
      </Paper>
    </Grid>
    //   </Container>
    // </div>
  );
}

export default ModalDelete;
