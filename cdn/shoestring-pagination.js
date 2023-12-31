/**
 * @license
 * Copyright 2032 Lalo Martins
 * SPDX-License-Identifier: MIT
 */

import {
  LitElement,
  css,
  html,
} from 'https://cdn.jsdelivr.net/npm/lit@3.0.0/+esm';

/**
 * A web component for pagination that uses Shoelace buttons for consistent UI.
 *
 * @element shoestring-pagination
 *
 * @dependency sl-button
 * @dependency sl-icon-button
 * @dependency sl-visually-hidden
 *
 * @attr {Number} current - The current page
 * @attr {Number} total - Total number of items
 * @attr {Number} [page-size=10] - How many items are in a page
 * @attr {Number} [surrounding-pages=2] - How many pages to display before and after current at most
 * @attr {Boolean} hide-on-single-page - If set, and all items fit in one page, hide the element
 *
 * @fires page-change - Indicates when the page changes; value is in `event.detail.page`
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

    if (this.hideOnSinglePage && this.totalPages < 2) {
      return html`
        <sl-visually-hidden>
          <nav role="navigation" aria-label="Pagination Navigation">
            Pagination not needed as all ${this.total} items fit in one page
          </nav>
        </sl-visually-hidden>
      `;
    }

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
