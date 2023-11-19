import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { ProfilesModule } from './0084-profiles/profiles.module';
import { SequelizeModule } from '@nestjs/sequelize';
import { RolesModule } from './0000-roles/administrator.module';
import { Role } from './0000-roles/administrator.model';
import { Profile } from './0084-profiles/profiles.model';
import { FilesModule } from './9999-files/files.module';
import { Vacancy } from './0005-vacancies/vacancy.model';
import { VacancyModule } from './0005-vacancies/vacancy.module';
import { ReviewModule } from './0008-reviews/review.module';
import { News } from './0002-news/news.model';
import { NewsModule } from './0002-news/news.module';
import { Alert } from './0085-alert/alert.model';
import { AlertsModule } from './0085-alert/alert.module';
import { Notification } from './0011-notification/notification.model';
import { NotificationsModule } from './0011-notification/notification.module';
import { StatisticsModule } from './0013-statistics/statistics.module';
import { User } from './9999-users/user.model';
import { UserModule } from './9999-users/user.module';
import { PhoneModule } from './0009-phone/phone.module';
import { Statistic } from './0013-statistics/statistics.model';
import { Project } from './0084-profiles/0084-projects/projects.model';
import { Education } from './0084-profiles/0084-education/education.model';
import { Work } from './0084-profiles/0084-works/works.model';
import { Achievement } from './0084-profiles/0084-achievements/achievements.model';
import { Transport as Transports } from './0084-profiles/0084-transports/transports.model';
import { Avatar } from './0084-profiles/0084-avatars/avatars.model';
import { Participant } from './0005-vacancies/0005-participants/participant.model';
import { Address } from './0005-vacancies/0005-addresses/address.model';
import { Schedule } from './0005-vacancies/0005-schedules/schedule.model';
import { Review } from './0008-reviews/review.model';
import { Like } from './0002-news/0002-likes/likes.model';
import { Photo } from './0002-news/0002-photos/photos.model';
import { Participant0011 } from './0011-notification/0011-participants/participant.model';
import { Message } from './0011-notification/0011-messages/message.model';
import { Visit } from './0013-statistics/0013-visits/visits.model';
import { Document } from './0084-profiles/0084-documents/documents.model';
import { Comment } from './0008-reviews/0008-comments/comments.model';
import { ProjectsModule } from './0084-profiles/0084-projects/projects.module';
import { DocumentsModule } from './0084-profiles/0084-documents/documents.module';
import { EducationModule } from './0084-profiles/0084-education/education.module';
import { WorksModule } from './0084-profiles/0084-works/works.module';
import { AchievementsModule } from './0084-profiles/0084-achievements/achievements.module';
import { TransportsModule } from './0084-profiles/0084-transports/transports.module';
import { AvatarsModule } from './0084-profiles/0084-avatars/avatars.module';
import { ParticipantModule } from './0005-vacancies/0005-participants/participant.module';
import { AddressModule } from './0005-vacancies/0005-addresses/address.module';
import { ScheduleModule } from './0005-vacancies/0005-schedules/schedule.module';
import { CommentsModule } from './0008-reviews/0008-comments/comments.module';
import { LikesModule } from './0002-news/0002-likes/likes.module';
import { PhotosModule } from './0002-news/0002-photos/photos.module';
import { ParticipantModule0011 } from './0011-notification/0011-participants/participant.module';
import { MessageModule } from './0011-notification/0011-messages/message.module';
import { VisitsModule } from './0013-statistics/0013-visits/visits.module';
import { WeekendsModule } from './0001-weekend/weekend.module';
import { Weekend } from './0001-weekend/weekend.model';
import { Candidate } from './0005-vacancies/0005-candidates/candidate.model';
import { CandidateModule } from './0005-vacancies/0005-candidates/candidate.module';
import { CacheModule, CacheStore } from '@nestjs/cache-manager';
import * as redisStore from 'cache-manager-redis-store';
@Module({
  imports: [
    ConfigModule.forRoot({ envFilePath: `.${process.env.NODE_ENV}.env` }),
    CacheModule.register({
      isGlobal: true,
      useFactory: async () => ({
        store: redisStore as unknown as CacheStore,
        host: 'localhost',
        port: 6379,
      }),
    }),
    SequelizeModule.forRoot({
      dialect: 'postgres',
      host: process.env.POSTGRES_HOST,
      port: Number(process.env.POSTGRES_PORT),
      username: process.env.POSTGRES_USER,
      password: process.env.POSTGRES_PASSWORD,
      database: process.env.POSTGRES_DB,
      models: [
        Profile,
        Role,
        Project,
        Document,
        Education,
        Work,
        Achievement,
        Transports,
        Avatar,
        Vacancy,
        Participant,
        Address,
        Schedule,
        Comment,
        Review,
        News,
        Like,
        Photo,
        Notification,
        Alert,
        Participant0011,
        Message,
        Statistic,
        Visit,
        User,
        Weekend,
        Candidate,
      ],
      autoLoadModels: true,
      synchronize: true,
    }),

    ProfilesModule,
    RolesModule,
    ProjectsModule,
    DocumentsModule,
    EducationModule,
    WorksModule,
    AchievementsModule,
    TransportsModule,
    AvatarsModule,
    FilesModule,
    VacancyModule,
    ParticipantModule,
    AddressModule,
    ScheduleModule,
    CommentsModule,
    ReviewModule,
    NewsModule,
    LikesModule,
    PhotosModule,
    NotificationsModule,
    AlertsModule,
    ParticipantModule0011,
    MessageModule,
    StatisticsModule,
    VisitsModule,
    UserModule,
    PhoneModule,
    WeekendsModule,
    CandidateModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
