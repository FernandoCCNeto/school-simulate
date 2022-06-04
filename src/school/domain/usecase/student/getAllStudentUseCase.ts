import { Either, Right } from '../../../../shared/util/either';
import Student from '../../entity/student';
import StudentRepository from '../../port/studentRepository';

export default class GetAllStudentUseCase {
  constructor(readonly studentRepository: StudentRepository) {}

  execute(): Either<Error, Student[]> {
    const student = this.studentRepository.getAll();

    return Right(student);
  }
}
