"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AppModule = void 0;
const common_1 = require("@nestjs/common");
const config_1 = require("@nestjs/config");
const profiles_module_1 = require("./0084-profiles/profiles.module");
const sequelize_1 = require("@nestjs/sequelize");
const administrator_module_1 = require("./0000-roles/administrator.module");
const administrator_model_1 = require("./0000-roles/administrator.model");
const profiles_model_1 = require("./0084-profiles/profiles.model");
const projects_model_1 = require("./0084-projects/projects.model");
const projects_module_1 = require("./0084-projects/projects.module");
const documents_module_1 = require("./0084-documents/documents.module");
const documents_model_1 = require("./0084-documents/documents.model");
const education_model_1 = require("./0084-education/education.model");
const education_module_1 = require("./0084-education/education.module");
const works_module_1 = require("./0084-works/works.module");
const works_model_1 = require("./0084-works/works.model");
const achievements_model_1 = require("./0084-achievements/achievements.model");
const achievements_module_1 = require("./0084-achievements/achievements.module");
let AppModule = class AppModule {
};
exports.AppModule = AppModule;
exports.AppModule = AppModule = __decorate([
    (0, common_1.Module)({
        imports: [
            config_1.ConfigModule.forRoot({ envFilePath: `.${process.env.NODE_ENV}.env` }),
            sequelize_1.SequelizeModule.forRoot({
                dialect: 'postgres',
                host: process.env.POSTGRES_HOST,
                port: Number(process.env.POSTGRES_PORT),
                username: process.env.POSTGRES_USER,
                password: process.env.POSTGRES_PASSWORD,
                database: process.env.POSTGRES_DB,
                models: [profiles_model_1.Profile, administrator_model_1.Role, projects_model_1.Project, documents_model_1.Document, education_model_1.Education, works_model_1.Work, achievements_model_1.Achievement],
                autoLoadModels: true,
                synchronize: true,
            }),
            profiles_module_1.ProfilesModule,
            administrator_module_1.RolesModule,
            projects_module_1.ProjectsModule,
            documents_module_1.DocumentsModule,
            education_module_1.EducationModule,
            works_module_1.WorksModule,
            achievements_module_1.AchievementModule,
        ],
        controllers: [],
        providers: [],
    })
], AppModule);
//# sourceMappingURL=app.module.js.map