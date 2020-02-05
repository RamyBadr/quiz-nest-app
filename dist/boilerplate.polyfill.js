"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
require("source-map-support/register");
const _ = require("lodash");
Array.prototype.toDtos = function (options) {
    return _(this)
        .map(item => item.toDto(options))
        .compact()
        .value();
};
//# sourceMappingURL=boilerplate.polyfill.js.map