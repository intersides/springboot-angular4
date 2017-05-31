webpackJsonp([1,4],{

/***/ 154:
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(22)(false);
// imports


// module
exports.push([module.i, ".cdk-overlay-container [role=\"alert\"] {\n  color: white;\n  background-color: red; }\n\ndiv.snackbar {\n  font-family: 'Roboto';\n  font-style: normal;\n  margin: 12px;\n  font-size: 22px;\n  font-weight: bold;\n  color: white; }\n  div.snackbar:before {\n    content: \"Info:\";\n    display: inline-block;\n    margin-right: 5px; }\n  div.snackbar.alert {\n    color: #b0121d; }\n    div.snackbar.alert:before {\n      content: \"Warning:\";\n      display: inline-block;\n      margin-right: 5px; }\n", ""]);

// exports


/*** EXPORTS FROM exports-loader ***/
module.exports = module.exports.toString();

/***/ }),

/***/ 155:
/***/ (function(module, exports) {

module.exports = "<div class=\"snackbar {{type}}\">{{message}}</div>\n"

/***/ }),

/***/ 156:
/***/ (function(module, exports) {

module.exports = "\n<form #itemForm=\"ngForm\" (ngSubmit)=\"onSubmit()\">\n\n  <md-card id=\"item-card\">\n    <md-card-header>\n      <md-card-title>{{isUpdate ? 'Modify' : 'Add'}} Item</md-card-title>\n    </md-card-header>\n    <md-card-content>\n        <code [hidden]=\"!devMode\" style=\"white-space: pre-line;\">{{model.diagnostic}}</code>\n\n      <p>\n        <!--<span>(editing is {{lockId ? 'lock' : 'unlock'}}. Select the icon to toggle its state.)</span>-->\n\n        <md-input-container class=\"full-width\">\n          <input mdInput placeholder=\"Id\" disabled=\"{{lockId}}\" maxlength=\"36\" (keyup)=\"onKeyUp($event, true)\" value=\"{{model.id}}\" name=\"id\" >\n        </md-input-container>\n\n        <md-slide-toggle\n          [color]=\"color\"\n          [checked]=\"checked\"\n          [disabled]=\"disabled\"\n          (change)=\"onLockToggle($event)\">edit id\n        </md-slide-toggle>\n\n      </p>\n\n\n      <p>\n        <md-input-container class=\"full-width\">\n          <input mdInput placeholder=\"Name\" (keyup)=\"onKeyUp($event, false)\" required [(ngModel)]=\"model.name\" name=\"name\" #spy #name=\"ngModel\" >\n        </md-input-container>\n      <!--<span [hidden]=\"name.valid\">-->\n        <!--Name is required-->\n      <!--</span>-->\n      </p>\n      <p>\n        <md-input-container class=\"full-width\">\n          <input mdInput placeholder=\"Description\" (keyup)=\"onKeyUp($event, false)\" [(ngModel)]=\"model.description\" name=\"description\" >\n        </md-input-container>\n      </p>\n\n    </md-card-content>\n    <md-card-actions>\n      <button md-button type=\"submit\" [disabled]=\"name.invalid\" >SUBMIT</button>\n      <button md-button type=\"button\" (click)=\"resetForm(); itemForm.reset()\">RESET</button>\n    </md-card-actions>\n  </md-card>\n\n\n</form>\n"

/***/ }),

/***/ 211:
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__(88);


/***/ }),

/***/ 37:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(3);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_http__ = __webpack_require__(35);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_rxjs_add_operator_map__ = __webpack_require__(75);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_rxjs_add_operator_map___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_2_rxjs_add_operator_map__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_rxjs_add_operator_toPromise__ = __webpack_require__(175);
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
        this.headers = new __WEBPACK_IMPORTED_MODULE_1__angular_http__["c" /* Headers */]({ 'Content-Type': 'application/json' });
        this.http = http;
    }
    ItemsService.prototype.prepareRequest = function () {
    };
    ItemsService.prototype.fetchItems = function () {
        var options = new __WEBPACK_IMPORTED_MODULE_1__angular_http__["d" /* RequestOptions */]({
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
        var options = new __WEBPACK_IMPORTED_MODULE_1__angular_http__["d" /* RequestOptions */]({
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
        var options = new __WEBPACK_IMPORTED_MODULE_1__angular_http__["d" /* RequestOptions */]({
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
                return Promise.reject(errorObj["msg"]);
            }
            catch (jsonParseError) {
                console.error("could not parse:", error['_body']);
            }
        }
        else {
            console.error("trapped error is malformed, does not contains _body part");
        }
    };
    return ItemsService;
}());
ItemsService = __decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["g" /* Injectable */])(),
    __metadata("design:paramtypes", [typeof (_a = typeof __WEBPACK_IMPORTED_MODULE_1__angular_http__["b" /* Http */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_1__angular_http__["b" /* Http */]) === "function" && _a || Object])
], ItemsService);

