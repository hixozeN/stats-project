import i18nForTests from 'shared/config/i18n/i18nForTests';
import { renderWithTranslation } from './renderWithTranslation';
import { TestComponent } from './testComponent';

describe('GreetingComponent', () => {
  test('renders correctly in default language', () => {
    const { getByText } = renderWithTranslation(<TestComponent />);

    expect(getByText('Привет')).toBeInTheDocument();
  });

  test('renders correctly in a different language', () => {
    i18nForTests.changeLanguage('en');

    const { getByText } = renderWithTranslation(<TestComponent />);

    expect(getByText('Hello')).toBeInTheDocument();
  });

  test('renders fallback language content when set to an unspecified language', () => {
    i18nForTests.changeLanguage('fr');

    const { getByText } = renderWithTranslation(<TestComponent />);

    expect(getByText('Привет')).toBeInTheDocument();
  });
});
