import Cpf from '../../../shared/domain/cpf';

export default class Student {
  constructor(readonly name: string, readonly birthday: Date, readonly cpf: Cpf) {}

  public isYourBitrhdayMonth(date: Date): boolean {
    return date.getMonth() === this.birthday.getMonth();
  }
}
