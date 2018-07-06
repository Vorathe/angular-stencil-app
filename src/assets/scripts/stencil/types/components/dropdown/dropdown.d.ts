import '../../stencil.core';
import '../../stencil.core';
import '../../stencil.core';
import { EventEmitter } from '../../stencil.core';
export declare class Dropdown {
    host: any;
    label: string;
    icon: 'caret' | 'angle';
    isOpen: boolean;
    isAnimating: boolean;
    onClickCallback: EventEmitter;
    toggleDropdown(): void;
    handleOffClick(event: Event): void;
    animateList(isOpen: boolean): void;
    playAnimation(animation: any, options: any): void;
    getIconClasses(type: 'caret' | 'angle'): {
        [x: string]: boolean;
    };
    getIconType(type: 'caret' | 'angle', state: boolean): string;
    hostData(): {
        class: {
            'open': boolean;
            'animating': boolean;
        };
        'aria-expanded': boolean;
        tabindex: number;
    };
    render(): JSX.Element[];
}
