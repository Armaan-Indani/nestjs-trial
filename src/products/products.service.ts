import { Injectable, NotFoundException } from '@nestjs/common';
import { Product } from './product.model';

@Injectable()
export class ProductsService {
  products: Product[] = [];

  insertProduct(title: string, desc: string, price: number) {
    const prodId = new Date().toString();
    const newProduct = new Product(prodId, title, desc, price);
    this.products.push(newProduct);
    return prodId;
  }

  returnAllProducts(): Product[] {
    return [...this.products]; // Return a copy, not a reference to original product list
  }

  getSingleProduct(prodId: string) {
    const product = this.products.find((prod) => prod.id == prodId);
    if (!product) {
      throw new NotFoundException('Product not found');
    }
    return { ...product };
  }

  updateProduct(
    prodId: string,
    prodTitle: string,
    prodDesc: string,
    prodPrice: number,
  ) {
    const product = this.products.find((prod) => prod.id == prodId);
    if (!product) {
      throw new NotFoundException('Product not found');
    }
    if (prodTitle) {
      product.title = prodTitle;
    }
    if (prodDesc) {
      product.description = prodDesc;
    }
    if (prodPrice) {
      product.price = prodPrice;
    }

    return product;
  }

  deleteProduct(prodId: string) {
    const product = this.products.find((prod) => prod.id == prodId);
    if (!product) {
      throw new NotFoundException('Product not found');
    }
    this.products = this.products.filter((prod) => prod.id != prodId);
    return product;
  }
}
