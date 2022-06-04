import { Either, Left, Right } from '../../../../shared/util/either';
import Student from '../../entity/student';
import StudentRepository from '../../port/studentRepository';

export default class UpdateStudentUseCase {
  constructor(readonly studentRepository: StudentRepository) {}

  execute(student: Student): Either<Error, void> {
    try {
      this.studentRepository.update(student);
      return Right(undefined);
    } catch (error: any) {
      return Left(Error(error.message));
    }
  }
}
