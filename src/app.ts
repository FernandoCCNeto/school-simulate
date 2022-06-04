import express from 'express';
import EmployeeRepositoryArray from './school/adapter/repository/employeeRepositoryArray';
import StudentRepositoryArray from './school/adapter/repository/studentsRepositoryArray';
import WarehouseRepositoryArray from './school/adapter/repository/warehouseRepositoryArray';
import EmployeeController from './school/http/rest/employeeController';
import StudentController from './school/http/rest/studentsController';
import WarehouseController from './school/http/rest/warehouseController';

const employeeRepository = new EmployeeRepositoryArray();
const employeeController = new EmployeeController(employeeRepository);
const studentRepository = new StudentRepositoryArray();
const studentController = new StudentController(studentRepository);
const warehouseRepository = new WarehouseRepositoryArray();
const warehouseController = new WarehouseController(warehouseRepository);

const app = express();
app.use(express.json());
app.use('/employees', employeeController.buildRouter());
app.use('/students', studentController.buildRouter());
app.use('/warehouse', warehouseController.buildRouter());

export default app;
