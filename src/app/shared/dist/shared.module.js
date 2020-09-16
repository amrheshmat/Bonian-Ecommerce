"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
exports.__esModule = true;
exports.SharedModule = void 0;
var core_1 = require("@angular/core");
var navbar_cart_component_1 = require("../modules/cart/components/navbar-cart/navbar-cart.component");
var material_module_1 = require("./modules/material/material.module");
var common_1 = require("@angular/common");
var related_product_component_1 = require("../modules/products/components/related-product/related-product.component");
var product_card_component_1 = require("../modules/products/components/product-card/product-card.component");
var router_1 = require("@angular/router");
var http_1 = require("@angular/common/http");
var forms_1 = require("@angular/forms");
var mvc_partial_directive_1 = require("./directives/mvc-partial.directive");
var SharedModule = /** @class */ (function () {
    function SharedModule() {
    }
    SharedModule = __decorate([
        core_1.NgModule({
            declarations: [
                navbar_cart_component_1.NavbarCartComponent,
                related_product_component_1.RelatedProductComponent,
                product_card_component_1.ProductCardComponent,
                mvc_partial_directive_1.MvcPartialDirective
            ],
            imports: [
                common_1.CommonModule,
                material_module_1.MaterialModule,
                router_1.RouterModule,
                http_1.HttpClientModule,
                forms_1.FormsModule
            ],
            exports: [
                material_module_1.MaterialModule,
                common_1.CommonModule,
                navbar_cart_component_1.NavbarCartComponent,
                related_product_component_1.RelatedProductComponent,
                product_card_component_1.ProductCardComponent,
                router_1.RouterModule,
                http_1.HttpClientModule,
                forms_1.FormsModule,
                mvc_partial_directive_1.MvcPartialDirective
            ],
            providers: []
        })
    ], SharedModule);
    return SharedModule;
}());
exports.SharedModule = SharedModule;
