function addDepartment() {
    app.get("/api/department", (req, res) => {
        db.query("SELECT from department", (err, results) => {
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
    db.query("SELECT * FROM role", function (err,res) {
        if (err) throw err;
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
    ]);
    db.query("INSERT INTO role SET ?", {
        title: answer.addRoleTitle,
        salary: answer.addSalary,
        department_id: answer.addDepartmentId,
    },
    function (err) {
        if (err) throw err;
        console.log("Employee has been added!");
        start()
    })
    })
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





function viewDepartments() {
    const sql = `SELECT department.id AS id, department.name AS department FROM department`; 

    connection.promise().query(sql, (err, rows) => {
      if (err) throw err;
      console.table(rows);
      promptUser();
    });
}
start()
