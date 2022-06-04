import { Request, Response, Router } from 'express';
import { isLeft } from '../../../shared/util/either';
import DeleteStudentService from '../../application/student-services/deleteStudentService';
import GetAllStudentService from '../../application/student-services/getAllStudentService';
import GetStudentService from '../../application/student-services/getStudentService';
import RegisterStudentService from '../../application/student-services/registerStudentService';
import UpdateStudentService from '../../application/student-services/updateStudentService';
import StudentRepository from '../../domain/port/studentRepository';

export default class StudentController {
  constructor(readonly studentRepository: StudentRepository) {}

  buildRouter(): Router {
    const router = Router();
    router.post('/', this.registerStudentHandler.bind(this));
    router.get('/:cpf', this.getStudentHandler.bind(this));
    router.get('/', this.getAllStudentHandler.bind(this));
    router.delete('/:cpf', this.deleteStudentHandler.bind(this));
    router.put('/', this.updateStudentHandler.bind(this));
    return router;
  }

  registerStudentHandler(req: Request, res: Response): void {
    const registerStudentService = new RegisterStudentService(this.studentRepository);
    const { name, birthday, cpf } = req.body;
    const result = registerStudentService.execute({
      name,
      birthday,
      cpf,
    });

    if (isLeft(result)) {
      res.status(400).json(result.value.message);
    } else {
      res.setHeader('Location', `/students/${result.value}`);
      res.sendStatus(201);
    }
  }

  updateStudentHandler(req: Request, res: Response): void {
    const registerStudentService = new UpdateStudentService(this.studentRepository);
    const { name, birthday, cpf } = req.body;
    const result = registerStudentService.execute({
      name,
      birthday,
      cpf,
    });

    if (isLeft(result)) {
      res.status(400).json(result.value.message);
    } else {
      res.setHeader('Location', `/students/${result.value}`);
      res.sendStatus(200);
    }
  }

  getStudentHandler(req: Request, res: Response): void {
    const getStudentService = new GetStudentService(this.studentRepository);
    const { cpf } = req.params;
    const result = getStudentService.execute({ cpf });

    if (isLeft(result)) {
      res.status(400).json(result.value.message);
    } else {
      res.setHeader('Location', `/students/${result.value}`);
      res.status(200).json(result.value);
    }
  }

  getAllStudentHandler(req: Request, res: Response): void {
    const getAllStudentService = new GetAllStudentService(this.studentRepository);
    const result = getAllStudentService.execute();

    if (isLeft(result)) {
      res.status(400).json(result.value.message);
    } else {
      res.setHeader('Location', `/students/${result.value}`);
      res.status(200).json(result.value);
    }
  }
  deleteStudentHandler(req: Request, res: Response): void {
    const deleteStudentService = new DeleteStudentService(this.studentRepository);
    const { cpf } = req.params;
    const result = deleteStudentService.execute({
      cpf,
    });

    if (isLeft(result)) {
      res.status(400).json(result.value.message);
    } else {
      res.setHeader('Location', `/students/${result.value}`);
      res.sendStatus(200);
    }
  }
}
