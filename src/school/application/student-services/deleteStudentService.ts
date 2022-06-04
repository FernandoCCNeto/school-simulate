import { Either } from '../../../shared/util/either';
import StudentRepository from '../../domain/port/studentRepository';
import DeleteStudentUseCase from '../../domain/usecase/student/deleteStudentUseCase';

type DeleteStudentRequest = {
  cpf: string;
};

export default class DeleteStudentService {
  constructor(readonly studentRepository: StudentRepository) {}

  execute(request: DeleteStudentRequest): Either<Error, void> {
    const { cpf } = request;

    const deleteStudentUseCase = new DeleteStudentUseCase(this.studentRepository);
    return deleteStudentUseCase.execute(cpf);
  }
}
