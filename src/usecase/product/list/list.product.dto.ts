export interface InputListProductDto {}

type ProductType = {
  id: string;
  name: string;
  price: number;
};

export interface OutputListProductDto {
  products: ProductType[];
}
