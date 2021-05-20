import { Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Model } from "mongoose";
import { BaseRepository } from "src/_common/generics/repository.abstract";
import { Product, ProductDocument } from "./models/product.schema";

@Injectable()
export class ProductRepository extends BaseRepository<Product> {
  constructor(@InjectModel(Product.name) private productSchema: Model<ProductDocument>) {
    super(productSchema);
  }
}
