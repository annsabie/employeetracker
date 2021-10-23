const inquirer = require("inquirer");
const express = require("express");

const mysql = require("mysql2");
const { response } = require("express");
const PORT = process.env.PORT || 3001;
const app = express();

app.use(express.urlencoded({ extended: false }));
app.use(express.json());

const db = mysql.createConnection(
  {
    host: "localhost",
    user: "root",
    password: "karyssa69",
    database: "employees_db"
  },
  console.log(`Connected to the employees_db database.`)
);

function start() {
    inquirer.prompt (
        {
            type: "list",
            message: "What would you like to do?",
            choices: [
                "View all departments",
                "View all roles",
                "View all employees",
                "Add a department",
                "Add a role",
                "Add an employee",
                "Update an employee role"
            ],
            name: "mainmenu",   
        },
        
    )
    .then((answers) => {
        if (answers = "Add a department") {
            addDepartment();
        }
        if (answers = "Add a role") {
            addRole();
        }
        if (answers = "Add an employee") {
            addEmployee();
        }
        if (answers = "View all departments") {
            showDepartments();
        }
        if (answers = "View all roles") {
            showRoles();
        }
        if (answers = "View all employees") {
            showEmployees();
        }
        if (answers = "Update an employee role") {
            updateEmployee
        }
    })
};

function addDepartment() {
    app.get("/api/department", (req, res) => {
        db.query("SELECT * from department", (err, results) => {
          if( err ) return res.status(400).json(err)
          res.json(results)
        })
      });
    inquirer.prompt (
        {
            type: "input",
            message: "What is the name of the department?",
            name: "addDepartmentName"
        },
    )

    .then((answers) => {
        app.post("/api/department/:name", (req, res) => {
            db.query("INSERT INTO department(name) VALUES(${})", req.body.name, (err, result) => {
              if( err ) return res.status(400).json(err)
              res.json("Department added!")
            })
          });
    })
    
   


};

start()