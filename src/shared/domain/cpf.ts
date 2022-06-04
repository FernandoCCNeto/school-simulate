import { cpf as cpfValidator } from 'cpf-cnpj-validator';

export default class Cpf {
  public value: string;

  constructor(cpf: string) {
    if (cpfValidator.isValid(cpf)) {
      this.value = cpf;
    } else throw Error('Invalid cpf');
  }
}
