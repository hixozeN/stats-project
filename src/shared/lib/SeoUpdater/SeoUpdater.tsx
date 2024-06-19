import Helmet from 'react-helmet';
import { I18_CURRENT_LANGUAGE } from 'shared/consts/localstorage';
import {
  CLIENT_URL, DEFAULT_DESCRIPTION, DEFAULT_IMAGE, DEFAULT_KEYWORDS, DEFAULT_TITLE,
} from 'shared/consts/SEO';

export interface SeoUpdaterProps {
  title?: string;
  description?: string;
  OGTitle?: string;
  OGDescription?: string;
  canonicalLink?: string;
  keywords?: string[],
  imageCard?: string;
  noIndex?: boolean;
}

export const SeoUpdater = (props: SeoUpdaterProps) => {
  const {
    title = DEFAULT_TITLE,
    description = null,
    OGTitle = DEFAULT_TITLE,
    OGDescription = DEFAULT_DESCRIPTION,
    canonicalLink = window.location.pathname,
    keywords = [],
    imageCard = DEFAULT_IMAGE,
    noIndex = false,
  } = props;

  const i18Language = localStorage.getItem(I18_CURRENT_LANGUAGE);
  const pageLanguage = i18Language ?? 'ru';

  const metaCanonical = CLIENT_URL + canonicalLink;
  const metaKeywords = keywords.length > 0
    ? `${DEFAULT_KEYWORDS.join(', ')}, ${keywords.join(', ')}`
    : DEFAULT_KEYWORDS.join(', ');
  const metaDescription = description ?? DEFAULT_DESCRIPTION;
  const metaRobots = noIndex ? 'noindex, nofollow' : 'index, follow';

  return (
    // eslint-disable-next-line
    <>
      <Helmet>
        <html lang={pageLanguage} />
        <title>{title}</title>
        <meta name="description" content={metaDescription} />
        <link rel="canonical" href={metaCanonical} />
        <meta name="keywords" content={metaKeywords} />
        <meta name="robots" content={metaRobots} />

        {/* OG TAGS */}
        <meta property="og:url" content={metaCanonical} />
        <meta property="og:title" content={OGTitle} />
        <meta property="og:description" content={OGDescription} />
        <meta property="og:type" content="website" />
        <meta property="og:image" content={imageCard} />
        <meta property="og:image:width" content="1200" />
        <meta property="og:image:height" content="630" />

        {/* IOS TAGS */}
        <meta name="apple-mobile-web-app-title" content="Статистика Tanks Blitz" />
        <meta name="apple-mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-status-bar-style" content="black" />
      </Helmet>
    </>
  );
};
