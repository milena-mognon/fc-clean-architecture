import { ProductRepositoryInterface } from '../../../domain/product/repository/product.repository.interface';
import { InputFindProductDto } from './find.product.dto';

export class FindProductUseCase {
  private productRepository: ProductRepositoryInterface;

  constructor(productRepository: ProductRepositoryInterface) {
    this.productRepository = productRepository;
  }

  async execute(input: InputFindProductDto) {
    const result = await this.productRepository.find(input.id);

    return {
      id: result.id,
      name: result.name,
      price: result.price,
    };
  }
}
