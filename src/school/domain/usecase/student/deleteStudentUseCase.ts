import { Either, Right } from '../../../../shared/util/either';
import StudentRepository from '../../port/studentRepository';

export default class DeleteStudentUseCase {
  constructor(readonly studentRepository: StudentRepository) {}

  execute(cpf: string): Either<Error, void> {
    this.studentRepository.delete(cpf);
    return Right(undefined);
  }
}
