webpackJsonp([1,4],{

/***/ 139:
/***/ (function(module, exports) {

module.exports = "<h2>{{isUpdate ? 'Modify' : 'Add'}} Item</h2>\n\n<form #itemForm=\"ngForm\" (ngSubmit)=\"onSubmit()\">\n    <code style=\"white-space: pre-line;\">{{model.diagnostic}}</code>\n\n    <div class=\"form-group\">\n      <label for=\"id\">id</label>\n      <span>(editing is {{lockId ? 'lock' : 'unlock'}}. Select the icon to toggle its state.)</span>\n\n      <div style=\"display: flex; align-items: center\">\n        <span (click)=\"onLockToggle($event)\"  class=\"glyphicon {{lockId ? 'glyphicon-lock' : 'glyphicon-pencil'}}\" style=\"margin:5px;\"></span>\n        <input type=\"text\" class=\"form-control\" id=\"id\"\n               (keyup)=\"onKeyUp($event, true)\" value=\"{{model.id}}\" name=\"id\"  readonly=\"{{lockId ? 'readonly' : ''}}\">\n      </div>\n\n\n    </div>\n\n\n    <div class=\"form-group\">\n        <label for=\"name\">Name</label>\n        <input type=\"text\" class=\"form-control\" id=\"name\" required\n               (keyup)=\"onKeyUp($event, false)\" [(ngModel)]=\"model.name\" name=\"name\" #spy #name=\"ngModel\" >\n        <!--<div [hidden]=\"name.valid || name.pristine\"-->\n        <div [hidden]=\"name.valid\"\n             class=\"alert alert-danger\">\n            Name is required\n        </div>\n        <!--<div>{{spy.className}}</div>-->\n\n    </div>\n    <div class=\"form-group\">\n        <label for=\"description\">Description</label>\n        <input type=\"text\" class=\"form-control\" id=\"description\"\n               (keyup)=\"onKeyUp($event, false)\" [(ngModel)]=\"model.description\" name=\"description\">\n    </div>\n\n    <button type=\"submit\" class=\"btn btn-success\" [disabled]=\"name.invalid\">Submit</button>\n    <button type=\"button\" class=\"btn btn-default\" (click)=\"resetForm(); itemForm.reset()\">Reset</button>\n\n</form>\n"

/***/ }),

/***/ 166:
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__(75);


/***/ }),

/***/ 29:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(4);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_http__ = __webpack_require__(48);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_rxjs_add_operator_map__ = __webpack_require__(142);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_rxjs_add_operator_map___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_2_rxjs_add_operator_map__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_rxjs_add_operator_toPromise__ = __webpack_require__(143);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_rxjs_add_operator_toPromise___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_3_rxjs_add_operator_toPromise__);
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
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};




var ItemsService = (function () {
    function ItemsService(http) {
        this.host = "";
        this.headers = new __WEBPACK_IMPORTED_MODULE_1__angular_http__["b" /* Headers */]({ 'Content-Type': 'application/json' });
        this.http = http;
    }
    ItemsService.prototype.prepareRequest = function () {
    };
    ItemsService.prototype.fetchItems = function () {
        var options = new __WEBPACK_IMPORTED_MODULE_1__angular_http__["c" /* RequestOptions */]({
            headers: this.headers
        });
        return this.http.get(this.host + "/items", options)
            .toPromise()
            .then(function (response) {
            console.log(response.json().msg);
            return response.json().data;
        })
            .catch(this.handleError);
    };
    ItemsService.prototype.getItem = function (itemId) {
        var options = new __WEBPACK_IMPORTED_MODULE_1__angular_http__["c" /* RequestOptions */]({
            headers: this.headers
        });
        return this.http.post(this.host + "/item", { id: itemId }, options).toPromise()
            .then(function (response) {
            console.log(response.json().msg);
            return response.json().data;
        })
            .catch(this.handleError);
    };
    ItemsService.prototype.addItem = function (item) {
        return this.http.put(this.host + "/item", item, this.headers).toPromise()
            .then(function (response) {
            console.log(response.json().msg);
            return response.json().data;
        })
            .catch(this.handleError);
    };
    ItemsService.prototype.updateItem = function (item) {
        return this.http.patch(this.host + "/item", item, this.headers).toPromise()
            .then(function (response) {
            console.log(response.json().msg);
            return response.json().data;
        })
            .catch(this.handleError);
    };
    ItemsService.prototype.deleteItem = function (itemId) {
        var _this = this;
        var options = new __WEBPACK_IMPORTED_MODULE_1__angular_http__["c" /* RequestOptions */]({
            headers: this.headers,
            body: { id: itemId }
        });
        return this.http.delete(this.host + "/item", options).toPromise()
            .then(function (response) {
            console.log(response.json().msg);
            return response.json().data;
        })
            .catch(function (error) {
            return _this.handleError(error);
        });
    };
    ItemsService.prototype.handleError = function (error) {
        console.error('An error occurred', error);
        if (typeof error['_body'] == "string") {
            try {
                var errorObj = JSON.parse(error['_body']);
                console.error(errorObj["msg"]);
                return Promise.reject(errorObj["msg"]);
            }
            catch (jsonParseError) {
                console.error("could not parse:", error['_body']);
            }
        }
        else {
            console.error("trapped error is malformes, does not contains _body part");
        }
    };
    return ItemsService;
}());
ItemsService = __decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["g" /* Injectable */])(),
    __metadata("design:paramtypes", [typeof (_a = typeof __WEBPACK_IMPORTED_MODULE_1__angular_http__["d" /* Http */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_1__angular_http__["d" /* Http */]) === "function" && _a || Object])
], ItemsService);

