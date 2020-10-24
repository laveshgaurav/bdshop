import React, { useState, useContext } from "react";
import { Paper, Grid, TextField, Button } from "@material-ui/core/";
import axios from "axios";
import AlertPop from "../alert/AlertPop";
import { AuthContext } from "../../context/AuthContext";

function ModalUpdate(props) {
  const auth = useContext(AuthContext);

  const [order, setOrder] = useState("");
  const [transaction, setTransaction] = useState("");
  const [amount, setAmount] = useState("");
  const [resp, setResp] = useState("");

  const handleSubmit = async (evt) => {
    evt.preventDefault();
    // alert(`Submitting : ${order},${transaction},${amount}`);
    const response = await axios.patch(
      "http://34.122.82.176:3000/post/updateRecord",
      {
        username: auth.userIs,
        ordernumber: order,
        transactionID: transaction,
        amount: amount,
      }
    );
    setResp(response.data);
    console.log(response.data);
  };
  const alertMessage = () => {
    if (resp === "record does not exists") {
      return false;
    } else if (resp === "successfully updated") {
      return true;
    }
  };
  const SubmitButton = () => {
    if (order.trim() && transaction.trim() && amount.trim()) {
      return (
        <Button variant="contained" color="primary" onClick={handleSubmit}>
          UPDATE
        </Button>
      );
    } else {
      return (
        <Button
          variant="contained"
          color="primary"
          disabled
          onClick={handleSubmit}
        >
          UPDATE
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
    //       width: "100%",
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
            disabled
            style={{ marginBottom: "0.8rem" }}
            id="standard"
            label="Username"
            fullWidth="True"
            value={auth.userIs}
            autoComplete="off"
          />
          <TextField
            style={{ marginBottom: "0.8rem" }}
            id="standard"
            label="Transaction ID"
            fullWidth="True"
            onChange={(e) => setTransaction(e.target.value)}
            autoComplete="off"
          />
          <TextField
            style={{ marginBottom: "0.8rem" }}
            id="standard"
            label="Order Number"
            fullWidth="True"
            onChange={(e) => setOrder(e.target.value)}
            autoComplete="off"
            type="number"
          />

          <TextField
            style={{ marginBottom: "0.8rem" }}
            id="standard"
            label="Amount"
            fullWidth="True"
            onChange={(e) => setAmount(e.target.value)}
            autoComplete="off"
          />
          <AlertPop
            pop={alertMessage()}
            success="Record updated."
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

export default ModalUpdate;
