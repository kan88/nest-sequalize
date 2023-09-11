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
exports.UpdateProfileDto = void 0;
const swagger_1 = require("@nestjs/swagger");
class UpdateProfileDto {
}
exports.UpdateProfileDto = UpdateProfileDto;
__decorate([
    (0, swagger_1.ApiProperty)({
        example: 'ya@ya.ru',
        description: 'почта пользователя',
    }),
    __metadata("design:type", String)
], UpdateProfileDto.prototype, "email", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        example: '89167929272',
        description: 'Мобильный телефон',
    }),
    __metadata("design:type", String)
], UpdateProfileDto.prototype, "mobile", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        example: '89167929272',
        description: 'Мобильный телефон',
    }),
    __metadata("design:type", String)
], UpdateProfileDto.prototype, "birthplace", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        example: '21.01,85',
        description: 'Дата рождения',
    }),
    __metadata("design:type", Date)
], UpdateProfileDto.prototype, "birthday", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        example: true,
        description: 'видимость данных',
    }),
    __metadata("design:type", Boolean)
], UpdateProfileDto.prototype, "visible", void 0);
//# sourceMappingURL=update-profile.dto.js.map