webpackJsonp([1,4],{

/***/ 137:
/***/ (function(module, exports) {

module.exports = "<div class=\"container\">\n    <h2>Add Item</h2>\n    <form #itemForm=\"ngForm\" (ngSubmit)=\"onSubmit()\">\n        <code style=\"white-space: pre-line;\">{{diagnostic}}</code>\n        <div class=\"form-group\">\n            <label for=\"name\">Name</label>\n            <input type=\"text\" class=\"form-control\" id=\"name\" required\n                [(ngModel)]=\"model.name\" name=\"name\" #spy #name=\"ngModel\">\n            <!--<div [hidden]=\"name.valid || name.pristine\"-->\n            <div [hidden]=\"name.valid\"\n                 class=\"alert alert-danger\">\n                Name is required\n            </div>\n            <!--<div>{{spy.className}}</div>-->\n\n        </div>\n        <div class=\"form-group\">\n            <label for=\"description\">Description</label>\n            <input type=\"text\" class=\"form-control\" id=\"description\"\n                [(ngModel)]=\"model.description\" name=\"description\">\n        </div>\n\n\n        <button type=\"submit\" class=\"btn btn-success\" [disabled]=\"name.invalid\" >Submit</button>\n        <button type=\"button\" class=\"btn btn-default\" (click)=\"newItem(); itemForm.reset()\">Reset</button>\n\n    </form>\n</div>"

/***/ }),

/***/ 162:
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__(71);


/***/ }),

/***/ 47:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__utils_utility_service__ = __webpack_require__(81);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return Item; });
/**
 * Created by marcofalsitta on 26.05.17.
 */

var Item = (function () {
    function Item(iITem) {
        this.id = null;
        this.name = null;
        this.description = null;
        this.creationTimestamp = new Date();
        this.id = __WEBPACK_IMPORTED_MODULE_0__utils_utility_service__["a" /* UtilityService */].getInstance().generateUUID();
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

//# sourceMappingURL=Item.js.map

/***/ }),

/***/ 48:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(3);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__Item__ = __webpack_require__(47);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__items_service__ = __webpack_require__(79);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return AppComponent; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "b", function() { return ItemFormComponent; });
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};



var AppComponent = (function () {
    function AppComponent(itemsService) {
        this.title = "Fluance - Test";
        this.items = itemsService.getItems();
        this.item = this.items[0];
    }
    AppComponent.prototype.onItemClick = function (id) {
        var selectedItem = this.getItemIndexFromId(id);
        if (selectedItem != null) {
            this.item = selectedItem;
        }
        else {
            alert("could not find item form id" + id);
        }
    };
    AppComponent.prototype.getItemIndexFromId = function (id) {
        for (var i = 0; i < this.items.length; i++) {
            if (this.items[i].id == id) {
                return this.items[i];
            }
        }
        return null;
    };
    AppComponent.prototype.onKeyUp = function (event) {
        this.insertedValues = event.target.value;
    };
    AppComponent.prototype.onKeyEnter = function (event) {
        console.log("sending " + this.insertedValues);
    };
    return AppComponent;
}());
AppComponent = __decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["c" /* Component */])({
        selector: 'my-app',
        providers: [__WEBPACK_IMPORTED_MODULE_2__items_service__["a" /* ItemsService */]],
        template: "\n        <h1>{{title}}</h1>\n        <h2>Chosen technology is :{{item.name}}</h2>\n        <p>Technologies:</p>\n        <ul class=\"list-group\">\n            <li *ngFor=\"let item of items\" class=\"list-group-item\">\n                <span>{{item.name}}</span>\n                <button class=\"btn\" (click)=\"onItemClick(item.id)\"> select me</button>\n            </li>\n        </ul>\n        <p *ngIf=\"items.length > 3\">There are many technologies!</p>\n        <div>\n            <input (keyup)=\"onKeyUp($event)\" (keyup.enter)=\"onKeyEnter($event)\" class=\"form-control\" >\n            <p>{{insertedValues}}</p>\n        </div>\n\n\n        <item-form>new form here...</item-form>\n        \n    "
    }),
    __metadata("design:paramtypes", [typeof (_a = typeof __WEBPACK_IMPORTED_MODULE_2__items_service__["a" /* ItemsService */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_2__items_service__["a" /* ItemsService */]) === "function" && _a || Object])
], AppComponent);

var ItemFormComponent = (function () {
    function ItemFormComponent() {
        this.model = new __WEBPACK_IMPORTED_MODULE_1__Item__["a" /* Item */]();
        this.submitted = false;
    }
    ItemFormComponent.prototype.onSubmit = function () {
        this.submitted = true;
        console.log("submtting...", this.submitted);
    };
    ItemFormComponent.prototype.newItem = function () {
        this.model = new __WEBPACK_IMPORTED_MODULE_1__Item__["a" /* Item */]();
    };
    Object.defineProperty(ItemFormComponent.prototype, "diagnostic", {
        get: function () {
            return JSON.stringify(this.model, null, "\t");
        },
        enumerable: true,
        configurable: true
    });
    return ItemFormComponent;
}());
ItemFormComponent = __decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["c" /* Component */])({
        selector: "item-form",
        template: __webpack_require__(137)
    }),
    __metadata("design:paramtypes", [])
], ItemFormComponent);

var _a;
//# sourceMappingURL=app.component.js.map

/***/ }),