var _a;
//# sourceMappingURL=items.service.js.map

/***/ }),

/***/ 60:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__utils_utility_service__ = __webpack_require__(97);
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

/***/ 61:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(3);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return SnackBarMessageComponent; });
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};

/**
 * Created by marcofalsitta on 31.05.17.
 */
var SnackBarMessageComponent = (function () {
    function SnackBarMessageComponent() {
        this.message = "none";
        this.type = "alert";
    }
    return SnackBarMessageComponent;
}());
SnackBarMessageComponent = __decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["c" /* Component */])({
        selector: 'snack-bar-component-message',
        template: __webpack_require__(155),
        styles: [__webpack_require__(154)],
    })
], SnackBarMessageComponent);

//# sourceMappingURL=snack-bar-component.js.map

/***/ }),

/***/ 62:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(3);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__Item__ = __webpack_require__(60);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__items_service__ = __webpack_require__(37);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_rxjs_Subject__ = __webpack_require__(23);
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
        this.devMode = false;
        this.onItemAdded = new __WEBPACK_IMPORTED_MODULE_0__angular_core__["d" /* EventEmitter */]();
        this.onItemRemoved = new __WEBPACK_IMPORTED_MODULE_0__angular_core__["d" /* EventEmitter */]();
        this.onException = new __WEBPACK_IMPORTED_MODULE_0__angular_core__["d" /* EventEmitter */]();
        this.model = new __WEBPACK_IMPORTED_MODULE_1__Item__["a" /* Item */]();
        this.submitted = false;
    }
    ItemFormComponent.prototype.onSubmit = function () {
        var _this = this;
        this.submitted = true;
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
                _this.resetForm();
            })
                .catch(function (error) {
                _this.onException.emit(error);
            });
        }
    };
    ItemFormComponent.prototype.onSelected = function (selectedItem) {
        this.model = new __WEBPACK_IMPORTED_MODULE_1__Item__["a" /* Item */](selectedItem);
        this.idAtSelectionTime = this.model.id;
        this.isUpdate = true;
    };
    ItemFormComponent.prototype.onDevModeToggle = function (devMode) {
        this.devMode = devMode;
    };
    ItemFormComponent.prototype.onLockToggle = function (event) {
        this.lockId = !this.lockId;
        // this.isUpdate = !this.lockId;
    };
    ItemFormComponent.prototype.onKeyUp = function (event, isId) {
        if (isId === void 0) { isId = false; }
        if (isId == true) {
            this.model.id = event.target.value;
        }
        if (typeof this.idAtSelectionTime !== "undefined") {
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
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["e" /* Input */])(),
    __metadata("design:type", typeof (_a = typeof __WEBPACK_IMPORTED_MODULE_3_rxjs_Subject__["Subject"] !== "undefined" && __WEBPACK_IMPORTED_MODULE_3_rxjs_Subject__["Subject"]) === "function" && _a || Object)
], ItemFormComponent.prototype, "parentSubject", void 0);
__decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["f" /* Output */])(),
    __metadata("design:type", Object)
], ItemFormComponent.prototype, "onItemAdded", void 0);
__decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["f" /* Output */])(),
    __metadata("design:type", Object)
], ItemFormComponent.prototype, "onItemRemoved", void 0);
__decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["f" /* Output */])(),
    __metadata("design:type", Object)
], ItemFormComponent.prototype, "onException", void 0);
ItemFormComponent = __decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["c" /* Component */])({
        selector: "item-form",
        providers: [__WEBPACK_IMPORTED_MODULE_2__items_service__["a" /* ItemsService */]],
        template: __webpack_require__(156)
    }),
    __metadata("design:paramtypes", [typeof (_b = typeof __WEBPACK_IMPORTED_MODULE_2__items_service__["a" /* ItemsService */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_2__items_service__["a" /* ItemsService */]) === "function" && _b || Object])
], ItemFormComponent);

var _a, _b;
//# sourceMappingURL=item-add-component.js.map

/***/ }),

/***/ 87:
/***/ (function(module, exports) {

function webpackEmptyContext(req) {
	throw new Error("Cannot find module '" + req + "'.");
}
webpackEmptyContext.keys = function() { return []; };
webpackEmptyContext.resolve = webpackEmptyContext;
module.exports = webpackEmptyContext;
webpackEmptyContext.id = 87;


/***/ }),

/***/ 88:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(3);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_platform_browser_dynamic__ = __webpack_require__(93);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__app_app_module__ = __webpack_require__(96);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__environments_environment__ = __webpack_require__(98);




