import Cpf from '../../../shared/domain/cpf';
import { Either } from '../../../shared/util/either';
import Student from '../../domain/entity/student';
import StudentRepository from '../../domain/port/studentRepository';
import RegisterStudentUseCase from '../../domain/usecase/student/registerStudentUseCase';

type RegisterStudentRequest = {
  name: string;
  birthday: Date;
  cpf: string;
};

export default class RegisterStudentService {
  constructor(readonly studentRepository: StudentRepository) {}

  execute(request: RegisterStudentRequest): Either<Error, string> {
    const { name, birthday, cpf } = request;

    const student = new Student(name, birthday, new Cpf(cpf));

    const registerStudentUseCase = new RegisterStudentUseCase(this.studentRepository);
    return registerStudentUseCase.execute(student);
  }
}
