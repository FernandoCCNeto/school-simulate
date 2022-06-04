import { Either } from '../../../shared/util/either';
import Student from '../../domain/entity/student';
import StudentRepository from '../../domain/port/studentRepository';
import GetStudentUseCase from '../../domain/usecase/student/getStudentUseCase';

type GetStudentRequest = {
  cpf: string;
};

export default class GetStudentService {
  constructor(readonly studentRepository: StudentRepository) {}

  execute(request: GetStudentRequest): Either<Error, Student> {
    const { cpf } = request;

    const getStudentUseCase = new GetStudentUseCase(this.studentRepository);
    return getStudentUseCase.execute(cpf);
  }
}
