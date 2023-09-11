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
exports.Role = void 0;
const swagger_1 = require("@nestjs/swagger");
const sequelize_1 = require("sequelize");
const sequelize_typescript_1 = require("sequelize-typescript");
let Role = class Role extends sequelize_typescript_1.Model {
};
exports.Role = Role;
__decorate([
    (0, swagger_1.ApiProperty)({ example: 1, description: 'ID' }),
    (0, sequelize_typescript_1.Column)({
        type: sequelize_typescript_1.DataType.INTEGER,
        unique: true,
        autoIncrement: true,
        primaryKey: true,
    }),
    __metadata("design:type", Number)
], Role.prototype, "administrator_id", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: 1, description: 'role user' }),
    (0, sequelize_typescript_1.Column)({
        type: sequelize_typescript_1.DataType.INTEGER,
    }),
    __metadata("design:type", Number)
], Role.prototype, "administrator_role", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: 0, description: 'status role' }),
    (0, sequelize_typescript_1.Column)({
        type: sequelize_typescript_1.DataType.INTEGER,
        defaultValue: 0,
    }),
    __metadata("design:type", Number)
], Role.prototype, "administrator_status", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: 1, description: 'date of request' }),
    (0, sequelize_typescript_1.Column)({
        type: sequelize_typescript_1.DataType.DATEONLY,
        allowNull: true,
        defaultValue: sequelize_1.Sequelize.fn('NOW'),
    }),
    __metadata("design:type", Date)
], Role.prototype, "administrator_date_request", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: 1, description: 'number of service' }),
    (0, sequelize_typescript_1.Column)({
        type: sequelize_typescript_1.DataType.INTEGER,
    }),
    __metadata("design:type", Number)
], Role.prototype, "administrator_service", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: 1, description: 'the beginning of the role' }),
    (0, sequelize_typescript_1.Column)({
        type: sequelize_typescript_1.DataType.DATEONLY,
        allowNull: true,
    }),
    __metadata("design:type", Date)
], Role.prototype, "administrator_date_start", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: 1, description: 'end of role action' }),
    (0, sequelize_typescript_1.Column)({
        type: sequelize_typescript_1.DataType.DATEONLY,
        allowNull: true,
    }),
    __metadata("design:type", Date)
], Role.prototype, "administrator_date_end", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        example: 'Рабочая необходимость',
        description: 'request comments',
    }),
    (0, sequelize_typescript_1.Column)({
        type: sequelize_typescript_1.DataType.STRING(2000),
    }),
    __metadata("design:type", String)
], Role.prototype, "administrator_comments", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        example: 'Согласовано',
        description: 'reject and approve comments',
    }),
    (0, sequelize_typescript_1.Column)({
        type: sequelize_typescript_1.DataType.STRING(2000),
    }),
    __metadata("design:type", String)
], Role.prototype, "administrator_reject", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        example: '8(97)1711',
        description: 'work number user',
    }),
    (0, sequelize_typescript_1.Column)({
        type: sequelize_typescript_1.DataType.STRING(200),
    }),
    __metadata("design:type", String)
], Role.prototype, "administrator_telephone_number", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        example: 'Консультант',
        description: 'title user',
    }),
    (0, sequelize_typescript_1.Column)({
        type: sequelize_typescript_1.DataType.STRING(200),
    }),
    __metadata("design:type", String)
], Role.prototype, "administrator_title", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        example: 'Консультант',
        description: 'title author',
    }),
    (0, sequelize_typescript_1.Column)({
        type: sequelize_typescript_1.DataType.STRING(200),
    }),
    __metadata("design:type", String)
], Role.prototype, "administrator_author_title", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        example: 'АИС',
        description: 'department author',
    }),
    (0, sequelize_typescript_1.Column)({
        type: sequelize_typescript_1.DataType.STRING(200),
    }),
    __metadata("design:type", String)
], Role.prototype, "administrator_author_department", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        example: 'АИС',
        description: 'department user',
    }),
    (0, sequelize_typescript_1.Column)({
        type: sequelize_typescript_1.DataType.STRING(200),
    }),
    __metadata("design:type", String)
], Role.prototype, "administrator_department", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        example: 'ФФКУ Налог Сервис по Москве',
        description: 'company author',
    }),
    (0, sequelize_typescript_1.Column)({
        type: sequelize_typescript_1.DataType.STRING(200),
    }),
    __metadata("design:type", String)
], Role.prototype, "administrator_author_company", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        example: 'ФФКУ Налог Сервис по Москве',
        description: 'company user',
    }),
    (0, sequelize_typescript_1.Column)({
        type: sequelize_typescript_1.DataType.STRING(200),
    }),
    __metadata("design:type", String)
], Role.prototype, "administrator_company", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        example: '8(912)32',
        description: 'work number author',
    }),
    (0, sequelize_typescript_1.Column)({
        type: sequelize_typescript_1.DataType.STRING(200),
    }),
    __metadata("design:type", String)
], Role.prototype, "administrator_author_telephone_number", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        example: 'mail@mail.ru',
        description: 'mail author',
    }),
    (0, sequelize_typescript_1.Column)({
        type: sequelize_typescript_1.DataType.STRING(200),
    }),
    __metadata("design:type", String)
], Role.prototype, "administrator_author_mail", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        example: 'mail@mail.ru',
        description: 'mail user',
    }),
    (0, sequelize_typescript_1.Column)({
        type: sequelize_typescript_1.DataType.STRING(200),
    }),
    __metadata("design:type", String)
], Role.prototype, "administrator_mail", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        example: 'n7700',
        description: 'sono author',
    }),
    (0, sequelize_typescript_1.Column)({
        type: sequelize_typescript_1.DataType.STRING(200),
    }),
    __metadata("design:type", String)
], Role.prototype, "administrator_author_sono", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        example: 'n7700',
        description: 'sono user',
    }),
    (0, sequelize_typescript_1.Column)({
        type: sequelize_typescript_1.DataType.STRING(200),
    }),
    __metadata("design:type", String)
], Role.prototype, "administrator_sono", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        example: ['n7700', 'n7701'],
        description: 'visible sono filter',
    }),
    (0, sequelize_typescript_1.Column)({
        type: sequelize_typescript_1.DataType.ARRAY(sequelize_typescript_1.DataType.STRING(2000)),
    }),
    __metadata("design:type", Array)
], Role.prototype, "administrator_visible_sono", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        example: 'Кан Евгений Сергеевич',
        description: 'fullname user',
    }),
    (0, sequelize_typescript_1.Column)({
        type: sequelize_typescript_1.DataType.STRING(200),
    }),
    __metadata("design:type", String)
], Role.prototype, "administrator_cn", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        example: 'n7700-01144',
        description: 'AD user',
    }),
    (0, sequelize_typescript_1.Column)({
        type: sequelize_typescript_1.DataType.STRING(200),
    }),
    __metadata("design:type", String)
], Role.prototype, "administrator_samaccountname", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        example: 'n7700-01144',
        description: 'AD user author',
    }),
    (0, sequelize_typescript_1.Column)({
        type: sequelize_typescript_1.DataType.STRING(200),
    }),
    __metadata("design:type", String)
], Role.prototype, "administrator_author_samaccountname", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        example: 'Кан Евгений Сергеевич',
        description: 'fullname author',
    }),
    (0, sequelize_typescript_1.Column)({
        type: sequelize_typescript_1.DataType.STRING(200),
    }),
    __metadata("design:type", String)
], Role.prototype, "administrator_author_cn", void 0);
exports.Role = Role = __decorate([
    (0, sequelize_typescript_1.Table)({ tableName: '0000-administrator' })
], Role);
//# sourceMappingURL=administrator.model.js.map