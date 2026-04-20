
const express = require("express");
const mysql = require("mysql2");
const cors = require("cors");

const app = express();
app.use(cors());
app.use(express.json());

const db = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "",
  database: "exam",
});
db.connect((err) => {
  if (err) {
    console.error("database failed:", err);
  } else { 
    console.log(" connected");
    
  }
});

app.post('/users', (req, res) => {
  const {name, email} = req.query;
    const sqlInsert = "INSERT INTO users (name, email) VALUES (?, ?)";
    db.query(sqlInsert, [name, email], (err, result) => {
      if (err) {
        console.error("Error inserting data:", err);    
        res.status(500).send("Error inserting data");
        } else {    
        console.log("Data inserted successfully");    
        res.status(200).send("Data inserted successfully");
      }
    });
});

// READ - GET 
 app.get("/users", (req,res) => {
    console.log("GET /users called");
    const sql = "SELECT * FROM users";
    db.query(sql, (err, result) => {
        console.log("Query executed", err, result);
        if (err) {
            console.error("Error fetching data:", err);    
            res.status(500).send("Error fetching data: " + err.message);
        } else {  
            res.json(result);
        }
     });    
    });

    // READ A SINGLE USER 
    app.get("/users/:id", (req,res) => {
        const sql = "SELECT * FROM users WHERE id = ?";
        db.query(sql, [req.params.id], (err, result) => {
            if (err) {
                console.error("Error fetching data:", err);    
                res.status(500).send("Error fetching data");
            } else {  
                res.json(result);
            }
         }  
         );
    });

    // UPDATE
    app.put("/users/:id", (req,res) => {
        const {name, email} = req.query;
        const sql = "UPDATE users SET name = ?, email = ? WHERE id = ?";    
        db.query(sql, [name, email, req.params.id], (err, result) => {
            if (err) {
                console.error("Error updating data:", err);    
                res.status(500).send("Error updating data");
            } else {
                res.status(200).send("Data updated successfully");
            }
            }
            );
    });

    // DELETE
    app.delete("/users/:id", (req,res) => {
        const sql = "DELETE FROM users WHERE id = ?";
        db.query(sql, [req.params.id], (err, result) => {
            if (err) {
                console.error("Error deleting data:", err);
                res.status(500).send("Error deleting data");
            } else {
                console.log("Data deleted successfully");
                res.status(200).send("Data deleted successfully");
            }
        });
    });

// home route
    app.get("/", (req, res) => {
        res.send("Welcome to the User Management API");
    });

    // Start the server
    app.listen(3000, () => {
        console.log("Server is running on port 3000");
    });
