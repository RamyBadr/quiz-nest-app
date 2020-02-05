'use strict';
Object.defineProperty(exports, "__esModule", { value: true });
class AbstractDto {
    constructor(entity) {
        this.id = entity.id;
        this.createdAt = entity.createdAt;
        this.updatedAt = entity.updatedAt;
    }
}
exports.AbstractDto = AbstractDto;
//# sourceMappingURL=AbstractDto.js.map