DROP DATABASE IF EXISTS employees_db;
CREATE DATABASE employees_db;

USE employees_db;

CREATE TABLE department (
    id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(30) NOT NULL
);

CREATE TABLE role (
    id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
    title VARCHAR(30) NOT NULL,
    salary DECIMAL,
    department_id INT,
    FOREIGN KEY (department_id)
    REFERENCES department(id)
    ON DELETE SET NULL
);

CREATE TABLE employee (
    id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
    first_name VARCHAR(30),
    last_name VARCHAR(30),
    role_id INT,
    manager_id INT,
    FOREIGN KEY (role_id)
    REFERENCES role(id)
    ON DELETE SET NULL
);

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
        ("Jane", "Doe", 3, 2),
        ("Danielle","Roberts", 7, 3),
        ("Ellen", "Williams", 6, 3);