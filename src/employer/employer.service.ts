import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { Employer } from './employer.entity';
import { EmployerDto } from './employer.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@Injectable()
export class EmployerService {
  constructor(
    @InjectRepository(Employer)
    private readonly repository: Repository<Employer>,
  ) {}

  /** Returns an array of all the Employers. */
  async findAllOrFail(): Promise<Employer[]> {
    // Get all employers.
    const employers: Employer[] = await this.repository.find();

    // If none, throw not found.
    if (employers.length < 1)
      throw new HttpException('not found', HttpStatus.NOT_FOUND);

    return employers;
  }

  /**
   * Returns an Employer by its ID.
   */
  async findByIdOrFail(id: string): Promise<Employer> {
    console.log(id);

    // Find Employer.
    const employer = await this.repository.findOne(id);

    // If not found, throw 404.
    if (!employer) throw new HttpException('not found', HttpStatus.NOT_FOUND);

    return employer;
  }

  /** Saves an Employer to the db and returns it. If vat is duplicate, throws bad request */
  async createOrFail(dto: EmployerDto): Promise<Employer> {
    // If vat is duplicate, throw bad request.
    const duplicate: Employer = await this.repository.findOne({ vat: dto.vat });
    if (duplicate)
      throw new HttpException('not unique', HttpStatus.BAD_REQUEST);

    return await this.repository.save(dto);
  }

  /**
   * Finds and updates an Employer.
   * If the inserted vat is a duplicate (exists on another Employer), throw Error.
   */
  async updateOrFail(id: string, dto: Partial<EmployerDto>): Promise<Employer> {
    // If vat is duplicate, throw bad request.
    if (dto.vat) {
      const duplicate = await this.repository.findOne({ vat: dto.vat });
      if (duplicate && duplicate.id.toString() !== id)
        throw new HttpException('not unique', HttpStatus.BAD_REQUEST);
    }
    // Find Employer to update.
    const employerToUpdate = await this.findByIdOrFail(id);

    // Merge Employer with dto.
    const updated: Employer = { ...employerToUpdate, ...dto };

    // Save to db.
    return await this.repository.save(updated);
  }

  /** Removes an Employer from the db by its ID, and returns the deleted Employer. */
  async delete(id: string): Promise<Employer> {
    const employerToDelete = await this.findByIdOrFail(id);

    return await this.repository.remove(employerToDelete);
  }
}
