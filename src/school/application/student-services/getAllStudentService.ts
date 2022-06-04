import { Either } from '../../../shared/util/either';
import Student from '../../domain/entity/student';
import StudentRepository from '../../domain/port/studentRepository';
import GetAllStudentUseCase from '../../domain/usecase/student/getAllStudentUseCase';

export default class GetAllStudentService {
  constructor(readonly studentRepository: StudentRepository) {}

  execute(): Either<Error, Student[]> {
    const getAllStudentUseCase = new GetAllStudentUseCase(this.studentRepository);

    return getAllStudentUseCase.execute();
  }
}
