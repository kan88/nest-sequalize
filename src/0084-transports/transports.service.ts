import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { CreateTransportDto } from './dto/create-transport.dto';
import { DeleteTransportDatabaseDto } from './dto/delete-transport-database.dto';
import { Transport } from './transports.model';
import { UpdateVisibleTransportsDto } from './dto/update-visible-transports.dto';
import { UpdateTransportDto } from './dto/update-transport.dto';
import { CreateTransportDatabaseDto } from './dto/create-transport-database.dto';

@Injectable()
export class TransportsService {
  constructor(
    @InjectModel(Transport) private transportRepository: typeof Transport,
  ) {}
  async createTransport(dto: CreateTransportDatabaseDto) {
    const transport = await this.transportRepository.create(dto);
    return transport;
  }

  async updateTransport(id: number, dto: UpdateTransportDto) {
    const transport = await this.transportRepository.update(dto, {
      where: {
        id,
      },
      returning: true,
    });
    return transport;
  }

  async updateVisible(profile_id: number, dto: UpdateVisibleTransportsDto) {
    const transport = await this.transportRepository.update(dto, {
      where: {
        profile_id,
      },
      returning: true,
    });
    return transport;
  }

  async deleteTransport(id: number, dto: DeleteTransportDatabaseDto) {
    const transport = await this.transportRepository.update(dto, {
      where: {
        id,
      },
      returning: true,
    });
    return transport;
  }
}
