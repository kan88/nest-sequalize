"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ProfilesModule = void 0;
const common_1 = require("@nestjs/common");
const profiles_controller_1 = require("./profiles.controller");
const profiles_service_1 = require("./profiles.service");
const sequelize_1 = require("@nestjs/sequelize");
const profiles_model_1 = require("./profiles.model");
const projects_module_1 = require("../0084-projects/projects.module");
const projects_model_1 = require("../0084-projects/projects.model");
const documents_module_1 = require("../0084-documents/documents.module");
const documents_model_1 = require("../0084-documents/documents.model");
let ProfilesModule = class ProfilesModule {
};
exports.ProfilesModule = ProfilesModule;
exports.ProfilesModule = ProfilesModule = __decorate([
    (0, common_1.Module)({
        controllers: [profiles_controller_1.ProfilesController],
        providers: [profiles_service_1.ProfilesService],
        imports: [
            sequelize_1.SequelizeModule.forFeature([profiles_model_1.Profile, projects_model_1.Project, documents_model_1.Document]),
            projects_module_1.ProjectsModule,
            documents_module_1.DocumentsModule,
        ],
        exports: [],
    })
], ProfilesModule);
//# sourceMappingURL=profiles.module.js.map