if (__WEBPACK_IMPORTED_MODULE_3__environments_environment__["a" /* environment */].production) {
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["a" /* enableProdMode */])();
}
__webpack_require__.i(__WEBPACK_IMPORTED_MODULE_1__angular_platform_browser_dynamic__["a" /* platformBrowserDynamic */])().bootstrapModule(__WEBPACK_IMPORTED_MODULE_2__app_app_module__["a" /* AppModule */]);
//# sourceMappingURL=main.js.map

/***/ }),

/***/ 95:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(3);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__Item__ = __webpack_require__(60);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__items_service__ = __webpack_require__(37);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__item_add_component__ = __webpack_require__(62);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__common_snack_bar_component__ = __webpack_require__(61);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__angular_material__ = __webpack_require__(36);
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
    function AppComponent(itemsService, snackBar) {
        this.itemsService = itemsService;
        this.snackBar = snackBar;
        this.item = new __WEBPACK_IMPORTED_MODULE_1__Item__["a" /* Item */]();
        this.items = [];
        this.title = "Item List Editor";
        this.devMode = false;
    }
    //NOTE:deprecated. The item is always retrieved from the server
    AppComponent.prototype.getItemIndexFromId = function (id) {
        for (var i = 0; i < this.items.length; i++) {
            if (this.items[i].id == id) {
                return this.items[i];
            }
        }
        return null;
    };
    AppComponent.prototype.setDevMode = function (event) {
        this.devMode = event.checked;
        this.itemFormComponent.onDevModeToggle(this.devMode);
    };
    AppComponent.prototype.onItemAdded = function (event) {
        console.log("onItemAdded event received by app.component", event);
        this.refreshList();
    };
    AppComponent.prototype.onException = function (error) {
        this.openSnackBar(error, "alert");
    };
    AppComponent.prototype.onItemSelect = function (id) {
        var _this = this;
        this.itemsService.getItem(id).then(function (item) {
            _this.item = item;
            _this.itemFormComponent.onSelected(_this.item);
        }).catch(function (exc) {
            _this.openSnackBar("could not find item with id " + id, "alert");
        });
    };
    AppComponent.prototype.onItemRemove = function (id) {
        var _this = this;
        this.itemsService.deleteItem(id).then(function (removedItem) {
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
            if (!items) {
                _this.openSnackBar("could not fetch items from server", "alert");
                items = [];
            }
            if (items.length > 0) {
                items.sort(function (a, b) {
                    return a.creationDate - b.creationDate;
                });
                _this.items = items;
                _this.item = _this.items[0];
            }
        })
            .catch(function (exception) {
            _this.openSnackBar(exception, "alert");
        });
    };
    AppComponent.prototype.openSnackBar = function (msg, type) {
        var currentSnackBar = this.snackBar.openFromComponent(__WEBPACK_IMPORTED_MODULE_4__common_snack_bar_component__["a" /* SnackBarMessageComponent */], {
            duration: 3000
        });
        currentSnackBar.instance.message = msg;
        currentSnackBar.instance.type = type;
    };
    return AppComponent;
}());
__decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["h" /* ViewChild */])(__WEBPACK_IMPORTED_MODULE_3__item_add_component__["a" /* ItemFormComponent */]),
    __metadata("design:type", typeof (_a = typeof __WEBPACK_IMPORTED_MODULE_3__item_add_component__["a" /* ItemFormComponent */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_3__item_add_component__["a" /* ItemFormComponent */]) === "function" && _a || Object)
], AppComponent.prototype, "itemFormComponent", void 0);
AppComponent = __decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["c" /* Component */])({
        selector: 'app',
        providers: [__WEBPACK_IMPORTED_MODULE_2__items_service__["a" /* ItemsService */]],
        entryComponents: [
            __WEBPACK_IMPORTED_MODULE_4__common_snack_bar_component__["a" /* SnackBarMessageComponent */]
        ],
        template: "\n\n    <md-toolbar color=\"primary\">\n\n      <span>{{title}}</span>\n\n      <span class=\"toolbar-spacer\"></span>\n\n      <button md-icon-button [mdMenuTriggerFor]=\"menu\">\n        <md-icon>more_vert</md-icon>\n      </button>\n\n    </md-toolbar>\n\n    <md-menu #menu=\"mdMenu\">\n      <button md-menu-item>\n        <md-icon>settings</md-icon>\n        <span>Settings</span>\n      </button>\n      <button md-menu-item>\n        <md-icon>help</md-icon>\n        <span>Help</span>\n      </button>\n    </md-menu>\n\n\n    <item-form (onException)=\"onException($event)\" (onItemAdded)=\"onItemAdded($event)\">new form here...</item-form>\n\n    <div class=\"itemListContainer\">\n\n      <h3 class=\"listHeader\">{{items.length > 0 ? items.length: 'Empty'}} item{{items.length > 1 ? 's' : ''}} in the list:</h3>\n\n      <md-card *ngFor=\"let item of items\" class=\"itemCard\">\n\n        <md-card-header>\n\n          <div md-card-avatar class=\"example-header-image\"></div>\n          <md-card-title>{{item.name}}</md-card-title>\n          <md-card-subtitle *ngIf=\"devMode\">{{item.id}}</md-card-subtitle>\n          <md-card-content>\n            <p>\n              {{item.description}}\n            </p>\n          </md-card-content>\n\n          <span class=\"toolbar-spacer\"></span>\n\n          <md-card-actions>\n            <button md-raised-button md-button (click)=\"onItemSelect(item.id)\">SELECT</button>\n            <button md-button class=\"deleteItemBtn\" (click)=\"onItemRemove(item.id)\">DELETE</button>\n          </md-card-actions>\n\n        </md-card-header>\n\n      </md-card>\n\n    </div>\n\n    <md-slide-toggle\n      class=\"example-margin\"\n      [color]=\"color\"\n      [checked]=\"checked\"\n      [disabled]=\"disabled\"\n      (change)=\"setDevMode($event)\"\n    >\n      debug mode\n    </md-slide-toggle>\n  "
    }),
    __metadata("design:paramtypes", [typeof (_b = typeof __WEBPACK_IMPORTED_MODULE_2__items_service__["a" /* ItemsService */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_2__items_service__["a" /* ItemsService */]) === "function" && _b || Object, typeof (_c = typeof __WEBPACK_IMPORTED_MODULE_5__angular_material__["k" /* MdSnackBar */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_5__angular_material__["k" /* MdSnackBar */]) === "function" && _c || Object])
], AppComponent);

