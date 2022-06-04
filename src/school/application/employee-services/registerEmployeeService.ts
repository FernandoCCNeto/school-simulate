import Cpf from '../../../shared/domain/cpf';
import Email from '../../../shared/domain/email';
import { Either } from '../../../shared/util/either';
import Employee from '../../domain/entity/employee';
import EmployeeRepository from '../../domain/port/employeeRepository';
import RegisterEmployeeUseCase from '../../domain/usecase/employee/registerEmployeeUseCase';

type RegisterEmployeeRequest = {
  name: string;
  email: string;
  birthday: Date;
  cpf: string;
};

export default class RegisterEmployeeService {
  constructor(readonly employeeRepository: EmployeeRepository) {}

  execute(request: RegisterEmployeeRequest): Either<Error, string> {
    const { name, email, birthday, cpf } = request;

    const employee = new Employee(name, new Email(email), birthday, new Cpf(cpf));

    const registerEmployeeUseCase = new RegisterEmployeeUseCase(this.employeeRepository);
    return registerEmployeeUseCase.execute(employee);
  }
}
