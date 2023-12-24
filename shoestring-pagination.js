/**
 * @license
 * Copyright 2032 Lalo Martins
 * SPDX-License-Identifier: BSD-3-Clause
 */

import {LitElement, css, html} from 'lit';
import '@shoelace-style/shoelace/dist/components/button/button.js';
import '@shoelace-style/shoelace/dist/components/icon-button/icon-button.js';

/**
 * A web component for pagination that uses Shoelace buttons for consistent UI.
 *
 * @fires page-changed - Indicates when the page changes
 */
export class Pagination extends LitElement {
  static properties = {
    current: {
      type: Number,
    },
    pageSize: {
      type: Number,
      attribute: 'page-size',
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
    }

    nav {
      display: flex;
      align-items: center;
    }
  `;

  constructor() {
    super();
    this.current = 1;
    this.pageSize = 10;
    this.surroundingPages = 2;
    this.total = 1;
    this.hideOnSinglePage = false;
  }

  generatePages() {
    const arr = [];
    for (
      let i = Math.max(1, this.current - this.surroundingPages);
      i <= Math.min(this.totalPages, this.current + this.surroundingPages);
      i++
    ) {
      arr.push(i);
    }

    return arr;
  }

  _dispatchPrev() {
    const event = new CustomEvent('page-change', {
      bubbles: true,
      composed: true,
      detail: {page: this.current - 1},
    });

    this.dispatchEvent(event);
  }

  _dispatchNext() {
    const event = new CustomEvent('page-change', {
      bubbles: true,
      composed: true,
      detail: {page: this.current + 1},
    });

    this.dispatchEvent(event);
  }

  render() {
    this.totalPages = Math.ceil(this.total / this.pageSize);
    const pages = this.generatePages();
    return html`
      <nav role="navigation" aria-label="Pagination Navigation">
        ${this.current === 1
          ? null
          : html`
              <sl-icon-button
                name="arrow-left"
                value=${this.current - 1}
                @click=${this._dispatchPrev}
              >
              </sl-icon-button>
            `}
        ${pages[0] === 1
          ? null
          : html`
              <shoestring-pagination-page-button
                page=${1}
              ></shoestring-pagination-page-button>
              …
            `}
        ${pages.map(
          (page) =>
            html`<shoestring-pagination-page-button
              page=${page}
              ?current=${page === this.current}
            ></shoestring-pagination-page-button>`
        )}
        ${pages[pages.length - 1] === this.totalPages
          ? null
          : html`
              …
              <shoestring-pagination-page-button
                page=${this.totalPages}
              ></shoestring-pagination-page-button>
            `}
        ${this.current === this.totalPages
          ? null
          : html`
              <sl-icon-button
                name="arrow-right"
                value=${this.current + 1}
                @click=${this._dispatchNext}
              >
              </sl-icon-button>
            `}
      </nav>
    `;
  }
}
customElements.define('shoestring-pagination', Pagination);
export default Pagination;

export class PaginationPageButton extends LitElement {
  static properties = {page: {type: Number}, current: {type: Boolean}};

  constructor() {
    super();
    this.page = 1;
    this.current = false;
  }

  _dispatch() {
    const event = new CustomEvent('page-change', {
      bubbles: true,
      composed: true,
      detail: {page: this.page},
    });

    this.dispatchEvent(event);
  }

  render() {
    return html`<sl-button
      variant=${this.current ? 'default' : 'text'}
      ?disabled=${this.current}
      value=${this.page}
      @click=${this._dispatch}
    >
      ${this.page}
    </sl-button> `;
  }
}
customElements.define(
  'shoestring-pagination-page-button',
  PaginationPageButton
);
