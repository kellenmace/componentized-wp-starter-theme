'use strict';

/**
 * File navigation.js.
 *
 * Handles toggling the navigation menu for small screens and enables TAB key
 * navigation support for dropdown menus.
 */
(function () {
	var container, buttonContainer, button, menu, links, i, len;

	container = document.getElementById('site-navigation');
	buttonContainer = document.getElementById('menu-toggle-container');
	button = document.getElementById('menu-toggle');

	if (!container || !buttonContainer || !button) {
		return;
	}

	menu = container.getElementsByTagName('ul')[0];

	// Hide menu toggle button container if menu is empty and return early.
	if ('undefined' === typeof menu) {
		buttonContainer.style.display = 'none';
		return;
	}

	menu.setAttribute('aria-expanded', 'false');
	if (-1 === menu.className.indexOf('nav-menu')) {
		menu.className += ' nav-menu';
	}

	button.onclick = function () {
		if (-1 !== container.className.indexOf('toggled')) {
			container.className = container.className.replace(' toggled', '');
			button.setAttribute('aria-expanded', 'false');
			menu.setAttribute('aria-expanded', 'false');
		} else {
			container.className += ' toggled';
			button.setAttribute('aria-expanded', 'true');
			menu.setAttribute('aria-expanded', 'true');
		}
	};

	// Get all the link elements within the menu.
	links = menu.getElementsByTagName('a');

	// Each time a menu link is focused or blurred, toggle focus.
	for (i = 0, len = links.length; i < len; i++) {
		links[i].addEventListener('focus', toggleFocus, true);
		links[i].addEventListener('blur', toggleFocus, true);
	}

	/**
  * Sets or removes .focus class on an element.
  */
	function toggleFocus() {
		var self = this;

		// Move up through the ancestors of the current link until we hit .nav-menu.
		while (-1 === self.className.indexOf('nav-menu')) {

			// On li elements toggle the class .focus.
			if ('li' === self.tagName.toLowerCase()) {
				if (-1 !== self.className.indexOf('focus')) {
					self.className = self.className.replace(' focus', '');
				} else {
					self.className += ' focus';
				}
			}

			self = self.parentElement;
		}
	}

	/**
  * Toggles `focus` class to allow submenu access on tablets.
  */
	(function (container) {
		var touchStartFn,
			i,
			parentLink = container.querySelectorAll('.menu-item-has-children > a, .page_item_has_children > a');

		if ('ontouchstart' in window) {
			touchStartFn = function touchStartFn(e) {
				var menuItem = this.parentNode,
					i;

				if (!menuItem.classList.contains('focus')) {
					e.preventDefault();
					for (i = 0; i < menuItem.parentNode.children.length; ++i) {
						if (menuItem === menuItem.parentNode.children[i]) {
							continue;
						}
						menuItem.parentNode.children[i].classList.remove('focus');
					}
					menuItem.classList.add('focus');
				} else {
					menuItem.classList.remove('focus');
				}
			};

			for (i = 0; i < parentLink.length; ++i) {
				parentLink[i].addEventListener('touchstart', touchStartFn, false);
			}
		}
	})(container);
})();

/**
 * File skip-link-focus-fix.js.
 *
 * Helps with accessibility for keyboard only users.
 *
 * Learn more: https://git.io/vWdr2
 */
(function () {
	var isIe = /(trident|msie)/i.test(navigator.userAgent);

	if (isIe && document.getElementById && window.addEventListener) {
		window.addEventListener('hashchange', function () {
			var id = location.hash.substring(1),
				element;

			if (!/^[A-z0-9_-]+$/.test(id)) {
				return;
			}

			element = document.getElementById(id);

			if (element) {
				if (!/^(?:a|select|input|button|textarea)$/i.test(element.tagName)) {
					element.tabIndex = -1;
				}

				element.focus();
			}
		}, false);
	}
})();
'use strict';

