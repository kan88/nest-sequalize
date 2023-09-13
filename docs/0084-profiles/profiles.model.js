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
exports.Profile = void 0;
const swagger_1 = require("@nestjs/swagger");
const sequelize_typescript_1 = require("sequelize-typescript");
const documents_model_1 = require("../0084-documents/documents.model");
const projects_model_1 = require("../0084-projects/projects.model");
let Profile = class Profile extends sequelize_typescript_1.Model {
};
exports.Profile = Profile;
__decorate([
    (0, swagger_1.ApiProperty)({ example: 111, description: 'Уникальный идентификатор' }),
    (0, sequelize_typescript_1.Column)({
        type: sequelize_typescript_1.DataType.INTEGER,
        unique: true,
        autoIncrement: true,
        primaryKey: true,
    }),
    __metadata("design:type", Number)
], Profile.prototype, "id", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: 'n7700-01-144', description: 'Учетная запись' }),
    (0, sequelize_typescript_1.Column)({
        type: sequelize_typescript_1.DataType.STRING,
        unique: true,
        allowNull: false,
    }),
    __metadata("design:type", String)
], Profile.prototype, "samaccountname", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        example: 'yandex@yandex.ru',
        description: 'дополнительная почта',
    }),
    (0, sequelize_typescript_1.Column)({
        type: sequelize_typescript_1.DataType.STRING,
        unique: true,
        allowNull: true,
    }),
    __metadata("design:type", String)
], Profile.prototype, "email", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: '89167929687', description: 'Мобильный номер' }),
    (0, sequelize_typescript_1.Column)({
        type: sequelize_typescript_1.DataType.STRING,
        unique: true,
        allowNull: true,
    }),
    __metadata("design:type", String)
], Profile.prototype, "mobile", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: '21.09.78', description: 'Дата рождения' }),
    (0, sequelize_typescript_1.Column)({
        type: sequelize_typescript_1.DataType.DATEONLY,
        allowNull: true,
    }),
    __metadata("design:type", Date)
], Profile.prototype, "birthday", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: 'Москва', description: 'Место рождения' }),
    (0, sequelize_typescript_1.Column)({
        type: sequelize_typescript_1.DataType.STRING,
        allowNull: true,
    }),
    __metadata("design:type", String)
], Profile.prototype, "birthplace", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        example: true,
        description: 'Видимость личной информации для всех',
    }),
    (0, sequelize_typescript_1.Column)({
        type: sequelize_typescript_1.DataType.BOOLEAN,
        allowNull: true,
        defaultValue: true,
    }),
    __metadata("design:type", Boolean)
], Profile.prototype, "visible", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        example: true,
        description: 'Видимость года рождения',
    }),
    (0, sequelize_typescript_1.Column)({
        type: sequelize_typescript_1.DataType.BOOLEAN,
    }),
    __metadata("design:type", Boolean)
], Profile.prototype, "visible_year", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ type: () => [projects_model_1.Project] }),
    (0, sequelize_typescript_1.HasMany)(() => projects_model_1.Project),
    __metadata("design:type", Array)
], Profile.prototype, "projects", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ type: () => [documents_model_1.Document] }),
    (0, sequelize_typescript_1.HasMany)(() => documents_model_1.Document),
    __metadata("design:type", Array)
], Profile.prototype, "documents", void 0);
exports.Profile = Profile = __decorate([
    (0, sequelize_typescript_1.Table)({ tableName: '0084-profiles' })
], Profile);
//# sourceMappingURL=profiles.model.js.map