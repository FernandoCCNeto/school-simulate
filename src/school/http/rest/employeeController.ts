import { Request, Response, Router } from 'express';
import { isLeft } from '../../../shared/util/either';
import DeleteEmployeeService from '../../application/employee-services/deleteEmployeeService';
import GetAllEmployeeService from '../../application/employee-services/getAllEmployeeService';
import GetEmployeeService from '../../application/employee-services/getEmployeeService';
import RegisterEmployeeService from '../../application/employee-services/registerEmployeeService';
import UpdateEmployeeService from '../../application/employee-services/updateEmployeeService';
import EmployeeRepository from '../../domain/port/employeeRepository';

export default class EmployeeController {
  constructor(readonly employeeRepository: EmployeeRepository) {}

  buildRouter(): Router {
    const router = Router();
    router.post('/', this.registerEmployeeHandler.bind(this));
    router.get('/:cpf', this.getEmployeeHandler.bind(this));
    router.get('/', this.getAllEmployeeHandler.bind(this));
    router.delete('/:cpf', this.deleteEmployeeHandler.bind(this));
    router.put('/', this.updateEmployeeHandler.bind(this));
    return router;
  }

  registerEmployeeHandler(req: Request, res: Response): void {
    const registerEmployeeService = new RegisterEmployeeService(this.employeeRepository);
    const { name, email, birthday, cpf } = req.body;
    const result = registerEmployeeService.execute({
      name,
      email,
      birthday,
      cpf,
    });

    if (isLeft(result)) {
      res.status(400).json(result.value.message);
    } else {
      res.setHeader('Location', `/employees/${result.value}`);
      res.sendStatus(201);
    }
  }

  updateEmployeeHandler(req: Request, res: Response): void {
    const registerEmployeeService = new UpdateEmployeeService(this.employeeRepository);
    const { name, email, birthday, cpf } = req.body;
    const result = registerEmployeeService.execute({
      name,
      email,
      birthday,
      cpf,
    });

    if (isLeft(result)) {
      res.status(400).json(result.value.message);
    } else {
      res.setHeader('Location', `/employees/${result.value}`);
      res.sendStatus(200);
    }
  }

  getEmployeeHandler(req: Request, res: Response): void {
    const getEmployeeService = new GetEmployeeService(this.employeeRepository);
    const { cpf } = req.params;
    const result = getEmployeeService.execute({ cpf });

    if (isLeft(result)) {
      res.status(400).json(result.value.message);
    } else {
      res.setHeader('Location', `/employees/${result.value}`);
      res.status(200).json(result.value);
    }
  }

  getAllEmployeeHandler(req: Request, res: Response): void {
    const getAllEmployeeService = new GetAllEmployeeService(this.employeeRepository);
    const result = getAllEmployeeService.execute();

    if (isLeft(result)) {
      res.status(400).json(result.value.message);
    } else {
      res.setHeader('Location', `/employees/${result.value}`);
      res.status(200).json(result.value);
    }
  }
  deleteEmployeeHandler(req: Request, res: Response): void {
    const deleteEmployeeService = new DeleteEmployeeService(this.employeeRepository);
    const { cpf } = req.params;
    const result = deleteEmployeeService.execute({
      cpf,
    });

    if (isLeft(result)) {
      res.status(400).json(result.value.message);
    } else {
      res.setHeader('Location', `/employees/${result.value}`);
      res.sendStatus(200);
    }
  }
}
