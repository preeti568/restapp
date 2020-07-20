const express = require("express");
const cors = require("cors");
const sql = require("mssql");
const bodyParser = require("body-parser");

const app = express();

const SELECT_ALL_DATA_QUERY = "SELECT * FROM Sheet1";

const connection = sql.connect({
  user: "sa",
  password: "abc@1234",
  server: "DESKTOP-D8RVGPM",
  database: "DBNatGasMeter",
});

sql.connect((err) => {
  if (err) {
    return err;
  }
});

app.use(
  bodyParser.urlencoded({
    extended: true,
  })
);

console.log(connection);
app.use(cors());
app.use(bodyParser.json());
app.get("/", (req, res) => {
  res.send("go to /gasMeter to se data");
});

//GasMeterData

app.get("/GasMeter", (req, res) => {
  var request = new sql.Request();
  request.query(SELECT_ALL_DATA_QUERY, (err, results) => {
    if (err) {
      return res.send(err);
    } else {
      return res.json({ data: results });
    }
  });
});

//PipelineName

app.get("/GasMeter/PipelineName", (req, res) => {
  var request = new sql.Request();
  request.query("select distinct Pipeline from Sheet1;", (err, results) => {
    if (err) {
      return res.send(err);
    } else {
      return res.send({ data: results });
    }
  });
});

//PipelineiD

app.get("/GasMeter/PipelineiD", (req, res) => {
  var request = new sql.Request();
  request.query("select distinct pipelineid from Sheet1;", (err, results) => {
    if (err) {
      return res.send(err);
    } else {
      return res.json({ data: results });
    }
  });
});

app.get("/GasMeter/Meterid", (req, res) => {
  var request = new sql.Request();
  request.query(
    "select distinct meterid from Sheet1 order by meterid;",
    (err, results) => {
      if (err) {
        return res.send(err);
      } else {
        return res.json({ data: results });
      }
    }
  );
});

app.get("/GasMeter/LatestCycle", (req, res) => {
  var request = new sql.Request();
  request.query("select distinct LatestCycle from Sheet1;", (err, results) => {
    if (err) {
      return res.send(err);
    } else {
      return res.json({ data: results });
    }
  });
});

app.post("/GasMeter/search", (req, res) => {
  var request = new sql.Request();
  // console.log(typeof req.body.data);
  var data = JSON.parse(req.body.data);
  console.log(data);

  var query =
    "select * from Sheet1 where PipelineID = " +
    data.data.PipelineID +
    " AND Pipeline = '" +
    data.data.Pipeline +
    "' AND MeterID = " +
    data.data.MeterID +
    " AND LatestCycle= '" +
    data.data.LatestCycle +
    "'";

  console.log(query);
  request.query(
    query,

    (err, results) => {
      if (err) {
        console.log(err);
        return res.send(err);
      } else {
        return res.json({ data: results });
      }
    }
  );
});

app.listen(5000, () => {
  console.log(`GasMeter server listening on Port 5000`);
});
