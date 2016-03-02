import { filters } from 'ne-theme-framework-dev/src/framework/components/filters';

// Filters
Drupal.behaviors.europa_filters = {
  attach: () => filters(
    Drupal.t('Refine'),
    Drupal.t('Hide'),
    Drupal.t('Clear all'),
    Drupal.settings.europa.exposedBlockId
  ),
};
