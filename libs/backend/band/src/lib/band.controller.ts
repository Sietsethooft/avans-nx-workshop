import { Controller, Get, Post, Put, Delete, Param, Body } from '@nestjs/common';
import { BandService } from './band.service';
import { Band } from './band.schema';
import { CreateBandDto, UpdateBandDto } from './dto';

@Controller('band')
export class BandController {
  constructor(private readonly bandService: BandService) {}

  @Get()
  async getAllBands(): Promise<Band[]> {
    return this.bandService.getAllBands();
  }

  @Get(':id')
  async getBandById(@Param('id') id: string): Promise<Band> {
    return this.bandService.getBandById(id);
  }

  @Post()
  async createBand(@Body() createBandDto: CreateBandDto): Promise<Band> {
    return this.bandService.createBand(createBandDto);
  }

  @Put(':id')
  async updateBand(@Param('id') id: string, @Body() updateBandDto: UpdateBandDto): Promise<Band> {
    return this.bandService.updateBand(id, updateBandDto);
  }

  @Delete(':id')
  async deleteBand(@Param('id') id: string): Promise<Band> {
    return this.bandService.deleteBand(id);
  }
}