var _a;
//# sourceMappingURL=items.service.js.map

/***/ }),

/***/ 49:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__utils_utility_service__ = __webpack_require__(83);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return Item; });
/**
 * Created by marcofalsitta on 26.05.17.
 */

var Item = (function () {
    function Item(iITem) {
        this.id = null;
        this.name = null;
        this.description = null;
        this.creationDate = new Date().getTime();
        this.id = __WEBPACK_IMPORTED_MODULE_0__utils_utility_service__["a" /* UtilityService */].getInstance().generateUUID();
        if (iITem) {
            if (iITem.id) {
                this.id = iITem.id;
            }
            this.name = iITem.name;
            this.description = iITem.description;
            if (iITem.creationDate) {
                this.creationDate = iITem.creationDate;
            }
        }
    }
    Object.defineProperty(Item.prototype, "diagnostic", {
        get: function () {
            return JSON.stringify(this, null, "\t");
        },
        enumerable: true,
        configurable: true
    });
    return Item;
}());

//# sourceMappingURL=Item.js.map

/***/ }),

/***/ 50:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(4);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__Item__ = __webpack_require__(49);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__items_service__ = __webpack_require__(29);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_rxjs_Subject__ = __webpack_require__(26);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_rxjs_Subject___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_3_rxjs_Subject__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return ItemFormComponent; });
/**
 * Created by marcofalsitta on 27.05.17.
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




var ItemFormComponent = (function () {
    function ItemFormComponent(itemsService) {
        this.itemsService = itemsService;
        this.lockId = true;
        this.isUpdate = false;
        this.onItemAdded = new __WEBPACK_IMPORTED_MODULE_0__angular_core__["c" /* EventEmitter */]();
        this.onItemRemoved = new __WEBPACK_IMPORTED_MODULE_0__angular_core__["c" /* EventEmitter */]();
        this.model = new __WEBPACK_IMPORTED_MODULE_1__Item__["a" /* Item */]();
        this.submitted = false;
    }
    ItemFormComponent.prototype.onSubmit = function () {
        var _this = this;
        this.submitted = true;
        console.log("submitting...", this.submitted);
        if (this.isUpdate) {
            this.itemsService.updateItem(this.model)
                .then(function (item) {
                console.log("updated", item);
                _this.onItemAdded.emit(item);
            })
                .catch(function (error) {
                console.error(error);
            });
        }
        else {
            this.itemsService.addItem(this.model).then(function (item) {
                console.log("added", item);
                _this.onItemAdded.emit(item);
            })
                .catch(function (error) {
                console.error(error);
            });
        }
    };
    ItemFormComponent.prototype.onSelected = function (selectedItem) {
        this.model = new __WEBPACK_IMPORTED_MODULE_1__Item__["a" /* Item */](selectedItem);
        this.idAtSelectionTime = this.model.id;
        this.isUpdate = true;
    };
    ItemFormComponent.prototype.onLockToggle = function (event) {
        console.log("onLockToggle()");
        this.lockId = !this.lockId;
        // this.isUpdate = !this.lockId;
    };
    ItemFormComponent.prototype.onKeyUp = function (event, isId) {
        if (isId === void 0) { isId = false; }
        if (isId == true) {
            this.model.id = event.target.value;
        }
        if (typeof this.idAtSelectionTime !== "undefined") {
            console.info(this.model.id);
            console.warn(this.idAtSelectionTime);
            console.log("___");
            this.isUpdate = this.model.id == this.idAtSelectionTime;
        }
    };
    ItemFormComponent.prototype.resetForm = function () {
        this.model = new __WEBPACK_IMPORTED_MODULE_1__Item__["a" /* Item */]();
        this.isUpdate = false;
    };
    return ItemFormComponent;
}());
__decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["d" /* Input */])(),
    __metadata("design:type", typeof (_a = typeof __WEBPACK_IMPORTED_MODULE_3_rxjs_Subject__["Subject"] !== "undefined" && __WEBPACK_IMPORTED_MODULE_3_rxjs_Subject__["Subject"]) === "function" && _a || Object)
], ItemFormComponent.prototype, "parentSubject", void 0);
__decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["e" /* Output */])(),
    __metadata("design:type", Object)
], ItemFormComponent.prototype, "onItemAdded", void 0);
__decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["e" /* Output */])(),
    __metadata("design:type", Object)
], ItemFormComponent.prototype, "onItemRemoved", void 0);
ItemFormComponent = __decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["f" /* Component */])({
        selector: "item-form",
        providers: [__WEBPACK_IMPORTED_MODULE_2__items_service__["a" /* ItemsService */]],
        template: __webpack_require__(139)
    }),
    __metadata("design:paramtypes", [typeof (_b = typeof __WEBPACK_IMPORTED_MODULE_2__items_service__["a" /* ItemsService */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_2__items_service__["a" /* ItemsService */]) === "function" && _b || Object])
], ItemFormComponent);

