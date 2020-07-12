import { getRepository, Repository, In } from 'typeorm';

import IProductsRepository from '@modules/products/repositories/IProductsRepository';
import ICreateProductDTO from '@modules/products/dtos/ICreateProductDTO';
import IUpdateProductsQuantityDTO from '@modules/products/dtos/IUpdateProductsQuantityDTO';
import Product from '../entities/Product';

interface IFindProducts {
  id: string;
}

class ProductsRepository implements IProductsRepository {
  private ormRepository: Repository<Product>;

  constructor() {
    this.ormRepository = getRepository(Product);
  }

  public async create({
    name,
    price,
    quantity,
  }: ICreateProductDTO): Promise<Product> {
    const product = this.ormRepository.create({ name, price, quantity });
    return this.ormRepository.save(product);
  }

  public async findByName(name: string): Promise<Product | undefined> {
    const product = await this.ormRepository.findOne({
      where: {
        name,
      },
    });

    return product;
  }

  public async findAllById(products: IFindProducts[]): Promise<Product[]> {
    const productsId = products.map(product => product.id);

    const productsList = await this.ormRepository.find({
      where: {
        id: In(productsId),
      },
    });
    return productsList;
  }

  public async updateQuantity(
    products: IUpdateProductsQuantityDTO[],
  ): Promise<Product[]> {
    products.map(async product => {
      const productWithActualQuantity = await this.ormRepository.findOne(
        product.id,
      );
      if (
        productWithActualQuantity &&
        productWithActualQuantity.quantity >= product.quantity
      ) {
        productWithActualQuantity.quantity -= product.quantity;
        await this.ormRepository.save(productWithActualQuantity);
      }
    });

    const productsUpdated = await this.findAllById(products);

    return productsUpdated;
  }
}

export default ProductsRepository;
