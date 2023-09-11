import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { ProfilesModule } from './0084-profiles/profiles.module';
import { SequelizeModule } from '@nestjs/sequelize';
import { RolesModule } from './0000-roles/administrator.module';
import { Role } from './0000-roles/administrator.model';
import { Profile } from './0084-profiles/profiles.model';
import { 0084ProjectsModule } from './0084-projects/0084-projects.module';

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
      models: [Profile, Role],
      autoLoadModels: true,
      synchronize: true,
    }),
    ProfilesModule,
    RolesModule,
    0084ProjectsModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