var _a, _b;
//# sourceMappingURL=item-add-component.js.map

/***/ }),

/***/ 74:
/***/ (function(module, exports) {

function webpackEmptyContext(req) {
	throw new Error("Cannot find module '" + req + "'.");
}
webpackEmptyContext.keys = function() { return []; };
webpackEmptyContext.resolve = webpackEmptyContext;
module.exports = webpackEmptyContext;
webpackEmptyContext.id = 74;


/***/ }),

/***/ 75:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(4);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_platform_browser_dynamic__ = __webpack_require__(80);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__app_app_module__ = __webpack_require__(82);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__environments_environment__ = __webpack_require__(84);




if (__WEBPACK_IMPORTED_MODULE_3__environments_environment__["a" /* environment */].production) {
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["a" /* enableProdMode */])();
}
__webpack_require__.i(__WEBPACK_IMPORTED_MODULE_1__angular_platform_browser_dynamic__["a" /* platformBrowserDynamic */])().bootstrapModule(__WEBPACK_IMPORTED_MODULE_2__app_app_module__["a" /* AppModule */]);
//# sourceMappingURL=main.js.map

/***/ }),

/***/ 81:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(4);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__Item__ = __webpack_require__(49);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__items_service__ = __webpack_require__(29);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__item_add_component__ = __webpack_require__(50);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return AppComponent; });
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
        this.itemsService = itemsService;
        this.item = new __WEBPACK_IMPORTED_MODULE_1__Item__["a" /* Item */]();
        this.items = [];
        this.title = "Fluance - Test";
    }
    AppComponent.prototype.getItemIndexFromId = function (id) {
        for (var i = 0; i < this.items.length; i++) {
            if (this.items[i].id == id) {
                return this.items[i];
            }
        }
        return null;
    };
    AppComponent.prototype.getItem = function (event) {
        this.itemsService.getItem("123456").then(function (result) {
            console.log(result);
        });
    };
    AppComponent.prototype.onItemAdded = function (event) {
        console.warn("test event binding", event);
        this.refreshList();
    };
    AppComponent.prototype.onItemSelect = function (id) {
        var selectedItem = this.getItemIndexFromId(id);
        if (selectedItem != null) {
            this.item = selectedItem;
            this.itemFormComponent.onSelected(selectedItem);
        }
        else {
            alert("could not find item form id" + id);
        }
    };
    AppComponent.prototype.onItemRemove = function (id) {
        var _this = this;
        this.itemsService.deleteItem(id).then(function (removedItem) {
            console.info("removed item ", removedItem);
            _this.refreshList();
        })
            .catch(function (exception) {
            console.error(exception);
        });
    };
    AppComponent.prototype.ngOnInit = function () {
        this.refreshList();
    };
    AppComponent.prototype.refreshList = function () {
        var _this = this;
        this.itemsService.fetchItems().then(function (items) {
            //reorder items
            items.sort(function (a, b) {
                return a.creationDate - b.creationDate;
            });
            _this.items = items;
            _this.item = _this.items[0];
        })
            .catch(function (exception) {
            console.error(exception);
        });
    };
    return AppComponent;
}());
__decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["h" /* ViewChild */])(__WEBPACK_IMPORTED_MODULE_3__item_add_component__["a" /* ItemFormComponent */]),
    __metadata("design:type", typeof (_a = typeof __WEBPACK_IMPORTED_MODULE_3__item_add_component__["a" /* ItemFormComponent */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_3__item_add_component__["a" /* ItemFormComponent */]) === "function" && _a || Object)
], AppComponent.prototype, "itemFormComponent", void 0);
AppComponent = __decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["f" /* Component */])({
        selector: 'my-app',
        providers: [__WEBPACK_IMPORTED_MODULE_2__items_service__["a" /* ItemsService */]],
        template: "\n\n    \n    <div class=\"container\">\n\n      <div>\n        <h1>{{title}}</h1>\n\n        <div class=\"container\" style=\"max-width: 500px;\">\n          <item-form (onItemAdded)=\"onItemAdded($event)\">new form here...</item-form>\n        </div>\n\n\n        <h3>{{items.length > 0 ? items.length: 'Empty'}} item{{items.length > 1 ? 's' : ''}} in the list:</h3>\n        <ul class=\"list-group\">\n          <li *ngFor=\"let item of items\" class=\"list-group-item\">\n            <span class=\"name\">{{item.name}} </span>\n            <span class=\"description\">{{item.description}} </span>\n            <code>{{item.id}}</code>\n            <button class=\"btn\" (click)=\"onItemSelect(item.id)\">select me</button>\n            <button class=\"btn btn-danger\" (click)=\"onItemRemove(item.id)\"> remove me</button>\n          </li>\n        </ul>\n        <!--<p *ngIf=\"items.length > 3\">There are many items!</p>-->\n       \n\n      </div>\n\n\n    \n\n      <button (click)=\"getItem()\">test get item</button>\n\n    </div>\n\n  "
    }),
    __metadata("design:paramtypes", [typeof (_b = typeof __WEBPACK_IMPORTED_MODULE_2__items_service__["a" /* ItemsService */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_2__items_service__["a" /* ItemsService */]) === "function" && _b || Object])
], AppComponent);

