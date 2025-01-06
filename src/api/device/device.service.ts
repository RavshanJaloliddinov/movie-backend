import { Injectable } from '@nestjs/common';
import FingerprintJS from '@fingerprintjs/fingerprintjs';
import { CreateDeviceDto } from './dto/create-device.dto';
import { UpdateDeviceDto } from './dto/update-device.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { DeviceEntity } from 'src/core/entity';
import { DeviceRepository } from 'src/core/repository';

@Injectable()
export class DeviceService {

  constructor(
    @InjectRepository(DeviceEntity)
    private readonly deviceRepository: DeviceRepository
  ){}

  create(createDeviceDto: CreateDeviceDto) {
    return this.deviceRepository.create(createDeviceDto)
  }

  findAll() {
    return `This action returns all device`;
  }

  findOne(id: number) {
    return `This action returns a #${id} device`;
  }

  update(id: number, updateDeviceDto: UpdateDeviceDto) {
    return `This action updates a #${id} device`;
  }

  remove(id: number) {
    return `This action removes a #${id} device`;
  }
}
