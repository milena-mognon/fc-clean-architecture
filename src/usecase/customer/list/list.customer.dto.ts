export interface InputListCustomerDto {}

type Custumer = {
  id: string;
  name: string;
  address: {
    street: string;
    city: string;
    number: number;
    zip: string;
  };
};

export interface OutputListCustomerDto {
  customers: Custumer[];
}
