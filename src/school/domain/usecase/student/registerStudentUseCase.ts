import { Either, Left, Right } from '../../../../shared/util/either';
import Student from '../../entity/student';
import StudentRepository from '../../port/studentRepository';

export default class RegisterStudentUseCase {
  constructor(readonly studentRepository: StudentRepository) {}

  execute(student: Student): Either<Error, string> {
    const cpfAlreadyUsed = this.studentRepository.checkCpf(student.cpf.value);

    if (cpfAlreadyUsed) return Left(Error('Cpf already exits'));

    const id = this.studentRepository.save(student);
    return Right(id);
  }
}
