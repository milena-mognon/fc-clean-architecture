import { Address } from '../value-object/address';

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
  private _id: string;
  private _name: string;
  private _address!: Address;
  private _active: boolean = true;
  private _rewardPoints: number = 0;

  constructor(id: string, name: string) {
    this._id = id;
    this._name = name;
    this.validate(); // garante a validação
  }

  get id(): string {
    return this._id;
  }

  get name(): string {
    return this._name;
  }

  get address(): Address {
    return this._address;
  }

  get rewardPoints(): number {
    return this._rewardPoints;
  }

  isActive(): boolean {
    return this._active;
  }

  validate() {
    if (this._id.length === 0) {
      throw new Error('Id is required');
    }
    if (this._name.length === 0) {
      throw new Error('Name is required');
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

  changeAddress(address: Address) {
    this._address = address;
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

  addRewardPoints(points: number) {
    this._rewardPoints += points;
  }
}
