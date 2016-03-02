/**
 * @file
 * This will add the arrow to the select list.
 */

window.addEventListener('DOMContentLoaded', () => {
  const elements = document.getElementsByClassName('form-type-select');
  for (const ind in elements) {
    if (elements.hasOwnProperty(ind)) {
      elements[ind].innerHTML += '<span class="select-list-arrow"></span>';
    }
  }
}, false);
