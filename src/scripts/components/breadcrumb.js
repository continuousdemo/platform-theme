import { breadcrumb } from 'ne-theme-framework-dev/src/framework/components/breadcrumb';

// Breadcrumb
Drupal.behaviors.europa_breadcrumb = {
  attach: () => breadcrumb('#breadcrumb', Drupal.europa.breakpoints),
};
