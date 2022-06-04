import { Either, Left, Right } from '../../../../shared/util/either';
import Student from '../../entity/student';
import StudentRepository from '../../port/studentRepository';

export default class GetStudentUseCase {
  constructor(readonly studentRepository: StudentRepository) {}

  execute(cpf: string): Either<Error, Student> {
    const student = this.studentRepository.getByCpf(cpf);

    if (!student) return Left(Error('Student not found'));

    return Right(student);
  }
}
