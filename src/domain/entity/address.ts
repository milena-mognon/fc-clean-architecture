/**
 * Value Object - apenas um conjunto de propriendades que representa algo para o nosso sistema
 *
 * Depois de criado não é mais possível alterar, a única forma é criar outro.
 *
 * 1. Precisa sempre estar se autovalidando
 * 2. Não tem ID
 * 3. É imutável
 *
 * Existe a possibilidade de mudar de cidade sem alterar os outros valores (rua, numero, cep)?
 *  Não
 *
 *
 */
export class Address {
  _street: string = '';
  _number: number = 0;
  _zip: string = '';
  _city: string = '';

  constructor(street: string, number: number, zip: string, city: string) {
    this._street = street;
    this._number = number;
    this._city = city;
    this._zip = zip;
    this.validate();
  }

  validate() {
    if (this._street.length === 0) {
      throw new Error('Street is required');
    }
    if (this._number === 0) {
      throw new Error('Number is required');
    }
    if (this._zip.length === 0) {
      throw new Error('Zip is required');
    }
    if (this._city.length === 0) {
      throw new Error('City is required');
    }
  }

  toString() {
    return `${this._street}, ${this._number}, ${this._zip} - ${this._city}`;
  }

  get street(): string {
    return this._street;
  }

  get number(): number {
    return this._number;
  }

  get zip(): string {
    return this._zip;
  }

  get city(): string {
    return this._city;
  }
}
