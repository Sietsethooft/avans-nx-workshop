import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Band, BandDocument } from './band.schema';
import { CreateBandDto, UpdateBandDto } from './dto';

@Injectable()
export class BandService {
  constructor(@InjectModel(Band.name) private bandModel: Model<BandDocument>) {}

  async getAllBands(): Promise<Band[]> {
    return this.bandModel.find().exec();
  }

  async getBandById(id: string): Promise<Band> {
    const band = await this.bandModel.findById(id).exec();
    if (!band) {
      throw new NotFoundException(`Band with ID ${id} not found`);
    }
    return band;
  }

  async createBand(createBandDto: CreateBandDto): Promise<Band> {
    const newBand = new this.bandModel(createBandDto);
    return newBand.save();
  }

  async updateBand(id: string, updateBandDto: UpdateBandDto): Promise<Band> {
    const existingBand = await this.bandModel.findByIdAndUpdate(id, updateBandDto, { new: true }).exec();
    if (!existingBand) {
      throw new NotFoundException(`Band with ID ${id} not found`);
    }
    return existingBand;
  }

  async deleteBand(id: string): Promise<Band> {
    const deletedBand = await this.bandModel.findByIdAndDelete(id).exec();
    if (!deletedBand) {
      throw new NotFoundException(`Band with ID ${id} not found`);
    }
    return deletedBand;
  }
}