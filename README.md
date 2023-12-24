[![Published on webcomponents.org](https://img.shields.io/badge/webcomponents.org-published-blue.svg)](https://www.webcomponents.org/element/lalomartins/shoestring-pagination)
[![NPM](https://nodei.co/npm/@lalomartins/shoestring-pagination.png?mini=true)](https://www.npmjs.com/package/@lalomartins/shoestring-pagination)

# \<shoestring-pagination\>

A web component for pagination that uses [Shoelace](https://shoelace.style/) buttons for consistent UI.

Written with [Lit](https://lit.dev/) 3.0, but you can use it anywhere you can use Shoelace!

## Usage

<!--
```
<custom-element-demo>
  <template>
    <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/@shoelace-style/shoelace@2.12.0/cdn/themes/light.css" />
    <script type="module" src="https://cdn.jsdelivr.net/npm/@shoelace-style/shoelace@2.12.0/cdn/shoelace-autoloader.js"></script>
    <script type="module" src="./shoestring-pagination.js"></script>
    <shoestring-pagination
      surrounding-pages="3"
      current="42"
      total="813"
    ></shoestring-pagination>
    <next-code-block></next-code-block>
  </template>
</custom-element-demo>
```
-->

```html
<shoestring-pagination
  hide-on-single-page
  surrounding-pages="3"
  current="42"
  total="813"
></shoestring-pagination>
```

Example use in Lit:

```js
import '@lalomartins/shoestring-pagination';

class MyPagedThing extends LitElement {
  // …

  render() {
    return html`
      <shoestring-pagination
        hide-on-single-page
        surrounding-pages="3"
        current=${currentPage}
        total=${items.length}
        @page-change=${this._setPage}
      ></shoestring-pagination>
    `;
  }
}
customElements.define('my-paged-thing', MyPagedThing);
```

## API

Attributes:

- current - The current page
- total - Total number of items
- page-size (default: 10) - How many items are in a page
- surrounding-pages (default: 2) - How many pages to display before and after current at most
- hide-on-single-page - If set, and all items fit in one page, hide the element

If accessing props directly in JS (or Lit's `.prop=${}`), convert the names to camelCase, e.g. `pageSize`.

Events:

- page-change - Indicates when the page changes; value is in `event.detail.page`

## Install

```
npm i @lalomartins/shoestring-pagination
```

You don't need to import Shoelace on your own code if you're not using it, but you _do_ need to load your own CSS, whether it's from CDN, or from `node_modules`, or copying it into your build. You can check the [Shoelace install instructions](https://shoelace.style/getting-started/installation) for details.

## Screenshots

![Light mode](./docs/Screen%20Shot%202023-12-24%20at%2019.34.27.png)
![Dark mode](./docs/Screen%20Shot%202023-12-24%20at%2019.34.25.png)
