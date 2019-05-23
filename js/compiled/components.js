/**
 * On page load, set up an event listener to display an alert when the Example component is clicked.
 */
(() => {

	const displayExampleClickAlert = () => alert('Example component was clicked.');

	const setUpExampleClickHandler = () => {
		document.querySelector('.example-component').addEventListener( 'click', displayExampleClickAlert );
	};

	document.addEventListener( 'DOMContentLoaded', setUpExampleClickHandler );

})();