/***/ 70:
/***/ (function(module, exports) {

function webpackEmptyContext(req) {
	throw new Error("Cannot find module '" + req + "'.");
}
webpackEmptyContext.keys = function() { return []; };
webpackEmptyContext.resolve = webpackEmptyContext;
module.exports = webpackEmptyContext;
webpackEmptyContext.id = 70;


/***/ }),

/***/ 71:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(3);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_platform_browser_dynamic__ = __webpack_require__(77);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__app_app_module__ = __webpack_require__(78);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__environments_environment__ = __webpack_require__(82);




if (__WEBPACK_IMPORTED_MODULE_3__environments_environment__["a" /* environment */].production) {
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["a" /* enableProdMode */])();
}
__webpack_require__.i(__WEBPACK_IMPORTED_MODULE_1__angular_platform_browser_dynamic__["a" /* platformBrowserDynamic */])().bootstrapModule(__WEBPACK_IMPORTED_MODULE_2__app_app_module__["a" /* AppModule */]);
//# sourceMappingURL=main.js.map

/***/ }),

/***/ 78:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(3);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_platform_browser__ = __webpack_require__(20);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__angular_forms__ = __webpack_require__(75);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__angular_http__ = __webpack_require__(76);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__app_component__ = __webpack_require__(48);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return AppModule; });
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};






var AppModule = (function () {
    function AppModule() {
    }
    return AppModule;
}());
AppModule = __decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["b" /* NgModule */])({
        imports: [__WEBPACK_IMPORTED_MODULE_1__angular_platform_browser__["a" /* BrowserModule */], __WEBPACK_IMPORTED_MODULE_2__angular_forms__["a" /* FormsModule */], __WEBPACK_IMPORTED_MODULE_3__angular_http__["a" /* HttpModule */]],
        declarations: [__WEBPACK_IMPORTED_MODULE_4__app_component__["a" /* AppComponent */], __WEBPACK_IMPORTED_MODULE_4__app_component__["b" /* ItemFormComponent */]],
        bootstrap: [__WEBPACK_IMPORTED_MODULE_4__app_component__["a" /* AppComponent */]]
    })
], AppModule);

//# sourceMappingURL=app.module.js.map

/***/ }),

/***/ 79:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(3);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__mock_items__ = __webpack_require__(80);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return ItemsService; });
/**
 * Created by marcofalsitta on 26.05.17.
 */
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};


var ItemsService = (function () {
    function ItemsService() {
    }
    ItemsService.prototype.getItems = function () {
        return __WEBPACK_IMPORTED_MODULE_1__mock_items__["a" /* ITEMS */];
    };
    return ItemsService;
}());
ItemsService = __decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["d" /* Injectable */])()
], ItemsService);

//# sourceMappingURL=items.service.js.map

/***/ }),

/***/ 80:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__Item__ = __webpack_require__(47);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return ITEMS; });
/**
 * Created by marcofalsitta on 26.05.17.
 */

var ITEMS = [
    new __WEBPACK_IMPORTED_MODULE_0__Item__["a" /* Item */]({ name: "Aurelia", description: "Most compliant framework create by Rob Eisenberg, ex employee at Google working on Angular 2 project. Written with next-generation EcmaScript. Integrates with Web Components. No external dependencies. Leverage the technology of the future but target today's mobile, desktop and browser environments." }),
    new __WEBPACK_IMPORTED_MODULE_0__Item__["a" /* Item */]({ name: "Ember", description: "An open-source JavaScript web framework, based on the Model–view–viewmodel (MVVM) pattern. It allows developers to create scalable single-page web applications[3] by incorporating common idioms and best practices into the framework." }),
    new __WEBPACK_IMPORTED_MODULE_0__Item__["a" /* Item */]({ name: "Angular 4", description: "A TypeScript-based open-source front-end web application platform led by the Angular Team at Google and by a community of individuals and corporations to address all of the parts of the developer's workflow while building complex web applications. Angular is a complete rewrite from the same team that built AngularJS." }),
    new __WEBPACK_IMPORTED_MODULE_0__Item__["a" /* Item */]({ name: "React", description: "An open-source JavaScript library for building user interfaces.It is maintained by Facebook, Instagram and a community of individual developers and corporations.<br>According to JavaScript analytics service Libscore, React is currently being used on the websites of Netflix, Imgur, Buffer, Bleacher Report, Feedly, Airbnb, SeatGeek, HelloSign, Walmart, and others.<br>React allows developers to create large web applications that use data which can change over time, without reloading the page. Its main goal is to be fast, simple and scalable. React processes only user interfaces in applications. This corresponds to View in the Model-View-Controller (MVC) template, and can be used in combination with other JavaScript libraries or frameworks in MVC, such as AngularJS." })
];
//# sourceMappingURL=mock-items.js.map

/***/ }),

/***/ 81:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(3);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return UtilityService; });
/**
 * Created by marcofalsitta on 26.05.17.
 */
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};

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
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["d" /* Injectable */])(),
    __metadata("design:paramtypes", [])
], UtilityService);

var UtilityService_1;
//# sourceMappingURL=utility.service.js.map

/***/ }),

/***/ 82:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return environment; });
// The file contents for the current environment will overwrite these during build.
// The build system defaults to the dev environment which uses `environment.ts`, but if you do
// `ng build --env=prod` then `environment.prod.ts` will be used instead.
// The list of which env maps to which file can be found in `.angular-cli.json`.
// The file contents for the current environment will overwrite these during build.
var environment = {
    production: false
};
//# sourceMappingURL=environment.js.map

/***/ })

},[162]);
//# sourceMappingURL=main.bundle.js.map