var _a, _b;
//# sourceMappingURL=app.component.js.map

/***/ }),

/***/ 82:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(4);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_platform_browser__ = __webpack_require__(20);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__angular_forms__ = __webpack_require__(79);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__angular_http__ = __webpack_require__(48);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__app_component__ = __webpack_require__(81);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__item_add_component__ = __webpack_require__(50);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__items_service__ = __webpack_require__(29);
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
        imports: [
            __WEBPACK_IMPORTED_MODULE_1__angular_platform_browser__["a" /* BrowserModule */],
            __WEBPACK_IMPORTED_MODULE_2__angular_forms__["a" /* FormsModule */],
            __WEBPACK_IMPORTED_MODULE_3__angular_http__["a" /* HttpModule */]
        ],
        providers: [__WEBPACK_IMPORTED_MODULE_6__items_service__["a" /* ItemsService */]],
        declarations: [__WEBPACK_IMPORTED_MODULE_4__app_component__["a" /* AppComponent */], __WEBPACK_IMPORTED_MODULE_5__item_add_component__["a" /* ItemFormComponent */]],
        bootstrap: [__WEBPACK_IMPORTED_MODULE_4__app_component__["a" /* AppComponent */]]
    })
], AppModule);

//# sourceMappingURL=app.module.js.map

/***/ }),

/***/ 83:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(4);
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
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["g" /* Injectable */])(),
    __metadata("design:paramtypes", [])
], UtilityService);

var UtilityService_1;
//# sourceMappingURL=utility.service.js.map

/***/ }),

/***/ 84:
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

},[166]);
//# sourceMappingURL=main.bundle.js.map