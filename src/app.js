const inquirer = require('inquirer');
const db = require('./db');

function mainMenu() {
    inquirer
      .prompt({
        type: 'list',
        name: 'action',
        message: 'What would you like to do?',
        choices: [
          'View all departments',
          'View all roles',
          'View all employees',
          'Add a department',
          'Add a role',
          'Add an employee',
          'Update an employee role',
          'Exit',
        ],
      })
      .then((answer) => {
        switch (answer.action) {
          case 'View all departments':
            viewDepartments();
            break;
          case 'View all roles':
            viewRoles();
            break;
          case 'View all employees':
            viewEmployees();
            break;
          case 'Add a department':
            addDepartment();
            break;
          case 'Add a role':
            addRole();
            break;
          case 'Add an employee':
            addEmployee();
            break;
          case 'Update an employee role':
            updateEmployeeRole();
            break;
          case 'Exit':
            db.closeConnection();
            break;
        }
      });
  }

  async function viewDepartments() {
    try {
      const departments = await db.query('SELECT * FROM department');
      console.table(departments);
      mainMenu();
    } catch (error) {
      console.error('Error viewing departments:', error);
      mainMenu();
    }
  }

  async function viewRoles() {
    try {
      const roles = await db.query('SELECT * FROM role');
      console.table(roles);
      mainMenu();
    } catch (error) {
      console.error('Error viewing roles:', error);
      mainMenu();
    }
  }
  
  async function viewEmployees() {
    try {
      const employees = await db.query('SELECT * FROM employee');
      console.table(employees);
      mainMenu();
    } catch (error) {
      console.error('Error viewing employees:', error);
      mainMenu();
    }
  }
  
  async function addDepartment() {
    try {
      const answer = await inquirer.prompt([
        {
          type: 'input',
          name: 'name',
          message: 'Enter the name of the department:',
        },
      ]);
  
      await db.query('INSERT INTO department SET ?', { name: answer.name });
      console.log('Department added successfully!');
      mainMenu();
    } catch (error) {
      console.error('Error adding department:', error);
      mainMenu();
    }
  }
  
  async function addRole() {
    try {
      const answer = await inquirer.prompt([
        {
          type: 'input',
          name: 'title',
          message: 'Enter the title of the role:',
        },
        {
          type: 'input',
          name: 'salary',
          message: 'Enter the salary for the role:',
        },
        {
          type: 'input',
          name: 'department_id',
          message: 'Enter the department ID for the role:',
        },
      ]);
  
      await db.query('INSERT INTO role SET ?', answer);
      console.log('Role added successfully!');
      mainMenu();
    } catch (error) {
      console.error('Error adding role:', error);
      mainMenu();
    }
  }
  
  async function addEmployee() {
    try {
      const answer = await inquirer.prompt([
        {
          type: 'input',
          name: 'first_name',
          message: 'Enter the first name of the employee:',
        },
        {
          type: 'input',
          name: 'last_name',
          message: 'Enter the last name of the employee:',
        },
        {
          type: 'input',
          name: 'role_id',
          message: 'Enter the role ID for the employee:',
        },
        {
          type: 'input',
          name: 'manager_id',
          message: 'Enter the manager ID for the employee:',
        },
      ]);
  
      await db.query('INSERT INTO employee SET ?', answer);
      console.log('Employee added successfully!');
      mainMenu();
    } catch (error) {
      console.error('Error adding employee:', error);
      mainMenu();
    }
  }
   
  async function updateEmployeeRole() {
    try {
      const employees = await db.query('SELECT * FROM employee');
      const roles = await db.query('SELECT * FROM role');
  
      const answer = await inquirer.prompt([
        {
          type: 'list',
          name: 'employee_id',
          message: 'Select an employee to update:',
          choices: employees.map((employee) => ({
            name: `${employee.first_name} ${employee.last_name}`,
            value: employee.id,
          })),
        },
        {
          type: 'list',
          name: 'role_id',
          message: 'Select the new role for the employee:',
          choices: roles.map((role) => ({
            name: role.title,
            value: role.id,
          })),
        },
      ]);
  
      await db.query('UPDATE employee SET role_id = ? WHERE id = ?', [
        answer.role_id,
        answer.employee_id,
      ]);
  
      console.log('Employee role updated successfully!');
      mainMenu();
    } catch (error) {
      console.error('Error updating employee role:', error);
      mainMenu();
    }
  }  
  
  // Start the application
  db.connect().then(() => {
    mainMenu();
  });
  