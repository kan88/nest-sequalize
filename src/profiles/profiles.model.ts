import { Column, DataType, Model, Table } from 'sequelize-typescript';

type TYPE_PROFILE_CREATE = {
  sammaccountname: string;
};

@Table({ tableName: 'profiles' })
export class Profile extends Model<Profile, TYPE_PROFILE_CREATE> {
  @Column({
    type: DataType.NUMBER,
    unique: true,
    autoIncrement: true,
    primaryKey: true,
  })
  id: number;

  @Column({
    type: DataType.STRING,
    unique: true,
    allowNull: false,
  })
  sammaccountname: string;

  @Column({
    type: DataType.STRING,
    unique: true,
    allowNull: true,
  })
  email: string;

  @Column({
    type: DataType.STRING,
    unique: true,
    allowNull: true,
  })
  mobile: string;

  @Column({
    type: DataType.DATE,
    allowNull: true,
  })
  birthday: string;

  @Column({
    type: DataType.STRING,
    allowNull: true,
  })
  birthplace: string;

  @Column({
    type: DataType.BOOLEAN,
    allowNull: true,
    defaultValue: true,
  })
  visible: boolean;
}
