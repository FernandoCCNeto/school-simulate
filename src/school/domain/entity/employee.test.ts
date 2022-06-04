import Cpf from '../../../shared/domain/cpf';
import Email from '../../../shared/domain/email';
import Employee from './employee';
import { cpf as cpfGenerator } from 'cpf-cnpj-validator';

describe('Employee entity', () => {
  describe('isYourBirthdayMonth', () => {
    it('should be your birthday month', () => {
      const employee = new Employee(
        'Fernando',
        new Email('fernando@email.com'),
        new Date('1997-05-05 00:00:00'),
        new Cpf(cpfGenerator.generate(false)),
      );

      expect(employee.isYourBitrhdayMonth(new Date('1997-05-05 00:00:00'))).toBeTruthy();
    });

    it('should not be your birthday month', () => {
      const employee = new Employee(
        'Fernando',
        new Email('fernando@email.com'),
        new Date('1997-01-05 00:00:00'),
        new Cpf(cpfGenerator.generate(false)),
      );

      expect(employee.isYourBitrhdayMonth(new Date('1991-05-05 00:00:00'))).toBeFalsy();
    });
  });
});
