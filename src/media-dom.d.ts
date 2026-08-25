export {};

/**
 * DOM selector typings for the media-site client scripts.
 *
 * Astro's static checker can widen CSS-selector results to Element in inline
 * scripts. These literal overloads keep the selectors used by the media UI
 * typed as HTMLElement without weakening unrelated selectors.
 */
declare global {
  interface Document {
    querySelector(selectors: '[data-media-header]'): HTMLElement | null;
    querySelector(selectors: 'header'): HTMLElement | null;
    querySelectorAll(selectors: '.js-article-card'): NodeListOf<HTMLElement>;
  }

  interface Array<T> {
    includes(searchElement: string, fromIndex?: number): boolean;
  }

  interface ReadonlyArray<T> {
    includes(searchElement: string, fromIndex?: number): boolean;
  }
}
