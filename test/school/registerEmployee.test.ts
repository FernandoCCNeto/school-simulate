import RegisterEmployeeUseCase from '../../src/school/domain/usecase/employee/registerEmployeeUseCase';
import EmployeeRepository from '../../src/school/domain/port/employeeRepository';
import EmployeeRepositoryArray from '../../src/school/adapter/repository/employeeRepositoryArray';
import Employee from '../../src/school/domain/entity/employee';
import Email from '../../src/shared/domain/email';
import { isLeft, isRight } from '../../src/shared/util/either';
import Cpf from '../../src/shared/domain/cpf';
import { cpf as cpfGenerator } from 'cpf-cnpj-validator';

describe('Register employee use case', () => {
  let employeeRepository: EmployeeRepository;
  let registerEmployeeUsecase: RegisterEmployeeUseCase;

  beforeEach(() => {
    employeeRepository = new EmployeeRepositoryArray();
    registerEmployeeUsecase = new RegisterEmployeeUseCase(employeeRepository);
  });

  it('should be register a employee', () => {
    const employee = new Employee(
      'Fernando',
      new Email('fernando@email.com'),
      new Date('1991-01-02'),
      new Cpf(cpfGenerator.generate(false)),
    );
    const result = registerEmployeeUsecase.execute(employee);
    expect(isRight(result)).toStrictEqual(true);
    expect(employeeRepository.countByEmail(employee.email.value)).toBe(1);
  });

  it('should not register a employee with e-mail already used', () => {
    employeeRepository.countByEmail = jest.fn().mockReturnValueOnce(1); //i mock this return function just for this test

    const employee = new Employee(
      'Fernando',
      new Email('fernando@email.com'),
      new Date('1991-01-02'),
      new Cpf(cpfGenerator.generate(false)),
    );

    const result = registerEmployeeUsecase.execute(employee);
    expect(isLeft(result)).toStrictEqual(true);
    expect(result.value).toStrictEqual(Error('E-mail already used'));
  });
});
