const inquirer = require("inquirer");
const express = require("express");

const mysql = require("mysql2");
const { response } = require("express");
const PORT = process.env.PORT || 3001;
const app = express();
const cTable = require("console.table");
require('dotenv').config();

app.use(express.urlencoded({ extended: false }));
app.use(express.json());

const db = mysql.createConnection(
    {
      host: "localhost",
      user: process.env.DB_USER,
      password: process.env.DB_PASSWORD,
      database: process.env.DB_NAME,
    },
    console.log(`Connected to the employees_db database.`)
  );
  

function start() {
    inquirer.prompt ([
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
        
    ])
    .then((answers) => {
        const { mainmenu} = answers;

        if (mainmenu === "View all departments") {
            viewDepartments();
        }
        if (mainmenu === "View all roles") {
            viewRoles();
        }
        if (mainmenu === "View all employees") {
            viewEmployees();
        }
        if (mainmenu === "Add a department") {
            addDepartment();
        }
        if (mainmenu === "Add a role") {
            addRole();
        }
        if (mainmenu === "Add an employee") {
            addEmployee();
        }
        if (mainmenu === "Update an employee") {
            updateEmployee();
        };

    });

};

function viewDepartments() {
    db.query("SELECT id AS id, name AS department FROM department", (err,results) => {
        if (err) throw err 
        console.table(results)
        start()
        })
};

function viewRoles() {
    db.query("SELECT title AS title FROM role", (err,results) => {
        if (err) throw err 
        console.table(results)
        start()
        })
};

function viewEmployees() {
    db.query("SELECT id, first_name, last_name, role_id, manager_id FROM employee", (err,results) => {
        if (err) throw err 
        console.table(results)
        start()
        })
}

function addDepartment() {
    inquirer.prompt (
        {
            type: "input",
            message: "What is the name of the department?",
            name: "addDepartmentName"
        },
    )

    .then((answer) => {
        db.query("INSERT INTO department SET ?",{name: answer.addDepartmentName}, (err,results) => {
        if (err) throw err
        console.log("Department has been added!");
        start();
        })
    })
    
}

function addRole() {
    inquirer.prompt ([
        {
            type: "input",
            message: "What is the name of the role?",
            name: "addRoleTitle"
        },
        {
            type: "input",
            message: "What is this role's salary?",
            name: "addSalary"
        },
        {
            type: "input",
            message: "What is this role's department id?",
            name: "addDepartmentId"
        }
    ])
    .then((answer) => {
        db.query("INSERT INTO role SET ?", {
            title: answer.addRoleTitle,
            salary: answer.addSalary,
            department_id: answer.addDepartmentId,
        },
        function (err) {
            if (err) throw err;
            console.log("Role has been added!");
            start()
        }
        )
    })
}

function addEmployee() {
    inquirer.prompt ([
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
    ])
    .then((answer) => {
        db.query("INSERT INTO employee SET ?", {
            first_name: answer.addFirstName,
            last_name: answer.addLastName,
            role_id: answer.addRoleId,
            manager_id: answer.addManagerId
        },
        function (err) {
            if (err) throw err;
            console.log("Employee has been added!");
            start()
        }
        )
    })
}

function updateEmployee() {
    inquirer.prompt ([
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
    ])
    .then((answer) => {
        db.query("INSERT INTO employee SET ?", {
            first_name: answer.addFirstName,
            last_name: answer.addLastName,
            role_id: answer.addRoleId,
            manager_id: answer.addManagerId
        },
        function (err) {
            if (err) throw err;
            console.log("Employee has been added!");
            start()
        }
        )
    })
}

start();