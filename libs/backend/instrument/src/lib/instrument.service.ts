import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Instrument, InstrumentDocument } from './instrument.schema';
import { CreateInstrumentDto, UpdateInstrumentDto } from '@avans-nx-workshop/backend/dto';

@Injectable()
export class InstrumentService {
  constructor(@InjectModel(Instrument.name) private instrumentModel: Model<InstrumentDocument>) {}

  async getAllInstruments(): Promise<Instrument[]> {
    return this.instrumentModel.find().exec();
  }

  async getInstrumentById(id: string): Promise<Instrument> {
    const instrument = await this.instrumentModel.findById(id).exec();
    if (!instrument) {
      throw new NotFoundException(`Instrument with ID ${id} not found`);
    }
    return instrument;
  }

  async createInstrument(createInstrumentDto: CreateInstrumentDto): Promise<Instrument> {
    const newInstrument = new this.instrumentModel(createInstrumentDto);
    return newInstrument.save();
  }

  async updateInstrument(id: string, updateInstrumentDto: UpdateInstrumentDto): Promise<Instrument> {
    const existingInstrument = await this.instrumentModel.findByIdAndUpdate(id, updateInstrumentDto, { new: true }).exec();
    if (!existingInstrument) {
      throw new NotFoundException(`Instrument with ID ${id} not found`);
    }
    return existingInstrument;
  }

  async deleteInstrument(id: string): Promise<Instrument> {
    const deletedInstrument = await this.instrumentModel.findByIdAndDelete(id).exec();
    if (!deletedInstrument) {
      throw new NotFoundException(`Instrument with ID ${id} not found`);
    }
    return deletedInstrument;
  }
}