var _a, _b, _c;
//# sourceMappingURL=app.component.js.map

/***/ }),

/***/ 96:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(3);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_platform_browser__ = __webpack_require__(16);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__angular_forms__ = __webpack_require__(59);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__angular_http__ = __webpack_require__(35);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__angular_platform_browser_animations__ = __webpack_require__(94);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__angular_material__ = __webpack_require__(36);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__app_component__ = __webpack_require__(95);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7__item_add_component__ = __webpack_require__(62);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_8__items_service__ = __webpack_require__(37);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_9__common_snack_bar_component__ = __webpack_require__(61);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return AppModule; });
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};




//adding animation module to be used with material






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
            __WEBPACK_IMPORTED_MODULE_3__angular_http__["a" /* HttpModule */],
            __WEBPACK_IMPORTED_MODULE_4__angular_platform_browser_animations__["a" /* BrowserAnimationsModule */],
            //materials modules
            __WEBPACK_IMPORTED_MODULE_5__angular_material__["a" /* MdButtonModule */], __WEBPACK_IMPORTED_MODULE_5__angular_material__["b" /* MdCardModule */], __WEBPACK_IMPORTED_MODULE_5__angular_material__["c" /* MdMenuModule */], __WEBPACK_IMPORTED_MODULE_5__angular_material__["d" /* MdToolbarModule */], __WEBPACK_IMPORTED_MODULE_5__angular_material__["e" /* MdIconModule */], __WEBPACK_IMPORTED_MODULE_5__angular_material__["f" /* MdSlideToggleModule */], __WEBPACK_IMPORTED_MODULE_5__angular_material__["g" /* MdInputModule */], __WEBPACK_IMPORTED_MODULE_5__angular_material__["h" /* MdGridListModule */], __WEBPACK_IMPORTED_MODULE_5__angular_material__["i" /* MdListModule */], __WEBPACK_IMPORTED_MODULE_5__angular_material__["j" /* MdSnackBarModule */]
        ],
        providers: [__WEBPACK_IMPORTED_MODULE_8__items_service__["a" /* ItemsService */]],
        declarations: [__WEBPACK_IMPORTED_MODULE_6__app_component__["a" /* AppComponent */], __WEBPACK_IMPORTED_MODULE_7__item_add_component__["a" /* ItemFormComponent */], __WEBPACK_IMPORTED_MODULE_9__common_snack_bar_component__["a" /* SnackBarMessageComponent */]],
        bootstrap: [__WEBPACK_IMPORTED_MODULE_6__app_component__["a" /* AppComponent */]],
        entryComponents: [__WEBPACK_IMPORTED_MODULE_9__common_snack_bar_component__["a" /* SnackBarMessageComponent */]]
    })
], AppModule);

//# sourceMappingURL=app.module.js.map

/***/ }),

/***/ 97:
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
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["g" /* Injectable */])(),
    __metadata("design:paramtypes", [])
], UtilityService);

var UtilityService_1;
//# sourceMappingURL=utility.service.js.map

/***/ }),

/***/ 98:
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

},[211]);
//# sourceMappingURL=main.bundle.js.map