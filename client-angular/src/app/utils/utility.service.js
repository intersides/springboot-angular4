/**
 * Created by marcofalsitta on 26.05.17.
 */
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
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var UtilityService = UtilityService_1 = (function () {
    function UtilityService() {
        if (UtilityService_1._instance) {
            throw new Error("The Logger is a singleton class and cannot be created!");
        }
        UtilityService_1._instance = this;
    }
    UtilityService.getInstance = function () {
        return UtilityService_1._instance;
    };
    UtilityService.prototype.generateUUID = function () {
        // return "00000000-0000-0000-0000-000000000000";
        // http://www.ietf.org/rfc/rfc4122.txt
        var s = [];
        var hexDigits = "0123456789abcdef";
        for (var i = 0; i < 36; i++) {
            s[i] = hexDigits.substr(Math.floor(Math.random() * 0x10), 1);
        }
        s[14] = "4"; // bits 12-15 of the time_hi_and_version field to 0010
        s[19] = hexDigits.substr(s[19] & 0x3 | 0x8, 1); // bits 6-7 of the clock_seq_hi_and_reserved to 01
        s[8] = s[13] = s[18] = s[23] = "-";
        return s.join("");
    };
    return UtilityService;
}());
UtilityService._instance = new UtilityService_1();
UtilityService = UtilityService_1 = __decorate([
    core_1.Injectable(),
    __metadata("design:paramtypes", [])
], UtilityService);
exports.UtilityService = UtilityService;
var UtilityService_1;
//# sourceMappingURL=utility.service.js.map