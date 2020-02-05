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
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const AWS = require("aws-sdk");
const mime = require("mime-types");
const common_1 = require("@nestjs/common");
const config_service_1 = require("./config.service");
const generator_service_1 = require("./generator.service");
let AwsS3Service = class AwsS3Service {
    constructor(configService, generatorService) {
        this.configService = configService;
        this.generatorService = generatorService;
        const options = {
            apiVersion: '2010-12-01',
            region: 'eu-central-1',
        };
        const awsS3Config = configService.awsS3Config;
        if (awsS3Config.accessKeyId && awsS3Config.secretAccessKey) {
            options.credentials = awsS3Config;
        }
        this._s3 = new AWS.S3(options);
    }
    uploadImage(file) {
        return __awaiter(this, void 0, void 0, function* () {
            const fileName = this.generatorService.fileName((mime.extension(file.mimetype)));
            const key = 'images/' + fileName;
            yield this._s3
                .putObject({
                Bucket: this.configService.awsS3Config.bucketName,
                Body: file.buffer,
                ACL: 'public-read',
                Key: key,
            })
                .promise();
            return key;
        });
    }
};
AwsS3Service = __decorate([
    common_1.Injectable(),
    __metadata("design:paramtypes", [config_service_1.ConfigService,
        generator_service_1.GeneratorService])
], AwsS3Service);
exports.AwsS3Service = AwsS3Service;
//# sourceMappingURL=aws-s3.service.js.map