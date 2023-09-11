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
exports.AdministratorService = void 0;
const common_1 = require("@nestjs/common");
const administrator_model_1 = require("./administrator.model");
const sequelize_1 = require("@nestjs/sequelize");
const sequelize_2 = require("sequelize");
let AdministratorService = class AdministratorService {
    constructor(administratorRepository) {
        this.administratorRepository = administratorRepository;
    }
    async createRole(dto) {
        const role = await this.administratorRepository.create(dto);
        return role;
    }
    async getRolesBySamaccountname(samaaccountname) {
        const roles = await this.administratorRepository.findAll({
            where: {
                [sequelize_2.Op.and]: [
                    { administrator_samaccountname: samaaccountname },
                    { administrator_status: 1 },
                    {
                        administrator_date_start: {
                            [sequelize_2.Op.or]: [
                                {
                                    [sequelize_2.Op.lte]: new Date(),
                                },
                                {
                                    [sequelize_2.Op.eq]: null,
                                },
                            ],
                        },
                    },
                    {
                        administrator_date_end: {
                            [sequelize_2.Op.or]: [
                                {
                                    [sequelize_2.Op.gte]: new Date(),
                                },
                                {
                                    [sequelize_2.Op.eq]: null,
                                },
                            ],
                        },
                    },
                ],
            },
        });
        return roles;
    }
    async getFullRolesBySamaccountname(samaaccountname) {
        const roles = await this.administratorRepository.findAll({
            where: {
                [sequelize_2.Op.and]: [
                    { administrator_samaccountname: samaaccountname },
                    { administrator_status: 1 },
                    { administrator_role: 4 },
                    {
                        administrator_date_start: {
                            [sequelize_2.Op.or]: [
                                {
                                    [sequelize_2.Op.lte]: new Date(),
                                },
                                {
                                    [sequelize_2.Op.eq]: null,
                                },
                            ],
                        },
                    },
                    {
                        administrator_date_end: {
                            [sequelize_2.Op.or]: [
                                {
                                    [sequelize_2.Op.gte]: new Date(),
                                },
                                {
                                    [sequelize_2.Op.eq]: null,
                                },
                            ],
                        },
                    },
                ],
            },
        });
        return roles;
    }
    async getFilteredRequestsByServiceBySono(filter, sono) {
        console.log(filter);
        const requests = await this.administratorRepository.findAll({
            where: {
                [sequelize_2.Op.and]: [
                    { administrator_sono: sono },
                    { administrator_status: filter },
                    {
                        administrator_date_start: {
                            [sequelize_2.Op.or]: [
                                {
                                    [sequelize_2.Op.lte]: new Date(),
                                },
                                {
                                    [sequelize_2.Op.eq]: null,
                                },
                            ],
                        },
                    },
                    {
                        administrator_date_end: {
                            [sequelize_2.Op.or]: [
                                {
                                    [sequelize_2.Op.gte]: new Date(),
                                },
                                {
                                    [sequelize_2.Op.eq]: null,
                                },
                            ],
                        },
                    },
                ],
            },
        });
        return requests;
    }
    async getSuperAdminRoleBySamaccountname(samaaccountname) {
        const roles = await this.administratorRepository.count({
            where: {
                [sequelize_2.Op.and]: [
                    { administrator_samaccountname: samaaccountname },
                    { administrator_status: 1 },
                    { administrator_role: 4 },
                    { administrator_visible_sono: { [sequelize_2.Op.contains]: ['nnnnn'] } },
                    {
                        administrator_date_start: {
                            [sequelize_2.Op.or]: [
                                {
                                    [sequelize_2.Op.lte]: new Date(),
                                },
                                {
                                    [sequelize_2.Op.eq]: null,
                                },
                            ],
                        },
                    },
                    {
                        administrator_date_end: {
                            [sequelize_2.Op.or]: [
                                {
                                    [sequelize_2.Op.gte]: new Date(),
                                },
                                {
                                    [sequelize_2.Op.eq]: null,
                                },
                            ],
                        },
                    },
                ],
            },
        });
        return roles;
    }
    async getRolesBySamaccountnameByService(samaaccountname, service) {
        const roles = await this.administratorRepository.findAll({
            where: {
                [sequelize_2.Op.and]: [
                    { administrator_samaccountname: samaaccountname },
                    { administrator_service: service },
                    { administrator_status: 1 },
                    {
                        administrator_date_start: {
                            [sequelize_2.Op.or]: [
                                {
                                    [sequelize_2.Op.lte]: new Date(),
                                },
                                {
                                    [sequelize_2.Op.eq]: null,
                                },
                            ],
                        },
                    },
                    {
                        administrator_date_end: {
                            [sequelize_2.Op.or]: [
                                {
                                    [sequelize_2.Op.gte]: new Date(),
                                },
                                {
                                    [sequelize_2.Op.eq]: null,
                                },
                            ],
                        },
                    },
                ],
            },
        });
        return roles;
    }
    async getRolesBySamaccountnameByStatus(samaaccountname, status) {
        const roles = await this.administratorRepository.findAll({
            where: {
                administrator_status: status,
                [sequelize_2.Op.or]: [
                    { administrator_samaccountname: samaaccountname },
                    { administrator_author_samaccountname: samaaccountname },
                ],
            },
        });
        return roles;
    }
    async getAllRequsts(filter) {
        const roles = await this.administratorRepository.findAll({
            where: {
                administrator_status: filter,
            },
        });
        return roles;
    }
    async changeRole(dto, id) {
        const role = await this.administratorRepository.update(dto, {
            where: {
                administrator_id: id,
            },
            returning: true,
        });
        return role;
    }
    async declineRole(dto, id) {
        const role = await this.administratorRepository.update(dto, {
            where: {
                administrator_id: id,
            },
            returning: true,
        });
        return role;
    }
};
exports.AdministratorService = AdministratorService;
exports.AdministratorService = AdministratorService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, sequelize_1.InjectModel)(administrator_model_1.Role)),
    __metadata("design:paramtypes", [Object])
], AdministratorService);
//# sourceMappingURL=administrator.service.js.map