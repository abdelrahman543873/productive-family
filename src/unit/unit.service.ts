import { Injectable } from '@nestjs/common';
import { UnitRepository } from './unit.repository';
@Injectable()
export class UnitService {
  constructor(private readonly unitRepo: UnitRepository) {}
}
