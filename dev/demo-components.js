/**
 * @license
 * Copyright 2032 Lalo Martins
 * SPDX-License-Identifier: BSD-3-Clause
 */

import {LitElement, css, html} from 'lit';
import {setBasePath} from '@shoelace-style/shoelace/dist/utilities/base-path.js';

import '@shoelace-style/shoelace/dist/components/input/input.js';

setBasePath('/node_modules/@shoelace-style/shoelace/dist');

class DemoBlock extends LitElement {
  static properties = {
    current: {
      type: Number,
    },
    surroundingPages: {
      type: Number,
      attribute: 'surrounding-pages',
    },
    total: {
      type: Number,
    },
    hideOnSinglePage: {
      type: Boolean,
      attribute: 'hide-on-single-page',
    },
  };

  static styles = css`
    :host {
      display: block;
      flex-basis: 600px;
      border: 1px solid var(--sl-color-primary-500);
      border-radius: var(--sl-border-radius-medium);
      padding: 10px 20px;
    }

    h3 {
      margin-top: 0;
    }

    h2 {
      font-family: 'Dancing Script', cursive;
    }

    h2 span {
      border: 1px solid var(--sl-color-neutral-100);
      border-radius: var(--sl-border-radius-medium);
      padding: 5px;
      margin: 5px;
    }

    sl-input {
      --label-width: 3.75rem;
      --gap-width: 1rem;
      margin-bottom: 1rem;
    }

    sl-input::part(form-control) {
      display: grid;
      grid: auto / var(--label-width) 1fr;
      gap: var(--sl-spacing-3x-small) var(--gap-width);
      align-items: center;
    }
  `;

  constructor() {
    super();
    this.current = 1;
    this.surroundingPages = 2;
    this.total = 1;
    this.hideOnSinglePage = false;
  }

  _setPage(event) {
    this.current = event.detail.page;
  }

  _editPage(event) {
    const value = Number(event.target.value);
    if (!isNaN(value)) this.current = value;
  }

  _editTotal(event) {
    const value = Number(event.target.value);
    if (!isNaN(value)) this.total = value;
  }

  render() {
    const items = [];
    const first = (this.current - 1) * 10 + 1;
    for (let i = first; i < first + 10 && i <= this.total; i++)
      items.push(html`<span>${i}</span>`);

    return html`
      <h3>
        With hide-on-single-page ${this.hideOnSinglePage ? 'on' : 'off'} and
        ${this.surroundingPages} surrounding pages
      </h3>
      <h2>${items}</h2>
      <sl-input
        type="number"
        label="Page"
        value=${this.current}
        @sl-change=${this._editPage}
      ></sl-input>
      <sl-input
        type="number"
        label="Items"
        value=${this.total}
        @sl-change=${this._editTotal}
      ></sl-input>
      <div>
        <shoestring-pagination
          ?hide-on-single-page=${this.hideOnSinglePage}
          .surroundingPages=${this.surroundingPages}
          .current=${this.current}
          .total=${this.total}
          @page-change=${this._setPage}
        ></shoestring-pagination>
      </div>
    `;
  }
}
customElements.define('shoestring-pagination-demo-block', DemoBlock);
