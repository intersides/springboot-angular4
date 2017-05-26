/**
 * Created by marcofalsitta on 26.05.17.
 */
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var utility_service_1 = require("./utils/utility.service");
var Item = (function () {
    function Item(iITem) {
        this.id = null;
        this.name = null;
        this.description = null;
        this.creationTimestamp = new Date();
        this.id = utility_service_1.UtilityService.getInstance().generateUUID();
        if (iITem) {
            if (iITem.id) {
                this.id = iITem.id;
            }
            this.name = iITem.name;
            this.description = iITem.description;
            if (iITem.creationTimestamp) {
                this.creationTimestamp = iITem.creationTimestamp;
            }
        }
    }
    return Item;
}());
exports.Item = Item;
//# sourceMappingURL=Item.js.map