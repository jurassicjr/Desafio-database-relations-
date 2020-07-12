import {
  Entity,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  JoinColumn,
  PrimaryGeneratedColumn,
  ManyToOne,
  Generated,
} from 'typeorm';

import Order from '@modules/orders/infra/typeorm/entities/Order';
import Product from '@modules/products/infra/typeorm/entities/Product';

@Entity('orders_products')
class OrdersProducts {
  @PrimaryGeneratedColumn()
  @Generated('uuid')
  id: string;

  @ManyToOne(() => Order, order => order.order_products)
  @JoinColumn({ name: 'order_id' })
  order: Order;

  @ManyToOne(() => Order, order => order.order_products)
  @JoinColumn({ name: 'product_id' })
  product: Product;

  @Column()
  product_id: string;

  @Column()
  order_id: string;

  @Column({ scale: 2, precision: 6 })
  price: number;

  @Column({ type: 'int' })
  quantity: number;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;
}

export default OrdersProducts;
