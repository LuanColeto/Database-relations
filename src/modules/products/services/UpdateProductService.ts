import { inject, injectable } from 'tsyringe';
import IProductsRepository from '@modules/products/repositories/IProductsRepository';
import Product from '@modules/products/infra/typeorm/entities/Product';
import AppError from '@shared/errors/AppError';

interface IRequest {
  id: string;
  name: string;
  price: number;
  quantity: number;
}

@injectable()
class UpdateProductService {
  constructor(
    @inject('ProductsRepository')
    private productsRepository: IProductsRepository,
  ) {}

  public async execute({
    id,
    name,
    price,
    quantity,
  }: IRequest): Promise<Product> {
    const product = await this.productsRepository.findById(id);

    if (!product) {
      throw new AppError('Product not found');
    }

    product.name = name;
    product.quantity = quantity;
    product.price = price;

    await this.productsRepository.save(product);

    return product;
  }
}

export default UpdateProductService;
