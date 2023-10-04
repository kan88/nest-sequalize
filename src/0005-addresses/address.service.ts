import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { Address } from './address.model';
import { CreateAddressDto } from './dto/create-address.dto';
import { UpdateAddressDto } from './dto/update-address.dto';
import { RemoveAddressDto } from './dto/remove-address.dto';

@Injectable()
export class AddressService {
  constructor(
    @InjectModel(Address) private addressRepository: typeof Address,
  ) {}

  async createAddress(dto: CreateAddressDto) {
    const address = await this.addressRepository.create(dto);
    return address;
  }

  async updateAddress(dto: UpdateAddressDto, id: number) {
    const address = await this.addressRepository.update(dto, {
      where: {
        id,
      },
    });
    return address;
  }

  async removeAddress(dto: RemoveAddressDto, id: number) {
    const address = await this.addressRepository.update(dto, {
      where: {
        id,
      },
    });
    return address;
  }
}
