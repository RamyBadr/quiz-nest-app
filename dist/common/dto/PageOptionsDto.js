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
const swagger_1 = require("@nestjs/swagger");
const class_transformer_1 = require("class-transformer");
const class_validator_1 = require("class-validator");
const order_1 = require("../constants/order");
class PageOptionsDto {
    constructor() {
        this.order = order_1.Order.ASC;
        this.page = 1;
        this.take = 10;
    }
    get skip() {
        return (this.page - 1) * this.take;
    }
}
__decorate([
    swagger_1.ApiModelPropertyOptional({
        enum: order_1.Order,
        default: order_1.Order.ASC,
    }),
    class_validator_1.IsEnum(order_1.Order),
    class_validator_1.IsOptional(),
    __metadata("design:type", String)
], PageOptionsDto.prototype, "order", void 0);
__decorate([
    swagger_1.ApiModelPropertyOptional({
        minimum: 1,
        default: 1,
    }),
    class_transformer_1.Type(() => Number),
    class_validator_1.IsInt(),
    class_validator_1.Min(1),
    class_validator_1.IsOptional(),
    __metadata("design:type", Number)
], PageOptionsDto.prototype, "page", void 0);
__decorate([
    swagger_1.ApiModelPropertyOptional({
        minimum: 1,
        maximum: 50,
        default: 10,
    }),
    class_transformer_1.Type(() => Number),
    class_validator_1.IsInt(),
    class_validator_1.Min(10),
    class_validator_1.Max(50),
    class_validator_1.IsOptional(),
    __metadata("design:type", Number)
], PageOptionsDto.prototype, "take", void 0);
__decorate([
    swagger_1.ApiModelPropertyOptional(),
    class_validator_1.IsString(),
    class_validator_1.IsNotEmpty(),
    class_validator_1.IsOptional(),
    __metadata("design:type", String)
], PageOptionsDto.prototype, "q", void 0);
exports.PageOptionsDto = PageOptionsDto;
//# sourceMappingURL=PageOptionsDto.js.map