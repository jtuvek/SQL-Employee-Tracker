-- Add sample departments
INSERT INTO department (id, name) VALUES (1, 'HR'), (2, 'Engineering');

-- Add sample roles
INSERT INTO role (id, title, salary, department_id) VALUES
(1, 'HR Manager', 70000, 1),
(2, 'Software Engineer', 80000, 2);

-- Add sample employees
INSERT INTO employee (id, first_name, last_name, role_id, manager_id) VALUES
(1, 'John', 'Doe', 1, NULL),
(2, 'Jane', 'Smith', 2, 1);
