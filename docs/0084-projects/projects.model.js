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
Object.defineProperty(exports, "__esModule", { value: true });
exports.Project = void 0;
const swagger_1 = require("@nestjs/swagger");
const sequelize_typescript_1 = require("sequelize-typescript");
const profiles_model_1 = require("../0084-profiles/profiles.model");
let Project = class Project extends sequelize_typescript_1.Model {
};
exports.Project = Project;
__decorate([
    (0, swagger_1.ApiProperty)({ example: 111, description: 'Уникальный идентификатор' }),
    (0, sequelize_typescript_1.Column)({
        type: sequelize_typescript_1.DataType.INTEGER,
        unique: true,
        autoIncrement: true,
        primaryKey: true,
    }),
    __metadata("design:type", Number)
], Project.prototype, "id", void 0);
__decorate([
    (0, sequelize_typescript_1.BelongsTo)(() => profiles_model_1.Profile),
    __metadata("design:type", profiles_model_1.Profile)
], Project.prototype, "profile", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        example: 12,
        description: 'Внешний ключ id из таблицы профилей',
    }),
    (0, sequelize_typescript_1.ForeignKey)(() => profiles_model_1.Profile),
    (0, sequelize_typescript_1.Column)({
        type: sequelize_typescript_1.DataType.INTEGER,
        allowNull: false,
    }),
    __metadata("design:type", Number)
], Project.prototype, "profile_id", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        example: 'Портал ФКУ Налог-Сервис ФНС России',
        description: 'название проекта',
    }),
    (0, sequelize_typescript_1.Column)({
        type: sequelize_typescript_1.DataType.STRING(1000),
        allowNull: false,
    }),
    __metadata("design:type", String)
], Project.prototype, "project_name", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        example: true,
        description: 'True действительный проект, false удаленный',
    }),
    (0, sequelize_typescript_1.Column)({
        type: sequelize_typescript_1.DataType.BOOLEAN,
        defaultValue: true,
    }),
    __metadata("design:type", Boolean)
], Project.prototype, "status", void 0);
exports.Project = Project = __decorate([
    (0, sequelize_typescript_1.Table)({ tableName: '0084-projects' })
], Project);
//# sourceMappingURL=projects.model.js.map