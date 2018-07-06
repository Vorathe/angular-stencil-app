/*! Built with http://stenciljs.com */
const { h } = window.StencilComponents;

class Dropdown {
    constructor() {
        this.icon = 'caret';
        this.isOpen = false;
        this.isAnimating = false;
    }
    toggleDropdown() {
        this.isOpen = !this.isOpen;
        this.onClickCallback.emit(this.isOpen);
        this.animateList(this.isOpen);
    }
    handleOffClick(event) {
        if (!this.host.contains(event.target) && this.isOpen) {
            this.isOpen = false;
            this.animateList(this.isOpen);
        }
    }
    animateList(isOpen) {
        const slideAnimation = [
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
        const animationOptions = {
            direction: 'normal',
            duration: 160,
            iterations: 1,
        };
        isOpen ?
            this.playAnimation(slideAnimation, animationOptions) :
            this.playAnimation(slideAnimation, Object.assign({}, animationOptions, { direction: 'reverse' }));
    }
    playAnimation(animation, options) {
        const list = this.host.shadowRoot.querySelector('div.dropdown-list');
        const listAnimation = (options) => list.animate(animation, options);
        this.isAnimating = true;
        listAnimation(options).play();
        listAnimation(options).onfinish = () => { this.isAnimating = false; };
    }
    getIconClasses(type) {
        return {
            [this.getIconType(type, this.isOpen)]: true
        };
    }
    getIconType(type, state) {
        return `icon-${type}-${state ? 'up' : 'down'}`;
    }
    hostData() {
        return {
            class: {
                'open': this.isOpen,
                'animating': this.isAnimating
            },
            'aria-expanded': this.isOpen,
            tabindex: -1,
        };
    }
    render() {
        return [
            h("div", { class: "dropdown-header", onClick: () => this.toggleDropdown() },
                h("span", null, this.label),
                h("i", { class: this.getIconClasses(this.icon) })),
            h("div", { class: "dropdown-list" },
                h("slot", null))
        ];
    }
    static get is() { return "ui-dropdown"; }
    static get encapsulation() { return "shadow"; }
    static get properties() { return {
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
    }; }
    static get events() { return [{
            "name": "onClickCallback",
            "method": "onClickCallback",
            "bubbles": true,
            "cancelable": true,
            "composed": true
        }]; }
    static get listeners() { return [{
            "name": "document:click",
            "method": "handleOffClick"
        }]; }
    static get style() { return "i[data-ui-dropdown] {\n  font-family: 'stencil-demo' !important;\n  speak: none;\n  font-style: normal;\n  font-weight: normal;\n  font-variant: normal;\n  text-transform: none;\n  line-height: 1;\n  -webkit-font-smoothing: antialiased;\n  -moz-osx-font-smoothing: grayscale\n}\n.icon-caret-up[data-ui-dropdown]:before {\n  content: \"\\e900\"\n}\n.icon-caret-down[data-ui-dropdown]:before {\n  content: \"\\e901\"\n}\n.icon-angle-up[data-ui-dropdown]:before {\n  content: \"\\ea41\"\n}\n.icon-angle-down[data-ui-dropdown]:before {\n  content: \"\\ea43\"\n}\n.animating[data-ui-dropdown-host]   .dropdown-list[data-ui-dropdown] {\n  display: block\n}\n.open[data-ui-dropdown-host]   .dropdown-list[data-ui-dropdown] {\n  display: block\n}\n.open[data-ui-dropdown-host]   .dropdown-header[data-ui-dropdown] {\n  border-bottom-left-radius: 0;\n  border-bottom-right-radius: 0;\n  font-weight: var(--ui-dropdown-header-font-weight, 400)\n}\n.open[data-ui-dropdown-host]   .dropdown-header[data-ui-dropdown], .dropdown-header[data-ui-dropdown]:hover {\n  color: var(--ui-dropdown-header-active-color, #005cd2)\n}\n[data-ui-dropdown-host]:focus {\n  outline: 0\n}\n[data-ui-dropdown-host]:focus   .dropdown-header[data-ui-dropdown] {\n  -webkit-box-shadow: var(--ui-dropdown-focus-shadow, 0 0 .188rem rgba(0, 98, 255, .75));\n  box-shadow: var(--ui-dropdown-focus-shadow, 0 0 .188rem rgba(0, 98, 255, .75))\n}\n.dropdown-header[data-ui-dropdown] {\n  padding: var(--ui-dropdown-header-padding, .750rem 1.125rem);\n  background-color: var(--ui-dropdown-header-background-color, #fafafa);\n  border: var(--ui-dropdown-border, .063rem solid #cccccc);\n  display: -webkit-box;\n  display: -ms-flexbox;\n  display: flex;\n  -webkit-box-align: center;\n  -ms-flex-align: center;\n  align-items: center;\n  cursor: pointer;\n  border-radius: var(--ui-dropdown-border-radius, .188rem);\n  -webkit-box-shadow: var(--ui-dropdown-box-shadow, 0 0 .188rem rgba(.32, .32, .32, .16));\n  box-shadow: var(--ui-dropdown-box-shadow, 0 0 .188rem rgba(.32, .32, .32, .16));\n  color: var(--ui-dropdown-header-color, #4a4a4a);\n  font-size: var(--ui-dropdown-header-font-size, 1rem);\n  position: relative;\n  z-index: 1\n}\n.dropdown-header[data-ui-dropdown]   span[data-ui-dropdown] {\n  -webkit-box-flex: 1;\n  -ms-flex: 1 0 auto;\n  flex: 1 0 auto\n}\n.dropdown-list[data-ui-dropdown] {\n  display: none;\n  border: var(--ui-dropdown-border, .063rem solid #cccccc);\n  border-top: 0;\n  margin: var(--ui-dropdown-list-margin, -2px 0 0 0);\n  -webkit-box-shadow: var(--ui-dropdown-box-shadow, 0 0 0.188rem rgba(.32, .32, .32, .16));\n  box-shadow: var(--ui-dropdown-box-shadow, 0 0 0.188rem rgba(.32, .32, .32, .16));\n  border-radius: var(--ui-dropdown-border-radius, 3px)\n}"; }
}

export { Dropdown as UiDropdown };
