import {
  Controller,
  Get,
  Post,
  Body,
  Put,
  Param,
  Delete,
  Query,
} from '@nestjs/common';
import { EmployerService } from './employer.service';
import { EmployerDto } from './employer.dto';

@Controller('/api/employer')
export class EmployerController {
  constructor(private readonly service: EmployerService) {}

  // --- GET ---
  @Get()
  getAllEmployers() {
    return this.service.findAllOrFail();
  }

  /**
   * Get an employer by id.
   */
  @Get(':id')
  getEmployer(
    @Param('id') id: string,
    @Query('getRelatedEmployees') getRelatedEmployes: boolean,
  ) {
    console.log(id, getRelatedEmployes);
    return this.service.findByIdOrFail(id);
  }

  // --- CREATE ---
  @Post()
  createEmployer(@Body() employer: EmployerDto) {
    return this.service.createOrFail(employer);
  }

  // --- UPDATE ---
  @Put(':id')
  updateEmployer(@Param() params: any, @Body() employer: EmployerDto) {
    console.log(params, params.id);
    return this.service.updateOrFail(params.id, employer);
  }

  // --- DELETE ---
  @Delete(':id')
  deleteEmployer(@Param() params: any) {
    return this.service.delete(params.id);
  }
}
