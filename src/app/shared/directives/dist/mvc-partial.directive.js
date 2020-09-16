"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
exports.__esModule = true;
exports.MvcPartialDirective = exports.createComponentFactory = void 0;
var core_1 = require("@angular/core");
var router_1 = require("@angular/router");
var common_1 = require("@angular/common");
//   import {Http} from "@angular/http";
require("rxjs/add/operator/map");
function createComponentFactory(compiler, metadata) {
    var cmpClass = /** @class */ (function () {
        function DynamicComponent() {
        }
        return DynamicComponent;
    }());
    var decoratedCmp = core_1.Component(metadata)(cmpClass);
    var DynamicHtmlModule = /** @class */ (function () {
        function DynamicHtmlModule() {
        }
        DynamicHtmlModule = __decorate([
            core_1.NgModule({ imports: [common_1.CommonModule, router_1.RouterModule], declarations: [decoratedCmp] })
        ], DynamicHtmlModule);
        return DynamicHtmlModule;
    }());
    return compiler.compileModuleAndAllComponentsAsync(DynamicHtmlModule)
        .then(function (moduleWithComponentFactory) {
        return moduleWithComponentFactory.componentFactories.find(function (x) { return x.componentType === decoratedCmp; });
    });
}
exports.createComponentFactory = createComponentFactory;
var MvcPartialDirective = /** @class */ (function () {
    function MvcPartialDirective(vcRef, compiler, http) {
        this.vcRef = vcRef;
        this.compiler = compiler;
        this.http = http;
        this.html = '<p></p>';
    }
    MvcPartialDirective.prototype.ngOnInit = function () {
        var _this = this;
        this.http.get(this.url)
            // .map(res => res.text())
            .subscribe(function (html) {
            _this.html = html;
            if (!html)
                return;
            if (_this.cmpRef) {
                _this.cmpRef.destroy();
            }
            var compMetadata = new core_1.Component({
                selector: 'dynamic-html',
                template: _this.html
            });
            createComponentFactory(_this.compiler, compMetadata)
                .then(function (factory) {
                var injector = core_1.ReflectiveInjector.fromResolvedProviders([], _this.vcRef.parentInjector);
                _this.cmpRef = _this.vcRef.createComponent(factory, 0, injector, []);
            });
        }, function (err) { return console.log(err); }, function () { return console.log('MvcPartial complete'); });
    };
    MvcPartialDirective.prototype.ngOnDestroy = function () {
        if (this.cmpRef) {
            this.cmpRef.destroy();
        }
    };
    __decorate([
        core_1.Input()
    ], MvcPartialDirective.prototype, "url");
    MvcPartialDirective = __decorate([
        core_1.Directive({ selector: 'mvc-partial' })
    ], MvcPartialDirective);
    return MvcPartialDirective;
}());
exports.MvcPartialDirective = MvcPartialDirective;
