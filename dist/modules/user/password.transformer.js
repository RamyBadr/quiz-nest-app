"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const utils_service_1 = require("../../providers/utils.service");
class PasswordTransformer {
    to(value) {
        return utils_service_1.UtilsService.generateHash(value);
    }
    from(value) {
        return value;
    }
}
exports.PasswordTransformer = PasswordTransformer;
//# sourceMappingURL=password.transformer.js.map