import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { BaseRepository } from 'src/_common/generics/repository.abstract';
import { Category, CategoryDocument } from './models/category.schema';

@Injectable()
export class CategoryRepository extends BaseRepository<Category> {
  constructor(
    @InjectModel(Category.name) private categorySchema: Model<CategoryDocument>,
  ) {
    super(categorySchema);
  }
}
