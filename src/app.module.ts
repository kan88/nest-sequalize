import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { ProfilesModule } from './profiles/profiles.module';
import { SequelizeModule } from '@nestjs/sequelize';
import { Profile } from './profiles/profiles.model';
import { RolesModule } from './roles/roles.module';
import { Role } from './roles/roles.model';
import { ProfileRole } from './roles/model/profile-role.model';

@Module({
  imports: [
    ConfigModule.forRoot({ envFilePath: `.${process.env.NODE_ENV}.env` }),
    SequelizeModule.forRoot({
      dialect: 'postgres',
      host: process.env.POSTGRES_HOST,
      port: Number(process.env.POSTGRES_PORT),
      username: process.env.POSTGRES_USER,
      password: process.env.POSTGRES_PASSWORD,
      database: process.env.POSTGRES_DB,
      models: [Profile, Role, ProfileRole],
      autoLoadModels: true,
    }),
    ProfilesModule,
    RolesModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
