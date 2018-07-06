/*! Built with http://stenciljs.com */
import { h } from './stencil-components.core.js';
var Dropdown = /** @class */ (function () {
    function Dropdown() {
        this.icon = 'caret';
        this.isOpen = false;
        this.isAnimating = false;
    }
    Dropdown.prototype.toggleDropdown = function () {
        this.isOpen = !this.isOpen;
        this.onClickCallback.emit(this.isOpen);
        this.animateList(this.isOpen);
    };
    Dropdown.prototype.handleOffClick = function (event) {
        if (!this.host.contains(event.target) && this.isOpen) {
            this.isOpen = false;
            this.animateList(this.isOpen);
        }
    };
    Dropdown.prototype.animateList = function (isOpen) {
        var slideAnimation = [
            {
                transform: 'translate3d(0, -16%, 0)',
                opacity: '0',
                offset: 0
            },
            {
                transform: 'scale(0.98)',
            },
            {
                opacity: '0.6',
                transform: 'scale(1)',
                offset: .88
            },
            {
                transform: 'translate3d(0, 0, 0)',
                opacity: '1',
                offset: 1
            }
        ];
        var animationOptions = {
            direction: 'normal',
            duration: 160,
            iterations: 1,
        };
        isOpen ?
            this.playAnimation(slideAnimation, animationOptions) :
            this.playAnimation(slideAnimation, Object.assign({}, animationOptions, { direction: 'reverse' }));
    };
    Dropdown.prototype.playAnimation = function (animation, options) {
        var _this = this;
        var list = this.host.shadowRoot.querySelector('div.dropdown-list');
        var listAnimation = function (options) { return list.animate(animation, options); };
        this.isAnimating = true;
        listAnimation(options).play();
        listAnimation(options).onfinish = function () { _this.isAnimating = false; };
    };
    Dropdown.prototype.getIconClasses = function (type) {
        var _a;
        return _a = {},
            _a[this.getIconType(type, this.isOpen)] = true,
            _a;
    };
    Dropdown.prototype.getIconType = function (type, state) {
        return "icon-" + type + "-" + (state ? 'up' : 'down');
    };
    Dropdown.prototype.hostData = function () {
        return {
            class: {
                'open': this.isOpen,
                'animating': this.isAnimating
            },
            'aria-expanded': this.isOpen,
            tabindex: -1,
        };
    };
    Dropdown.prototype.render = function () {
        var _this = this;
        return [
            h("div", { class: "dropdown-header", onClick: function () { return _this.toggleDropdown(); } }, h("span", null, this.label), h("i", { class: this.getIconClasses(this.icon) })),
            h("div", { class: "dropdown-list" }, h("slot", null))
        ];
    };
    Object.defineProperty(Dropdown, "is", {
        get: function () { return "ui-dropdown"; },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Dropdown, "encapsulation", {
        get: function () { return "shadow"; },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Dropdown, "properties", {
        get: function () {
            return {
                "host": {
                    "elementRef": true
                },
                "icon": {
                    "type": String,
                    "attr": "icon"
                },
                "isAnimating": {
                    "state": true
                },
                "isOpen": {
                    "state": true
                },
                "label": {
                    "type": String,
                    "attr": "label"
                },
                "toggleDropdown": {
                    "method": true
                }
            };
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Dropdown, "events", {
        get: function () {
            return [{
                    "name": "onClickCallback",
                    "method": "onClickCallback",
                    "bubbles": true,
                    "cancelable": true,
                    "composed": true
                }];
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Dropdown, "listeners", {
        get: function () {
            return [{
                    "name": "document:click",
                    "method": "handleOffClick"
                }];
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Dropdown, "style", {
        get: function () { return "i[data-ui-dropdown] {\n  font-family: 'stencil-demo' !important;\n  speak: none;\n  font-style: normal;\n  font-weight: normal;\n  font-variant: normal;\n  text-transform: none;\n  line-height: 1;\n  -webkit-font-smoothing: antialiased;\n  -moz-osx-font-smoothing: grayscale\n}\n.icon-caret-up[data-ui-dropdown]:before {\n  content: \"\\e900\"\n}\n.icon-caret-down[data-ui-dropdown]:before {\n  content: \"\\e901\"\n}\n.icon-angle-up[data-ui-dropdown]:before {\n  content: \"\\ea41\"\n}\n.icon-angle-down[data-ui-dropdown]:before {\n  content: \"\\ea43\"\n}\n.animating[data-ui-dropdown-host]   .dropdown-list[data-ui-dropdown] {\n  display: block\n}\n.open[data-ui-dropdown-host]   .dropdown-list[data-ui-dropdown] {\n  display: block\n}\n.open[data-ui-dropdown-host]   .dropdown-header[data-ui-dropdown] {\n  border-bottom-left-radius: 0;\n  border-bottom-right-radius: 0;\n  font-weight: var(--ui-dropdown-header-font-weight, 400)\n}\n.open[data-ui-dropdown-host]   .dropdown-header[data-ui-dropdown], .dropdown-header[data-ui-dropdown]:hover {\n  color: var(--ui-dropdown-header-active-color, #005cd2)\n}\n[data-ui-dropdown-host]:focus {\n  outline: 0\n}\n[data-ui-dropdown-host]:focus   .dropdown-header[data-ui-dropdown] {\n  -webkit-box-shadow: var(--ui-dropdown-focus-shadow, 0 0 .188rem rgba(0, 98, 255, .75));\n  box-shadow: var(--ui-dropdown-focus-shadow, 0 0 .188rem rgba(0, 98, 255, .75))\n}\n.dropdown-header[data-ui-dropdown] {\n  padding: var(--ui-dropdown-header-padding, .750rem 1.125rem);\n  background-color: var(--ui-dropdown-header-background-color, #fafafa);\n  border: var(--ui-dropdown-border, .063rem solid #cccccc);\n  display: -webkit-box;\n  display: -ms-flexbox;\n  display: flex;\n  -webkit-box-align: center;\n  -ms-flex-align: center;\n  align-items: center;\n  cursor: pointer;\n  border-radius: var(--ui-dropdown-border-radius, .188rem);\n  -webkit-box-shadow: var(--ui-dropdown-box-shadow, 0 0 .188rem rgba(.32, .32, .32, .16));\n  box-shadow: var(--ui-dropdown-box-shadow, 0 0 .188rem rgba(.32, .32, .32, .16));\n  color: var(--ui-dropdown-header-color, #4a4a4a);\n  font-size: var(--ui-dropdown-header-font-size, 1rem);\n  position: relative;\n  z-index: 1\n}\n.dropdown-header[data-ui-dropdown]   span[data-ui-dropdown] {\n  -webkit-box-flex: 1;\n  -ms-flex: 1 0 auto;\n  flex: 1 0 auto\n}\n.dropdown-list[data-ui-dropdown] {\n  display: none;\n  border: var(--ui-dropdown-border, .063rem solid #cccccc);\n  border-top: 0;\n  margin: var(--ui-dropdown-list-margin, -2px 0 0 0);\n  -webkit-box-shadow: var(--ui-dropdown-box-shadow, 0 0 0.188rem rgba(.32, .32, .32, .16));\n  box-shadow: var(--ui-dropdown-box-shadow, 0 0 0.188rem rgba(.32, .32, .32, .16));\n  border-radius: var(--ui-dropdown-border-radius, 3px)\n}"; },
        enumerable: true,
        configurable: true
    });
    return Dropdown;
}());
export { Dropdown as UiDropdown };
