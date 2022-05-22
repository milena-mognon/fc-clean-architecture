/**
 * Uma entidade é unica pois ela tem um ID, mas os outros atributos podem ir mudando com o tempo
 * Entidade Anemica - está apenas guardando dados (getters e setters)
 *
 * Regras de negócio são formas de mudar o comportamneto da entidade
 * aplicando validações, formúlas, qualquer coisa que satisfaça o que o sistema está pedindo
 * (Entidade anêmica não guarda as regras de negócio)
 */
class Customer {
  // exemplo de entidade anêmica
  _id: string;
  _name: string;
  _address: string;

  constructor(id: string, name: string, address: string) {
    this._id = id;
    this._name = name;
    this._address = address;
  }

  get id(): string {
    return this._id;
  }

  get name(): string {
    return this._id;
  }

  get address(): string {
    return this._id;
  }

  set id(id: string) {
    this._id = id;
  }

  set name(name: string) {
    this._name = name;
  }

  set address(address: string) {
    this._address = address;
  }
}
