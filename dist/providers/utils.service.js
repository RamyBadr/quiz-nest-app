"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const bcrypt = require("bcrypt");
const _ = require("lodash");
class UtilsService {
    static toDto(model, entity, options) {
        if (_.isArray(entity)) {
            return entity.map(u => new model(u, options));
        }
        return new model(entity, options);
    }
    static generateHash(password) {
        return bcrypt.hashSync(password, 10);
    }
    static generateRandomString(length) {
        return Math.random()
            .toString(36)
            .replace(/[^a-zA-Z0-9]+/g, '')
            .substr(0, length);
    }
    static validateHash(password, hash) {
        return bcrypt.compare(password, hash || '');
    }
    static get(func, defaultValue) {
        try {
            const value = func();
            if (_.isUndefined(value)) {
                return defaultValue;
            }
            return value;
        }
        catch (_a) {
            return defaultValue;
        }
    }
}
exports.UtilsService = UtilsService;
//# sourceMappingURL=utils.service.js.map