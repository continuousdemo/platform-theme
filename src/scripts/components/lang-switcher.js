import { languageSwitcherPage }
  from 'ne-theme-framework-dev/src/framework/components/lang-select-page';

// Lang select page
Drupal.behaviors.languageSwitcherPage = {
  attach: () => languageSwitcherPage(Drupal.europa.breakpoints),
};
