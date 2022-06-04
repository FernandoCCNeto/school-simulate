import Student from './student';
import { cpf as cpfGenerator } from 'cpf-cnpj-validator';
import Cpf from '../../../shared/domain/cpf';

describe('Student entity', () => {
  describe('isYourBirthdayMonth', () => {
    it('should be your birthday month', () => {
      const student = new Student(
        'Fernando',
        new Date('1991-05-05 00:00:00'),
        new Cpf(cpfGenerator.generate(false)),
      );

      expect(student.isYourBitrhdayMonth(new Date('1991-05-05 00:00:00'))).toBeTruthy();
    });

    it('should not be your birthday month', () => {
      const student = new Student(
        'Fernando',
        new Date('1991-01-05 00:00:00'),
        new Cpf(cpfGenerator.generate(false)),
      );

      expect(student.isYourBitrhdayMonth(new Date('1991-05-01 00:00:00'))).toBeFalsy();
    });
  });
});
