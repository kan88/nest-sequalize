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
exports.AdministratorController = void 0;
const common_1 = require("@nestjs/common");
const swagger_1 = require("@nestjs/swagger");
const administrator_service_1 = require("./administrator.service");
const administrator_model_1 = require("./administrator.model");
const platform_express_1 = require("@nestjs/platform-express");
const create_role_database_dto_1 = require("./dto/create-role-database.dto");
const change_role_formdata_dto_1 = require("./dto/change-role-formdata.dto");
const decline_role_formdata_dto_1 = require("./dto/decline-role-formdata.dto");
let AdministratorController = class AdministratorController {
    constructor(rolesService) {
        this.rolesService = rolesService;
    }
    async createRole(dto) {
        const role = await this.rolesService.createRole({
            ...dto,
            administrator_service: +dto.administrator_service,
            administrator_role: +dto.administrator_role,
        });
        console.log(role);
        return role;
    }
    async getRolesBySamaccountname(samaccountname) {
        const roles = await this.rolesService.getRolesBySamaccountname(samaccountname);
        return roles;
    }
    async getRolesBySamaccountnameByService(samaccountname, service) {
        const roles = await this.rolesService.getRolesBySamaccountnameByService(samaccountname, Number(service));
        return roles;
    }
    async getRolesBySamaccountnameByStatus(samaccountname, status) {
        const roles = await this.rolesService.getRolesBySamaccountnameByStatus(samaccountname, Number(status));
        return roles;
    }
    async changeRole(dto, id) {
        const result = `${dto.administrator_cn} одобрил запрос`;
        const role = await this.rolesService.changeRole({
            ...dto,
            administrator_reject: result,
            administrator_status: 1,
        }, +id);
        return role;
    }
    async declineRole(dto, id) {
        const result = `${dto.administrator_cn} отклонил по причине: ${dto.administrator_reject}`;
        const role = await this.rolesService.changeRole({
            ...dto,
            administrator_reject: result,
            administrator_status: 2,
        }, +id);
        return role;
    }
    async getRequests(filter_status, samaccountname) {
        const filter = filter_status ? filter_status : [9];
        const superAdmin = await this.rolesService.getSuperAdminRoleBySamaccountname(samaccountname);
        if (superAdmin) {
            const requestsAll = await this.rolesService.getAllRequsts(filter);
            return requestsAll;
        }
        else {
            const filteredData = [];
            const rolesFull = await this.rolesService.getFullRolesBySamaccountname(samaccountname);
            for (let i = 0; i < rolesFull.length; i++) {
                const requestsByServiceBySonoFiltered = await this.rolesService.getFilteredRequestsByServiceBySono(filter, rolesFull[i].administrator_visible_sono);
                for (let i = 0; i < requestsByServiceBySonoFiltered.length; i++) {
                    if (!filteredData.some((arr) => arr.administrator_id ===
                        requestsByServiceBySonoFiltered[i].administrator_id)) {
                        filteredData.push(requestsByServiceBySonoFiltered[i]);
                    }
                }
            }
            return filteredData;
        }
    }
};
exports.AdministratorController = AdministratorController;
__decorate([
    (0, swagger_1.ApiConsumes)('multipart/form-data'),
    (0, swagger_1.ApiBody)({
        schema: {
            type: 'object',
            properties: {
                administrator_cn: { type: 'string' },
                administrator_samaccountname: { type: 'string' },
                administrator_company: { type: 'string' },
                administrator_department: { type: 'string' },
                administrator_title: { type: 'string' },
                administrator_service: { type: 'string' },
                administrator_role: { type: 'string' },
                administrator_sono: { type: 'string' },
                administrator_comments: { type: 'string' },
                administrator_visible_sono: { type: 'string[]' },
                administrator_telephone_number: { type: 'string' },
                administrator_mobile_number: { type: 'string | null' },
                administrator_mail: { type: 'string' },
                administrator_author_samaccountname: { type: 'string' },
                administrator_author_cn: { type: 'string' },
                administrator_author_title: { type: 'string' },
                administrator_author_department: { type: 'string' },
                administrator_author_company: { type: 'string' },
                administrator_author_telephone_number: { type: 'string' },
                administrator_author_mail: { type: 'string' },
                administrator_author_sono: { type: 'string' },
            },
        },
    }),
    (0, swagger_1.ApiOperation)({ summary: 'Создание роли пользователя' }),
    (0, swagger_1.ApiResponse)({ status: common_1.HttpStatus.CREATED, type: administrator_model_1.Role }),
    (0, common_1.UseInterceptors)((0, platform_express_1.NoFilesInterceptor)()),
    (0, common_1.Post)('/'),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [create_role_database_dto_1.CreateRoleDatabaseDto]),
    __metadata("design:returntype", Promise)
], AdministratorController.prototype, "createRole", null);
__decorate([
    (0, swagger_1.ApiOperation)({ summary: 'Получение ролей пользователя по учетной записи' }),
    (0, swagger_1.ApiResponse)({ status: common_1.HttpStatus.OK, type: [administrator_model_1.Role] }),
    (0, common_1.Get)('/:samaccountname'),
    __param(0, (0, common_1.Param)('samaccountname')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], AdministratorController.prototype, "getRolesBySamaccountname", null);
__decorate([
    (0, swagger_1.ApiOperation)({
        summary: 'Получение ролей пользователя по учетной записи и сервису',
    }),
    (0, swagger_1.ApiResponse)({ status: common_1.HttpStatus.OK, type: [administrator_model_1.Role] }),
    (0, common_1.Get)('/:samaccountname/service/:service'),
    __param(0, (0, common_1.Param)('samaccountname')),
    __param(1, (0, common_1.Param)('service')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String]),
    __metadata("design:returntype", Promise)
], AdministratorController.prototype, "getRolesBySamaccountnameByService", null);
__decorate([
    (0, swagger_1.ApiOperation)({
        summary: 'Получение ролей пользователя по учетной записи и статусу',
    }),
    (0, swagger_1.ApiResponse)({ status: common_1.HttpStatus.OK, type: [administrator_model_1.Role] }),
    (0, common_1.Get)('/:samaccountname/status/:status'),
    __param(0, (0, common_1.Param)('samaccountname')),
    __param(1, (0, common_1.Param)('status')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String]),
    __metadata("design:returntype", Promise)
], AdministratorController.prototype, "getRolesBySamaccountnameByStatus", null);
__decorate([
    (0, swagger_1.ApiConsumes)('multipart/form-data'),
    (0, swagger_1.ApiBody)({
        schema: {
            type: 'object',
            properties: {
                administrator_cn: { type: 'string' },
            },
        },
    }),
    (0, swagger_1.ApiOperation)({ summary: 'Подтверждение роли' }),
    (0, swagger_1.ApiResponse)({ status: common_1.HttpStatus.OK, type: administrator_model_1.Role }),
    (0, common_1.UseInterceptors)((0, platform_express_1.NoFilesInterceptor)()),
    (0, common_1.Patch)('/:id'),
    __param(0, (0, common_1.Body)()),
    __param(1, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [change_role_formdata_dto_1.ChangeRoleFormdataDto, String]),
    __metadata("design:returntype", Promise)
], AdministratorController.prototype, "changeRole", null);
__decorate([
    (0, swagger_1.ApiConsumes)('multipart/form-data'),
    (0, swagger_1.ApiBody)({
        schema: {
            type: 'object',
            properties: {
                administrator_cn: { type: 'string' },
                administrator_reject: { type: 'string' },
            },
        },
    }),
    (0, swagger_1.ApiOperation)({ summary: 'Отклонение заявки' }),
    (0, swagger_1.ApiResponse)({ status: common_1.HttpStatus.OK, type: administrator_model_1.Role }),
    (0, common_1.UseInterceptors)((0, platform_express_1.NoFilesInterceptor)()),
    (0, common_1.Delete)('/:id'),
    __param(0, (0, common_1.Body)()),
    __param(1, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [decline_role_formdata_dto_1.DeclineRoleFormdataDto, String]),
    __metadata("design:returntype", Promise)
], AdministratorController.prototype, "declineRole", null);
__decorate([
    (0, swagger_1.ApiOperation)({ summary: 'Получение отфильтрованных заявок' }),
    (0, swagger_1.ApiResponse)({ status: common_1.HttpStatus.OK, type: [administrator_model_1.Role] }),
    (0, common_1.UseInterceptors)((0, platform_express_1.NoFilesInterceptor)()),
    (0, common_1.Get)('/:samaccountname/search'),
    __param(0, (0, common_1.Query)('filter_status', new common_1.ParseArrayPipe({ items: Number, separator: ',' }))),
    __param(1, (0, common_1.Param)('samaccountname')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Array, String]),
    __metadata("design:returntype", Promise)
], AdministratorController.prototype, "getRequests", null);
exports.AdministratorController = AdministratorController = __decorate([
    (0, swagger_1.ApiTags)('Роли пользователей'),
    (0, common_1.Controller)('administrator'),
    __metadata("design:paramtypes", [administrator_service_1.AdministratorService])
], AdministratorController);
//# sourceMappingURL=administrator.controller.js.map