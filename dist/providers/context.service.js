"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const requestContext = require("request-context");
class ContextService {
    static get(key) {
        return requestContext.get(ContextService._getKeyWithNamespace(key));
    }
    static set(key, value) {
        requestContext.set(ContextService._getKeyWithNamespace(key), value);
    }
    static _getKeyWithNamespace(key) {
        return `${ContextService._nameSpace}.${key}`;
    }
}
exports.ContextService = ContextService;
ContextService._nameSpace = 'request';
//# sourceMappingURL=context.service.js.map