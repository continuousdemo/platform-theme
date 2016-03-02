import { pager } from 'ne-theme-framework-dev/src/framework/components/pager';

// Pager
Drupal.behaviors.europa_pager = {
  attach: () => pager(Drupal.t('Page')),
};
