"use strict";
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
const common_1 = require("@nestjs/common");
const core_1 = require("@nestjs/core");
const microservices_1 = require("@nestjs/microservices");
const compression = require("compression");
const RateLimit = require("express-rate-limit");
const helmet = require("helmet");
const morgan = require("morgan");
const app_module_1 = require("./app.module");
const bad_request_filter_1 = require("./filters/bad-request.filter");
const config_service_1 = require("./shared/services/config.service");
const shared_module_1 = require("./shared/shared.module");
const viveo_swagger_1 = require("./viveo-swagger");
function bootstrap() {
    return __awaiter(this, void 0, void 0, function* () {
        const app = yield core_1.NestFactory.create(app_module_1.AppModule, {
            cors: true,
            bodyParser: true,
        });
        app.enable('trust proxy');
        app.use(helmet());
        app.use(new RateLimit({
            windowMs: 15 * 60 * 1000,
            max: 100,
        }));
        app.use(compression());
        app.use(morgan('combined'));
        const reflector = app.get(core_1.Reflector);
        app.useGlobalFilters(new bad_request_filter_1.HttpExceptionFilter(reflector));
        app.useGlobalInterceptors(new common_1.ClassSerializerInterceptor(reflector));
        app.useGlobalPipes(new common_1.ValidationPipe({
            whitelist: true,
            transform: true,
            dismissDefaultMessages: true,
            validationError: {
                target: false,
            },
        }));
        const configService = app.select(shared_module_1.SharedModule).get(config_service_1.ConfigService);
        app.connectMicroservice({
            transport: microservices_1.Transport.TCP,
            options: {
                port: configService.getNumber('TRANSPORT_PORT'),
                retryAttempts: 5,
                retryDelay: 3000,
            },
        });
        yield app.startAllMicroservicesAsync();
        if (['development', 'staging'].includes(configService.nodeEnv)) {
            viveo_swagger_1.setupSwagger(app);
        }
        const port = configService.getNumber('PORT');
        yield app.listen(port);
        console.info(`server running on port ${port}`);
        if (module.hot) {
            module.hot.accept();
            module.hot.dispose(() => app.close());
        }
    });
}
bootstrap();
//# sourceMappingURL=main.hmr.js.map