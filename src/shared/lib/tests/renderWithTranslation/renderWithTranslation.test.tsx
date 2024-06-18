import { renderWithTranslation } from './renderWithTranslation';
import { TestComponent } from './testComponent';

describe('GreetingComponent', () => {
  test('renders correctly in default language', () => {
    const { getByText } = renderWithTranslation(TestComponent());

    expect(getByText('Hello')).toBeInTheDocument();
  });

  test('renders correctly in a different language', () => {
    // Предполагается, что в i18nForTests настроено переключение языков,
    // либо вы настраиваете мок i18n с нужным языком предварительно
    i18nForTests.changeLanguage('fr');
    const { getByText } = renderWithTranslation(TestComponent());

    // Предполагается, что 'Bonjour' - это перевод 'greeting' на французский в вашем моке i18n
    expect(getByText('Bonjour')).toBeInTheDocument();
  });
});
