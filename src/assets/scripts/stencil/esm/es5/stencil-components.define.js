// StencilComponents: Custom Elements Define Library, ES Module/ES5 Target
import { defineCustomElement } from './stencil-components.core.js';
import {
  Dropdown
} from './stencil-components.components.js';

export function defineCustomElements(window, opts) {
  defineCustomElement(window, [
    Dropdown
  ], opts);
}