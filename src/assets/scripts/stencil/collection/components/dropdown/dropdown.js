export class Dropdown {
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
    static get style() { return "/**style-placeholder:ui-dropdown:**/"; }
}
