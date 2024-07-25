import { render } from '@testing-library/react';
import Helmet from 'react-helmet';
import { I18_CURRENT_LANGUAGE } from 'shared/consts/localstorage';
import {
  DEFAULT_DESCRIPTION, DEFAULT_KEYWORDS, DEFAULT_TITLE, CLIENT_URL, DEFAULT_IMAGE,
} from '../../consts/SEO';
import { SeoUpdater, SeoUpdaterProps } from './SeoUpdater';

describe('SeoUpdater with default props', () => {
  beforeEach(() => {
    render(<SeoUpdater />);
  });

  test('correctly sets the html lang attribute', () => {
    const helmet = Helmet.peek();
    expect(helmet.htmlAttributes).toEqual({ lang: 'ru' });
  });

  test('sets the default title', () => {
    const helmet = Helmet.peek();
    expect(helmet.title).toEqual(DEFAULT_TITLE);
  });

  test('sets the correct canonical link', () => {
    const helmet = Helmet.peek();
    expect(helmet.linkTags).toEqual(
      expect.arrayContaining([
        expect.objectContaining({
          href: `${CLIENT_URL}${window.location.pathname}`,
          rel: 'canonical',
        }),
      ]),
    );
  });

  test('sets the default description meta tag', () => {
    const helmet = Helmet.peek();
    expect(helmet.metaTags).toEqual(
      expect.arrayContaining([
        expect.objectContaining({ name: 'description', content: DEFAULT_DESCRIPTION }),
      ]),
    );
  });

  test('includes default keywords in the meta tags', () => {
    const helmet = Helmet.peek();
    expect(helmet.metaTags).toEqual(
      expect.arrayContaining([
        expect.objectContaining({ name: 'keywords', content: DEFAULT_KEYWORDS.join(', ') }),
      ]),
    );
  });

  test('sets default Open Graph meta tags', () => {
    const helmet = Helmet.peek();
    expect(helmet.metaTags).toEqual(
      expect.arrayContaining([
        expect.objectContaining({ property: 'og:title', content: DEFAULT_TITLE }),
        expect.objectContaining({ property: 'og:description', content: DEFAULT_DESCRIPTION }),
        expect.objectContaining({ property: 'og:image', content: DEFAULT_IMAGE }),
        expect.objectContaining({ property: 'og:url', content: `${CLIENT_URL}${window.location.pathname}` }),
        expect.objectContaining({ property: 'og:type', content: 'website' }),
      ]),
    );
  });

  test('correctly defaults the robots meta tag to index and follow', () => {
    const helmet = Helmet.peek();
    expect(helmet.metaTags).toEqual(
      expect.arrayContaining([
        expect.objectContaining({ name: 'robots', content: 'index, follow' }),
      ]),
    );
  });
});

describe('SeoUpdater with custom props', () => {
  let customProps: SeoUpdaterProps = {};

  beforeEach(() => {
    customProps = {
      ...customProps,
      title: 'Custom Title',
      description: 'Custom Description',
      keywords: ['custom', 'keywords'],
      canonicalLink: '/custom-canonical-link',
      OGTitle: 'Custom OG Title',
      OGDescription: 'Custom OG Description',
      imageCard: 'custom-image.jpg',
      noIndex: true,
    };

    render(<SeoUpdater {...customProps} />);
  });

  test('sets custom title tag', () => {
    const helmet = Helmet.peek();
    expect(helmet.title).toEqual(customProps.title);
  });

  test('sets custom canonical link', () => {
    const helmet = Helmet.peek();
    expect(helmet.linkTags).toEqual(
      expect.arrayContaining([
        expect.objectContaining({ href: `${CLIENT_URL}${customProps.canonicalLink}`, rel: 'canonical' }),
      ]),
    );
  });

  test('sets custom description meta tag', () => {
    const helmet = Helmet.peek();
    expect(helmet.metaTags).toEqual(
      expect.arrayContaining([
        expect.objectContaining({ name: 'description', content: customProps.description }),
      ]),
    );
  });

  test('sets custom keywords meta tag', () => {
    const helmet = Helmet.peek();
    expect(helmet.metaTags).toEqual(
      expect.arrayContaining([
        expect.objectContaining({
          name: 'keywords',
          content: `${DEFAULT_KEYWORDS.join(', ')}, ${customProps.keywords.join(', ')}`,
        }),
      ]),
    );
  });

  test('sets custom Open Graph tags', () => {
    const helmet = Helmet.peek();
    expect(helmet.metaTags).toEqual(
      expect.arrayContaining([
        expect.objectContaining({ property: 'og:title', content: customProps.OGTitle }),
        expect.objectContaining({ property: 'og:description', content: customProps.OGDescription }),
        expect.objectContaining({ property: 'og:image', content: customProps.imageCard }),
        expect.objectContaining({ property: 'og:url', content: `${CLIENT_URL}${customProps.canonicalLink}` }),
        expect.objectContaining({ property: 'og:type', content: 'website' }),
      ]),
    );
  });

  test('sets robots meta tag based on noIndex prop', () => {
    const helmet = Helmet.peek();
    expect(helmet.metaTags).toEqual(
      expect.arrayContaining([
        expect.objectContaining({ name: 'robots', content: 'noindex, nofollow' }),
      ]),
    );
  });
});

describe('SeoUpdater with dynamic language settings', () => {
  beforeEach(() => {
    localStorage.clear();
    jest.resetModules();
  });

  afterEach(() => {
    localStorage.clear();
  });

  test('Correctly sets html lang attribute to "en"', () => {
    global.localStorage.setItem(I18_CURRENT_LANGUAGE, 'en');
    render(<SeoUpdater />);
    const helmet = Helmet.peek();
    expect(helmet.htmlAttributes).toEqual({ lang: 'en' });
  });

  test('Correctly sets html lang attribute to "fr" (for French language)', () => {
    global.localStorage.setItem(I18_CURRENT_LANGUAGE, 'fr');
    render(<SeoUpdater />);
    const helmet = Helmet.peek();
    expect(helmet.htmlAttributes).toEqual({ lang: 'fr' });
  });

  test('Default html lang attribute to "ru" when no language is set', () => {
    render(<SeoUpdater />);
    const helmet = Helmet.peek();
    expect(helmet.htmlAttributes).toEqual({ lang: 'ru' });
  });
});
