export interface InputFindCutomerDto {
  id: string;
}

export interface OutputFindCustomerDto {
  id: string;
  name: string;
  address: {
    street: string;
    city: string;
    number: number;
    zip: string;
  };
}
