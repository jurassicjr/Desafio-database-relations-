import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
  OneToMany,
} from 'typeorm';

import OrdersProducts from '@modules/orders/infra/typeorm/entities/OrdersProducts';

@Entity({ name: 'products' })
class Product {
  @PrimaryGeneratedColumn()
  id: string;

  @Column()
  name: string;

  @Column({ type: 'decimal', precision: 6, scale: 2 })
  price: number;

  @Column({ type: 'int' })
  quantity: number;

  @OneToMany(() => OrdersProducts, ordersProducts => ordersProducts.product)
  order_products: OrdersProducts[];

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;
}

export default Product;
