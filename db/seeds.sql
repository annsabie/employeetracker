INSERT INTO department (name)
VALUES ("Sales"),
       ("Customer Service"),
       ("Human Resources");
       
INSERT INTO role (title, salary, department_id)
VALUES ("Salesperson", 45000, 1),
       ("Sales Lead", 50000, 1),
       ("Sales Manager", 60000, 1),
       ("Customer Service Rep", 35000, 2),
       ("Customer Service Lead", 40000, 2),
       ("Talent Acquisition Coordinator", 45000, 3),
       ("Human Resources Manager", 60000, 3),
       ("Benefits Coordinator", 45000, 3);

INSERT INTO employee (first_name, last_name, role_id, manager_id)
VALUES ("Amy", "Jones", 2, 2),
        ("Jane", "Doe", 3),
        ("Danielle","Roberts", 7),
        ("Ellen", "Williams", 6, 3);

