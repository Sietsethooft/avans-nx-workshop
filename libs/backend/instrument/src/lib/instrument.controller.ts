import { Controller, Get, Post, Put, Delete, Param, Body } from '@nestjs/common';
import { InstrumentService } from './instrument.service';
import { Instrument } from './instrument.schema';
import { CreateInstrumentDto, UpdateInstrumentDto } from '@avans-nx-workshop/backend/dto';

@Controller('instrument')
export class InstrumentController {
  constructor(private readonly instrumentService: InstrumentService) {}

  @Get()
  async getAllInstruments(): Promise<Instrument[]> {
    return this.instrumentService.getAllInstruments();
  }

  @Get(':id')
  async getInstrumentById(@Param('id') id: string): Promise<Instrument> {
    return this.instrumentService.getInstrumentById(id);
  }

  @Post()
  async createInstrument(@Body() createInstrumentDto: CreateInstrumentDto): Promise<Instrument> {
    return this.instrumentService.createInstrument(createInstrumentDto);
  }

  @Put(':id')
  async updateInstrument(@Param('id') id: string, @Body() updateInstrumentDto: UpdateInstrumentDto): Promise<Instrument> {
    return this.instrumentService.updateInstrument(id, updateInstrumentDto);
  }

  @Delete(':id')
  async deleteInstrument(@Param('id') id: string): Promise<Instrument> {
    return this.instrumentService.deleteInstrument(id);
  }
}