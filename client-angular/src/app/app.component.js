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
var Item_1 = require("./Item");
var items_service_1 = require("./items.service");
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
    core_1.Component({
        selector: 'my-app',
        providers: [items_service_1.ItemsService],
        template: "\n        <h1>{{title}}</h1>\n        <h2>Chosen technology is :{{item.name}}</h2>\n        <p>Technologies:</p>\n        <ul class=\"list-group\">\n            <li *ngFor=\"let item of items\" class=\"list-group-item\">\n                <span>{{item.name}}</span>\n                <button class=\"btn\" (click)=\"onItemClick(item.id)\"> select me</button>\n            </li>\n        </ul>\n        <p *ngIf=\"items.length > 3\">There are many technologies!</p>\n        <div>\n            <input (keyup)=\"onKeyUp($event)\" (keyup.enter)=\"onKeyEnter($event)\" class=\"form-control\" >\n            <p>{{insertedValues}}</p>\n        </div>\n\n\n        <item-form>new form here...</item-form>\n        \n    "
    }),
    __metadata("design:paramtypes", [items_service_1.ItemsService])
], AppComponent);
exports.AppComponent = AppComponent;
var ItemFormComponent = (function () {
    function ItemFormComponent() {
        this.model = new Item_1.Item();
        this.submitted = false;
    }
    ItemFormComponent.prototype.onSubmit = function () {
        this.submitted = true;
        console.log("submtting...", this.submitted);
    };
    ItemFormComponent.prototype.newItem = function () {
        this.model = new Item_1.Item();
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
    core_1.Component({
        selector: "item-form",
        templateUrl: "./item-form-component.html"
    }),
    __metadata("design:paramtypes", [])
], ItemFormComponent);
exports.ItemFormComponent = ItemFormComponent;
//# sourceMappingURL=app.component.js.map