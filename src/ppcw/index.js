var __extends = this && this.__extends || function () {
    var extendStatics = Object.setPrototypeOf || { __proto__: [] } instanceof Array && function (d, b) {
        d.__proto__ = b;
    } || function (d, b) {
        for (var p in b) {
            if (b.hasOwnProperty(p)) d[p] = b[p];
        }
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() {
            this.constructor = d;
        }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
}();
import React from 'react';
import { IDLog } from '../id-log/index';
var PPCW;
(function (PPCW) {
    var Page = function (_super) {
        __extends(Page, _super);
        function Page(props, context) {
            var _this = _super.call(this, props, context) || this;
            _this.type = "page";
            return _this;
        }
        ;
        Page.prototype.getID = function () {
            return IDLog.generatePageID(this);
        };
        return Page;
    }(React.Component);
    PPCW.Page = Page;
    var Part = function (_super) {
        __extends(Part, _super);
        function Part(props, context) {
            var _this = _super.call(this, props, context) || this;
            _this.type = "part";
            return _this;
        }
        ;
        Part.prototype.getID = function () {
            return IDLog.generatePartID(this, this.props.pageID);
        };
        Part.prototype.getComponentID = function (componentID) {
            return IDLog.generateComponentID(componentID, this.getID());
        };
        Part.prototype.getWidgetID = function (id) {
            return IDLog.generateWidgetID(id, this.getID());
        };
        return Part;
    }(React.Component);
    PPCW.Part = Part;
    var Component = function (_super) {
        __extends(Component, _super);
        function Component(props, context) {
            var _this = _super.call(this, props, context) || this;
            _this.type = "component";
            return _this;
        }
        ;
        Component.prototype.getID = function () {
            return IDLog.generateComponentID("" + (this.props.id || ""), this.props.partID);
        };
        Component.prototype.getExtraComponentID = function (componentID) {
            return IDLog.generateComponentID(componentID, this.getID());
        };
        Component.prototype.getWidgetID = function (id) {
            return IDLog.generateWidgetID(id, this.getID());
        };
        return Component;
    }(React.Component);
    PPCW.Component = Component;
    var Widget = function (_super) {
        __extends(Widget, _super);
        function Widget(props, context) {
            var _this = _super.call(this, props, context) || this;
            _this.type = "widget";
            return _this;
        }
        ;
        return Widget;
    }(React.Component);
    PPCW.Widget = Widget;
    var TopPart = function (_super) {
        __extends(TopPart, _super);
        function TopPart(props, context) {
            return _super.call(this, props, context) || this;
        }
        ;
        TopPart.prototype.getID = function () {
            return IDLog.generatePublicPartID(this);
        };
        TopPart.prototype.getComponentID = function (componentID) {
            return IDLog.generateComponentID(componentID, this.getID());
        };
        TopPart.prototype.getWidgetID = function (id) {
            return IDLog.generateWidgetID(id, this.getID());
        };
        return TopPart;
    }(React.Component);
    PPCW.TopPart = TopPart;
})(PPCW || (PPCW = {}));
var Widget = PPCW.Widget;
var Page = PPCW.Page;
var Part = PPCW.Part;
var Component = PPCW.Component;
var TopPart = PPCW.TopPart;
export { PPCW, Page, Part, Component, Widget, TopPart };