(function () {
	console.log('Here is some component-specific JS.');
})();
//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImdsb2JhbC5qcyIsImNvbXBvbmVudHMuanMiXSwibmFtZXMiOlsiY29udGFpbmVyIiwiYnV0dG9uQ29udGFpbmVyIiwiYnV0dG9uIiwibWVudSIsImxpbmtzIiwiaSIsImxlbiIsImRvY3VtZW50IiwiZ2V0RWxlbWVudEJ5SWQiLCJnZXRFbGVtZW50c0J5VGFnTmFtZSIsInN0eWxlIiwiZGlzcGxheSIsInNldEF0dHJpYnV0ZSIsImNsYXNzTmFtZSIsImluZGV4T2YiLCJvbmNsaWNrIiwicmVwbGFjZSIsImxlbmd0aCIsImFkZEV2ZW50TGlzdGVuZXIiLCJ0b2dnbGVGb2N1cyIsInNlbGYiLCJ0YWdOYW1lIiwidG9Mb3dlckNhc2UiLCJwYXJlbnRFbGVtZW50IiwidG91Y2hTdGFydEZuIiwicGFyZW50TGluayIsInF1ZXJ5U2VsZWN0b3JBbGwiLCJ3aW5kb3ciLCJlIiwibWVudUl0ZW0iLCJwYXJlbnROb2RlIiwiY2xhc3NMaXN0IiwiY29udGFpbnMiLCJwcmV2ZW50RGVmYXVsdCIsImNoaWxkcmVuIiwicmVtb3ZlIiwiYWRkIiwiaXNJZSIsInRlc3QiLCJuYXZpZ2F0b3IiLCJ1c2VyQWdlbnQiLCJpZCIsImxvY2F0aW9uIiwiaGFzaCIsInN1YnN0cmluZyIsImVsZW1lbnQiLCJ0YWJJbmRleCIsImZvY3VzIiwiY29uc29sZSIsImxvZyJdLCJtYXBwaW5ncyI6Ijs7QUFBQTs7Ozs7O0FBTUEsQ0FBRSxZQUFXO0FBQ1osS0FBSUEsU0FBSixFQUFlQyxlQUFmLEVBQWdDQyxNQUFoQyxFQUF3Q0MsSUFBeEMsRUFBOENDLEtBQTlDLEVBQXFEQyxDQUFyRCxFQUF3REMsR0FBeEQ7O0FBRUFOLGFBQVlPLFNBQVNDLGNBQVQsQ0FBeUIsaUJBQXpCLENBQVo7QUFDQVAsbUJBQWtCTSxTQUFTQyxjQUFULENBQXlCLHVCQUF6QixDQUFsQjtBQUNBTixVQUFTSyxTQUFTQyxjQUFULENBQXlCLGFBQXpCLENBQVQ7O0FBRUEsS0FBSyxDQUFFUixTQUFGLElBQWUsQ0FBRUMs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S0ksT0FBTCxFQUFlO0FBQ2QsUUFBSyxDQUFJLHdDQUF3Q1AsSUFBeEMsQ0FBOENPLFFBQVF4QixPQUF0RCxDQUFULEVBQTZFO0FBQzVFd0IsYUFBUUMsUUFBUixHQUFtQixDQUFDLENBQXBCO0FBQ0E7O0FBRURELFlBQVFFLEtBQVI7QUFDQTtBQUNELEdBakJELEVBaUJHLEtBakJIO0FBa0JBO0FBQ0QsQ0F2QkQ7OztBQ2hIQSxDQUFDLFlBQU07QUFDTkMsU0FBUUMsR0FBUixDQUFZLHFDQUFaO0FBQ0EsQ0FGRCIsImZpbGUiOiJtYWluLmpzIiwic291cmNlc0NvbnRlbnQiOlsiLyoqXG4gKiBGaWxlIG5hdmlnYXRpb24uanMuXG4gKlxuICogSGFuZGxlcyB0b2dnbGluZyB0aGUgbmF2aWdhdGlvbiBtZW51IGZvciBzbWFsbCBzY3JlZW5zIGFuZCBlbmFibGVzIFRBQiBrZXlcbiAqIG5hdmlnYXRpb24gc3VwcG9ydCBmb3IgZHJvcGRvd24gbWVudXMuXG4gKi9cbiggZnVuY3Rpb24oKSB7XG5cdHZhciBjb250YWluZXIsIGJ1dHRvbkNvbnRhaW5lciwgYnV0dG9uLCBtZW51LCBsaW5rcywgaSwgbGVuO1xuXG5cdGNvbnRhaW5lciA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCAnc2l0ZS1uYXZpZ2F0aW9uJyApO1xuXHRidXR0b25Db250YWluZXIgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCggJ21lbnUtdG9nZ2xlLWNvbnRhaW5lcicgKTtcblx0YnV0dG9uID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoICdtZW51LXRvZ2dsZScgKTtcblxuXHRpZiAoICEgY29udGFpbmVyIHx8ICEgYnV0dG9uQ29udGFpbmVyIHx8ICEgYnV0dG9uICkge1xuXHRcdHJldHVybjtcblx0fVxuXG5cdG1lbnUgPSBjb250YWluZXIuZ2V0RWxlbWVudHNCeVRhZ05hbWUoICd1bCcgKVswXTtcblxuXHQvLyBIaWRlIG1lbnUgdG9nZ2xlIGJ1dHRvbiBjb250YWluZXIgaWYgbWVudSBpcyBlbXB0eSBhbmQgcmV0dXJuIGVhcmx5LlxuXHRpZiAoICd1bmRlZmluZWQnID09PSB0eXBlb2YgbWVudSApIHtcblx0XHRidXR0b25Db250YWluZXIuc3R5bGUuZGlzcGxheSA9ICdub25lJztcblx0XHRyZXR1cm47XG5cdH1cblxuXHRtZW51LnNldEF0dHJpYnV0ZSggJ2FyaWEtZXhwYW5kZWQnLCAnZmFsc2UnICk7XG5cdGlmICggLTEgPT09IG1lbnUuY2xhc3NOYW1lLmluZGV4T2YoICduYXYtbWVudScgKSApIHtcblx0XHRtZW51LmNsYXNzTmFtZSArPSAnIG5hdi1tZW51Jztcblx0fVxuXG5cdGJ1dHRvbi5vbmNsaWNrID0gZnVuY3Rpb24oKSB7XG5cdFx0aWYgKCAtMSAhPT0gY29udGFpbmVyLmNsYXNzTmFtZS5pbmRleE9mKCAndG9nZ2xlZCcgKSApIHtcblx0XHRcdGNvbnRhaW5lci5jbGFzc05hbWUgPSBjb250YWluZXIuY2xhc3NOYW1lLnJlcGxhY2UoICcgdG9nZ2xlZCcsICcnICk7XG5cdFx0XHRidXR0b24uc2V0QXR0cmlidXRlKCAnYXJpYS1leHBhbmRlZCcsICdmYWxzZScgKTtcblx0XHRcdG1lbnUuc2V0QXR0cmlidXRlKCAnYXJpYS1leHBhbmRlZCcsICdmYWxzZScgKTtcblx0XHR9IGVsc2Uge1xuXHRcdFx0Y29udGFpbmVyLmNsYXNzTmFtZSArPSAnIHRvZ2dsZWQnO1xuXHRcdFx0YnV0dG9uLnNldEF0dHJpYnV0ZSggJ2FyaWEtZXhwYW5kZWQnLCAndHJ1ZScgKTtcblx0XHRcdG1lbnUuc2V0QXR0cmlidXRlKCAnYXJpYS1leHBhbmRlZCcsICd0cnVlJyApO1xuXHRcdH1cblx0fTtcblxuXHQvLyBHZXQgYWxsIHRoZSBsaW5rIGVsZW1lbnRzIHdpdGhpbiB0aGUgbWVudS5cblx0bGlua3MgICAgPSBtZW51LmdldEVsZW1lbnRzQnlUYWdOYW1lKCAnYScgKTtcblxuXHQvLyBFYWNoIHRpbWUgYSBtZW51IGxpbmsgaXMgZm9jdXNlZCBvciBibHVycmVkLCB0b2dnbGUgZm9jdXMuXG5cdGZvciAoIGkgPSAwLCBsZW4gPSBsaW5rcy5sZW5ndGg7IGkgPCBsZW47IGkrKyApIHtcblx0XHRsaW5rc1tpXS5hZGRFdmVudExpc3RlbmVyKCAnZm9jdXMnLCB0b2dnbGVGb2N1cywgdHJ1ZSApO1xuXHRcdGxpbmtzW2ldLmFkZEV2ZW50TGlzdGVuZXIoICdibHVyJywgdG9nZ2xlRm9jdXMsIHRydWUgKTtcblx0fVxuXG5cdC8qKlxuXHQgKiBTZXRzIG9yIHJlbW92ZXMgLmZvY3VzIGNsYXNzIG9uIGFuIGVsZW1lbnQuXG5cdCAqL1xuXHRmdW5jdGlvbiB0b2dnbGVGb2N1cygpIHtcblx0XHR2YXIgc2VsZiA9IHRoaXM7XG5cblx0XHQvLyBNb3ZlIHVwIHRocm91Z2ggdGhlIGFuY2VzdG9ycyBvZiB0aGUgY3VycmVudCBsaW5rIHVudGlsIHdlIGhpdCAubmF2LW1lbnUuXG5cdFx0d2hpbGUgKCAtMSA9PT0gc2VsZi5jbGFzc05hbWUuaW5kZXhPZiggJ25hdi1tZW51JyApICkge1xuXG5cdFx0XHQvLyBPbiBsaSBlbGVtZW50cyB0b2dnbGUgdGhlIGNsYXNzIC5mb2N1cy5cblx0XHRcdGlmICggJ2xpJyA9PT0gc2VsZi50YWdOYW1lLnRvTG93ZXJDYXNlKCkgKSB7XG5cdFx0XHRcdGlmICggLTEgIT09IHNlbGYuY2xhc3NOYW1lLmluZGV4T2YoICdmb2N1cycgKSApIHtcblx0XHRcdFx0XHRzZWxmLmNsYXNzTmFtZSA9IHNlbGYuY2xhc3NOYW1lLnJlcGxhY2UoICcgZm9jdXMnLCAnJyApO1xuXHRcdFx0XHR9IGVsc2Uge1xuXHRcdFx0XHRcdHNlbGYuY2xhc3NOYW1lICs9ICcgZm9jdXMnO1xuXHRcdFx0XHR9XG5cdFx0XHR9XG5cblx0XHRcdHNlbGYgPSBzZWxmLnBhcmVudEVsZW1lbnQ7XG5cdFx0fVxuXHR9XG5cblx0LyoqXG5cdCAqIFRvZ2dsZXMgYGZvY3VzYCBjbGFzcyB0byBhbGxvdyBzdWJtZW51IGFjY2VzcyBvbiB0YWJsZXRzLlxuXHQgKi9cblx0KCBmdW5jdGlvbiggY29udGFpbmVyICkge1xuXHRcdHZhciB0b3VjaFN0YXJ0Rm4sIGksXG5cdFx0XHRwYXJlbnRMaW5rID0gY29udGFpbmVyLnF1ZXJ5U2VsZWN0b3JBbGwoICcubWVudS1pdGVtLWhhcy1jaGlsZHJlbiA+IGEsIC5wYWdlX2l0ZW1faGFzX2NoaWxkcmVuID4gYScgKTtcblxuXHRcdGlmICggJ29udG91Y2hzdGFydCcgaW4gd2luZG93ICkge1xuXHRcdFx0dG91Y2hTdGFydEZuID0gZnVuY3Rpb24oIGUgKSB7XG5cdFx0XHRcdHZhciBtZW51SXRlbSA9IHRoaXMucGFyZW50Tm9kZSwgaTtcblxuXHRcdFx0XHRpZiAoICEgbWVudUl0ZW0uY2xhc3NMaXN0LmNvbnRhaW5zKCAnZm9jdXMnICkgKSB7XG5cdFx0XHRcdFx0ZS5wcmV2ZW50RGVmYXVsdCgpO1xuXHRcdFx0XHRcdGZvciAoIGkgPSAwOyBpIDwgbWVudUl0ZW0ucGFyZW50Tm9kZS5jaGlsZHJlbi5sZW5ndGg7ICsraSApIHtcblx0XHRcdFx0XHRcdGlmICggbWVudUl0ZW0gPT09IG1lbnVJdGVtLnBhcmVudE5vZGUuY2hpbGRyZW5baV0gKSB7XG5cdFx0XHRcdFx0XHRcdGNvbnRpbnVlO1xuXHRcdFx0XHRcdFx0fVxuXHRcdFx0XHRcdFx0bWVudUl0ZW0ucGFyZW50Tm9kZS5jaGlsZHJlbltpXS5jbGFzc0xpc3QucmVtb3ZlKCAnZm9jdXMnICk7XG5cdFx0XHRcdFx0fVxuXHRcdFx0XHRcdG1lbnVJdGVtLmNsYXNzTGlzdC5hZGQoICdmb2N1cycgKTtcblx0XHRcdFx0fSBlbHNlIHtcblx0XHRcdFx0XHRtZW51SXRlbS5jbGFzc0xpc3QucmVtb3ZlKCAnZm9jdXMnICk7XG5cdFx0XHRcdH1cblx0XHRcdH07XG5cblx0XHRcdGZvciAoIGkgPSAwOyBpIDwgcGFyZW50TGluay5sZW5ndGg7ICsraSApIHtcblx0XHRcdFx0cGFyZW50TGlua1tpXS5hZGRFdmVudExpc3RlbmVyKCAndG91Y2hzdGFydCcsIHRvdWNoU3RhcnRGbiwgZmFsc2UgKTtcblx0XHRcdH1cblx0XHR9XG5cdH0oIGNvbnRhaW5lciApICk7XG59ICkoKTtcblxuLyoqXG4gKiBGaWxlIHNraXAtbGluay1mb2N1cy1maXguanMuXG4gKlxuICogSGVscHMgd2l0aCBhY2Nlc3NpYmlsaXR5IGZvciBrZXlib2FyZCBvbmx5IHVzZXJzLlxuICpcbiAqIExlYXJuIG1vcmU6IGh0dHBzOi8vZ2l0LmlvL3ZXZHIyXG4gKi9cbiggZnVuY3Rpb24oKSB7XG5cdHZhciBpc0llID0gLyh0cmlkZW50fG1zaWUpL2kudGVzdCggbmF2aWdhdG9yLnVzZXJBZ2VudCApO1xuXG5cdGlmICggaXNJZSAmJiBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCAmJiB3aW5kb3cuYWRkRXZlbnRMaXN0ZW5lciApIHtcblx0XHR3aW5kb3cuYWRkRXZlbnRMaXN0ZW5lciggJ2hhc2hjaGFuZ2UnLCBmdW5jdGlvbigpIHtcblx0XHRcdHZhciBpZCA9IGxvY2F0aW9uLmhhc2guc3Vic3RyaW5nKCAxICksXG5cdFx0XHRcdGVsZW1lbnQ7XG5cblx0XHRcdGlmICggISAoIC9eW0EtejAtOV8tXSskLy50ZXN0KCBpZCApICkgKSB7XG5cdFx0XHRcdHJldHVybjtcblx0XHRcdH1cblxuXHRcdFx0ZWxlbWVudCA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCBpZCApO1xuXG5cdFx0XHRpZiAoIGVsZW1lbnQgKSB7XG5cdFx0XHRcdGlmICggISAoIC9eKD86YXxzZWxlY3R8aW5wdXR8YnV0dG9ufHRleHRhcmVhKSQvaS50ZXN0KCBlbGVtZW50LnRhZ05hbWUgKSApICkge1xuXHRcdFx0XHRcdGVsZW1lbnQudGFiSW5kZXggPSAtMTtcblx0XHRcdFx0fVxuXG5cdFx0XHRcdGVsZW1lbnQuZm9jdXMoKTtcblx0XHRcdH1cblx0XHR9LCBmYWxzZSApO1xuXHR9XG59ICkoKTtcbiIsIigoKSA9PiB7XG5cdGNvbnNvbGUubG9nKCdIZXJlIGlzIHNvbWUgY29tcG9uZW50LXNwZWNpZmljIEpTLicpO1xufSkoKTtcbiJdfQ==
