const inquirer = require("inquirer");
const express = require("express");

const mysql = require("mysql2");
const { response } = require("express");
const PORT = process.env.PORT || 3001;
const app = express();
const cTable = require("console.table");

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
        }
        
    )
    .then((answers) => {

        const {userChoice} = answers;
        
        if (userChoice === "Add a department") {
            addDepartment();
        }
        if (userChoice = "Add a role") {
            addRole();
        }
        if (userChoice = "Add an employee") {
            addEmployee();
        }
        if (userChoice = "View all departments") {
            showDepartments();
        }
        if (userChoice = "View all roles") {
            showRoles();
        }
        if (userChoice = "View all employees") {
            showEmployees();
        }
        if (userChoice = "Update an employee role") {
            updateEmployee();
        }
    });
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

    .then(answer => {
        app.post("/api/department/:name", (req, res) => {
            db.query("INSERT INTO department(name) VALUES(${})", req.body.name, (err, result) => {
              if( err ) return res.status(400).json(err)
              res.json("Department added!")
            })
          });
    })
    
   


};

function addRole() {
    app.get("/api/role", (req, res) => {
        db.query("SELECT * from role", (err, results) => {
          if( err ) return res.status(400).json(err)
          res.json(results)
        })
      });
    inquirer.prompt (
        {
            type: "input",
            message: "What is the name of the role?",
            name: "addRole"
        },
    )

    .then((answers) => {
        app.post("/api/department/:title", (req, res) => {
            db.query("INSERT INTO role(title) VALUES(${})", req.body.name, (err, result) => {
              if( err ) return res.status(400).json(err)
              res.json("Role added!")
            })
          });
    })
    
   start()


};

function addEmployee() {
    app.get("/api/employee", (req, res) => {
        db.query("SELECT * from employee", (err, results) => {
          if( err ) return res.status(400).json(err)
          res.json(results)
        })
      });
    inquirer.prompt (
        {
            type: "input",
            message: "What is the first name of the employee?",
            name: "addFirstName"
        },
        {
            type: "input",
            message: "What is the last name of the employee?",
            name: "addLastName"
        },
        {
            type: "input",
            message: "What is their role id?",
            name: "addRoleId"
        },
        {
            type: "input",
            message: "What is the manager id for this employee?",
            name: "addManagerId"

        }
    )

    .then((answers) => {
        app.post("/api/department/:name", (req, res) => {
            db.query("INSERT INTO department(name) VALUES(${})", req.body.name, (err, result) => {
              if( err ) return res.status(400).json(err)
              res.json("Department added!")
            })
          });
    })
    
   start()


};

function showDepartments() {
    app.get("/api/department", (req, res) => {
        db.query("SELECT * from department", (err, results) => {
          if( err ) return res.status(400).json(err)
          res.json(results)
        })
      }); 
}

start()