import { Address } from './address';

/**
 * Quando pensamos em motivo para mudança, normalmente estamos pensando em regras de negócio
 * Modelagem do domínio rico expressa o negócio, e não só getters e setters
 *
 * Entidade sempre vai ter que representar o estado correto e atual do elemento
 * Dados devem estar sempre conscistente (Ex. Não existe cliente sem nome)
 *
 * Uma entidade, por padrão, SEMPRE terá que se autovalidar
 *
 * Entidade x ORM
 * Entidade focada em negócio (DDD) x Entidade focada em persistência (ORM)
 * Com DDD terá 2 entidades - uma para as regras de negócio outra para persistência de dados
 *
 * É melhor não chamar a entidade do ORM de Entidade, melhor tratar como model
 *
 * Domain (complexidade de negócio, não tem escolha, o negócio define as regras)
 *  - Entity
 *    - customer.ts (regras de negócio)
 *
 * infra -> mundo externo, complexidade acidental (pode ser tratado de diversas formas)
 *  - Model
 *     - costumer.ts (get, set) -> conforme o ORM
 */
export class Customer {
  _id: string;
  _name: string;
  _address!: Address;
  _active: boolean = true;

  constructor(id: string, name: string) {
    this._id = id;
    this._name = name;
    this.validate(); // garante a validação
  }

  validate() {
    if (this._name.length === 0) {
      throw new Error('Name is required');
    }
    if (this._id.length === 0) {
      throw new Error('id is required');
    }
  }

  /**
   * Semelhante ao set name(), mas muda o objetivo. Aqui é intenção de negócio
   * changeName é regra de negócio, set name() é apenas uma forma de mudar um atributo
   */
  changeName(name: string) {
    this._name = name;
    this.validate();
  }

  activate() {
    if (!this._address) {
      throw new Error('Address is mandatory to activate a customer');
    }
    this._active = true;
  }

  deactivate() {
    this._active = false;
  }

  set address(address: Address) {
    this._address = address;
  }
}
