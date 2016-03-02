// Bind generic components with Drupal behaviors
import { file } from 'ne-theme-framework-dev/src/framework/components/file';
import { collapse } from 'ne-theme-framework-dev/src/framework/components/collapse';
import { timeline } from 'ne-theme-framework-dev/src/framework/components/timeline';
import { tab } from 'ne-theme-framework-dev/src/framework/components/nav-tabs';
import { equalHeight } from 'ne-theme-framework-dev/src/framework/utilities/equal-height';

Drupal.europa = Drupal.europa || {};
Drupal.europa.breakpoints = Drupal.europa.breakpoints || {};

// TODO:
// Populate the breakpoints with those comming from Breakpoints module.
// @see breakpoints js module for potential solution.
Drupal.europa.breakpoints.medium = 'screen and (min-width: 480px)';
Drupal.europa.breakpoints.small = 'screen and (min-width: 768px)';

// File
Drupal.behaviors.dt_file = { attach: file };

// Timeline
Drupal.behaviors.timeline = { attach: () => timeline(Drupal.t('Show all timeline')) };

// Tabs
Drupal.behaviors.europa_tabs = { attach: tab };

// Equal height blocks
Drupal.behaviors.equal_blocks = { attach: () => equalHeight(Drupal.europa.breakpoints) };

// Collapse
Drupal.europa.collapsing = (showText, hideText) => {
  if (!showText) {
    showText = Drupal.t("Show");
  }

  if (!hideText) {
    hideText = Drupal.t("Hide");
  }

  return collapse(showText, hideText);
};

Drupal.behaviors.europa_collapse = {
  attach: () => Drupal.europa.collapsing(),
};

// Piwik
const trackElements = [];
window.PiwikDTT = {
  /**
   * Acts like a wrapper for Piwik push method.
   *
   * For Piwik parameters refer to {@see https://developer.piwik.org/guides/tracking-javascript-guide}
   *
   * @param int {triggerValue}
   *   How many times should the call be triggered by page load
   *   Accepts 0,1 (0 for always and 1 just for one time).
   * @param str {action}
   *   Defines Action in piwik.
   * @param str {category}
   *   Defines category in piwik.
   * @param {value}
   *  Defines category in piwik.
   * @param {data}
   *  Defines category in piwik.
   */
  sendTrack: (triggerValue, action, category, value, data) => {
    if (typeof action === 'undefined' || action === null || action === '') {
      action = 'trackEvent';
    }

    // Trigger only once.
    if (triggerValue === 1) {
      const innerElements = (triggerValue + action + category + value + data);
      if (jQuery.inArray(innerElements, trackElements) === -1) {
        trackElements.push(innerElements);
        if (typeof _paq !== 'undefined') {
          _paq.push([action, category, value, data]);
        }
      }
    }

    // Always trigger.
    if (triggerValue === 0) {
      if (typeof _paq !== 'undefined') {
        _paq.push([action, category, value, data]);
      }
    }
  },
};
