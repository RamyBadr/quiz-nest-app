'use strict';
Object.defineProperty(exports, "__esModule", { value: true });
const _ = require("lodash");
const class_transformer_1 = require("class-transformer");
exports.Trim = () => class_transformer_1.Transform((value) => {
    if (_.isArray(value)) {
        return value.map(v => _.trim(v).replace(/\s\s+/g, ' '));
    }
    return _.trim(value).replace(/\s\s+/g, ' ');
});
exports.ToInt = () => class_transformer_1.Transform(value => parseInt(value, 10), { toClassOnly: true });
//# sourceMappingURL=transforms.decorator.js.map