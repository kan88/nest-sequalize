"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ProfilesController = void 0;
const common_1 = require("@nestjs/common");
const profiles_service_1 = require("./profiles.service");
const swagger_1 = require("@nestjs/swagger");
const profiles_model_1 = require("./profiles.model");
const projects_service_1 = require("../0084-projects/projects.service");
const create_project_dto_1 = require("../0084-projects/dto/create-project.dto");
const projects_model_1 = require("../0084-projects/projects.model");
const update_profile_dto_1 = require("./dto/update-profile.dto");
const documents_service_1 = require("../0084-documents/documents.service");
const create_update_document_dto_1 = require("../0084-documents/dto/create-update-document.dto");
const documents_model_1 = require("../0084-documents/documents.model");
const update_visible_document_dto_1 = require("../0084-documents/dto/update-visible-document.dto");
let ProfilesController = class ProfilesController {
    constructor(profilesService, projectsService, documentsService) {
        this.profilesService = profilesService;
        this.projectsService = projectsService;
        this.documentsService = documentsService;
    }
    async getProfileOrCreateBySamaccountname(samaccountname) {
        const profile = await this.profilesService.getProfileOrCreateBySamaccountname(samaccountname);
        return profile;
    }
    async updateProfileBySamaccountname(samaccountname, dto) {
        const profile = await this.profilesService.updateProfileBySamaccountname(dto, samaccountname);
        return profile;
    }
    async createProject(dto) {
        const project = this.projectsService.createProject(dto);
        return project;
    }
    async deleteProject(id) {
        const project = await this.projectsService.deleteProject(Number(id), {
            status: false,
        });
        return project;
    }
    async createDocument(dto) {
        const document = this.documentsService.createDocument(dto);
        return document;
    }
    async updateVisibleDocuments(dto) {
        const document = this.documentsService.updateVisible(dto);
        return document;
    }
    async updateDocument(dto, id) {
        const document = this.documentsService.updateDocument(Number(id), dto);
        return document;
    }
    async deleteDocument(id) {
        const project = await this.documentsService.deleteDocument(Number(id), {
            status: false,
        });
        return project;
    }
};
exports.ProfilesController = ProfilesController;
__decorate([
    (0, swagger_1.ApiOperation)({ summary: 'Получение или создание пользователя' }),
    (0, swagger_1.ApiResponse)({ status: 200, type: profiles_model_1.Profile }),
    (0, common_1.Get)(':samaccountname'),
    __param(0, (0, common_1.Param)('samaccountname')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], ProfilesController.prototype, "getProfileOrCreateBySamaccountname", null);
__decorate([
    (0, swagger_1.ApiOperation)({ summary: 'Обновление пользователя' }),
    (0, swagger_1.ApiResponse)({ status: 200, type: profiles_model_1.Profile }),
    (0, common_1.Patch)(':samaccountname'),
    __param(0, (0, common_1.Param)('samaccountname')),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, update_profile_dto_1.UpdateProfileDto]),
    __metadata("design:returntype", Promise)
], ProfilesController.prototype, "updateProfileBySamaccountname", null);
__decorate([
    (0, swagger_1.ApiOperation)({ summary: 'Создание проекта' }),
    (0, swagger_1.ApiResponse)({ status: 201, type: projects_model_1.Project }),
    (0, common_1.Post)(':samaccountname/projects/'),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [create_project_dto_1.CreateProjectDto]),
    __metadata("design:returntype", Promise)
], ProfilesController.prototype, "createProject", null);
__decorate([
    (0, swagger_1.ApiOperation)({ summary: 'Удаление проекта' }),
    (0, swagger_1.ApiResponse)({ status: 200, type: projects_model_1.Project }),
    (0, common_1.Delete)(':samaccountname/projects/:id'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], ProfilesController.prototype, "deleteProject", null);
__decorate([
    (0, swagger_1.ApiOperation)({ summary: 'Создание документа' }),
    (0, swagger_1.ApiResponse)({ status: 201, type: documents_model_1.Document }),
    (0, common_1.Post)(':samaccountname/documents/'),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [create_update_document_dto_1.CreateUpdateDocumentDto]),
    __metadata("design:returntype", Promise)
], ProfilesController.prototype, "createDocument", null);
__decorate([
    (0, swagger_1.ApiOperation)({ summary: 'Изменение видимости блока документов' }),
    (0, swagger_1.ApiResponse)({ status: 200, type: documents_model_1.Document }),
    (0, common_1.Patch)(':samaccountname/documents/'),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [update_visible_document_dto_1.UpdateVisibleDocumentDto]),
    __metadata("design:returntype", Promise)
], ProfilesController.prototype, "updateVisibleDocuments", null);
__decorate([
    (0, swagger_1.ApiOperation)({ summary: 'Изменение документа' }),
    (0, swagger_1.ApiResponse)({ status: 200, type: documents_model_1.Document }),
    (0, common_1.Patch)(':samaccountname/documents/:id'),
    __param(0, (0, common_1.Body)()),
    __param(1, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [create_update_document_dto_1.CreateUpdateDocumentDto, String]),
    __metadata("design:returntype", Promise)
], ProfilesController.prototype, "updateDocument", null);
__decorate([
    (0, swagger_1.ApiOperation)({ summary: 'Удаление документа' }),
    (0, swagger_1.ApiResponse)({ status: 200, type: documents_model_1.Document }),
    (0, common_1.Delete)(':samaccountname/documents/:id'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], ProfilesController.prototype, "deleteDocument", null);
exports.ProfilesController = ProfilesController = __decorate([
    (0, swagger_1.ApiTags)('Профили пользователей'),
    (0, common_1.Controller)('profile'),
    __metadata("design:paramtypes", [profiles_service_1.ProfilesService,
        projects_service_1.ProjectsService,
        documents_service_1.DocumentsService])
], ProfilesController);
//# sourceMappingURL=profiles.controller.js.map