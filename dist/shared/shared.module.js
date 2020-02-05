"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var SharedModule_1;
Object.defineProperty(exports, "__esModule", { value: true });
const common_1 = require("@nestjs/common");
const jwt_1 = require("@nestjs/jwt");
const aws_s3_service_1 = require("./services/aws-s3.service");
const config_service_1 = require("./services/config.service");
const generator_service_1 = require("./services/generator.service");
const validator_service_1 = require("./services/validator.service");
const providers = [
    config_service_1.ConfigService,
    validator_service_1.ValidatorService,
    aws_s3_service_1.AwsS3Service,
    generator_service_1.GeneratorService,
];
let SharedModule = SharedModule_1 = class SharedModule {
};
SharedModule = SharedModule_1 = __decorate([
    common_1.Global(),
    common_1.Module({
        providers,
        imports: [
            common_1.HttpModule,
            jwt_1.JwtModule.registerAsync({
                imports: [SharedModule_1],
                useFactory: (configService) => ({
                    secretOrPrivateKey: configService.get('JWT_SECRET_KEY'),
                }),
                inject: [config_service_1.ConfigService],
            }),
        ],
        exports: [...providers, common_1.HttpModule, jwt_1.JwtModule],
    })
], SharedModule);
exports.SharedModule = SharedModule;
//# sourceMappingURL=shared.module.js.map