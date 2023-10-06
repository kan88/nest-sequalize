import { ApiProperty } from '@nestjs/swagger';
import {
  BelongsTo,
  Column,
  DataType,
  ForeignKey,
  Index,
  Model,
  Table,
} from 'sequelize-typescript';
import { Profile } from 'src/0084-profiles/profiles.model';

interface I_DOCUMENT_CREATE {
  profile_id: number;
  name: string;
  serial: string;
  number: string;
  date_off_issue: Date;
  division_code: string;
  issued_by: string;
}

@Table({ tableName: '0084-documents' })
export class Document extends Model<Document, I_DOCUMENT_CREATE> {
  @ApiProperty({ example: 111, description: 'Уникальный идентификатор' })
  @Column({
    type: DataType.INTEGER,
    unique: true,
    autoIncrement: true,
    primaryKey: true,
  })
  id: number;

  @BelongsTo(() => Profile)
  profile: Profile;
  @ApiProperty({
    example: 12,
    description: 'Внешний ключ id из таблицы профилей',
  })
  @Index
  @ForeignKey(() => Profile)
  @Column({
    type: DataType.INTEGER,
    allowNull: false,
  })
  profile_id: number;

  @ApiProperty({
    example: 'Паспорт',
    description: 'Тип документа',
  })
  @Column({
    type: DataType.STRING(255),
    allowNull: false,
  })
  name: string;

  @ApiProperty({
    example: '12ss1',
    description: 'Серия',
  })
  @Column({
    type: DataType.STRING(255),
  })
  serial: string;
  @ApiProperty({
    example: '1212aas',
    description: 'Номер',
  })
  @Column({
    type: DataType.STRING(255),
    allowNull: false,
  })
  number: string;

  @ApiProperty({
    example: '2020-12-31',
    description: 'дата выдачи',
  })
  @Column({
    type: DataType.DATEONLY,
  })
  date_off_issue: Date;

  @ApiProperty({
    example: '020-021',
    description: 'Код подразделения',
  })
  @Column({
    type: DataType.STRING(255),
  })
  division_code: string;

  @ApiProperty({
    example: 'УФНС по г Москве',
    description: 'Выдан',
  })
  @Column({
    type: DataType.STRING(500),
  })
  issued_by: string;

  @ApiProperty({
    example: true,
    description: 'Видимость',
  })
  @Column({
    type: DataType.BOOLEAN,
    allowNull: false,
    defaultValue: true,
  })
  visible: boolean;

  @ApiProperty({
    example: true,
    description: 'True действительный документ, false удаленный',
  })
  @Column({
    type: DataType.BOOLEAN,

    allowNull: false,
    defaultValue: true,
  })
  status: boolean;
}
