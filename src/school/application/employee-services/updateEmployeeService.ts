import Cpf from '../../../shared/domain/cpf';
import Email from '../../../shared/domain/email';
import { Either } from '../../../shared/util/either';
import Employee from '../../domain/entity/employee';
import EmployeeRepository from '../../domain/port/employeeRepository';
import UpdateEmployeeUseCase from '../../domain/usecase/employee/updateEmployeeUseCase';

type UpdateEmployeeRequest = {
  name: string;
  email: string;
  birthday: Date;
  cpf: string;
};

export default class UpdateEmployeeService {
  constructor(readonly employeeRepository: EmployeeRepository) {}

  execute(request: UpdateEmployeeRequest): Either<Error, void> {
    const { name, email, birthday, cpf } = request;

    const employee = new Employee(name, new Email(email), birthday, new Cpf(cpf));

    const updateEmployeeUseCase = new UpdateEmployeeUseCase(this.employeeRepository);
    return updateEmployeeUseCase.execute(employee);
  }
}
