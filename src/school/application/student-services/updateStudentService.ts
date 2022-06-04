import Cpf from '../../../shared/domain/cpf';
import { Either } from '../../../shared/util/either';
import Student from '../../domain/entity/student';
import StudentRepository from '../../domain/port/studentRepository';
import UpdateStudentUseCase from '../../domain/usecase/student/updateStudentUseCase';

type UpdateStudentRequest = {
  name: string;
  birthday: Date;
  cpf: string;
};

export default class UpdateStudentService {
  constructor(readonly studentRepository: StudentRepository) {}

  execute(request: UpdateStudentRequest): Either<Error, void> {
    const { name, birthday, cpf } = request;

    const student = new Student(name, birthday, new Cpf(cpf));

    const updateStudentUseCase = new UpdateStudentUseCase(this.studentRepository);
    return updateStudentUseCase.execute(student);
  }
}
