/**
 * On page load, set up an event listener to display an alert when the Example component is clicked.
 */
(() => {
  const displayExampleClickAlert = () =>
    alert("Example component was clicked.");

  const setUpExampleClickHandler = () => {
    const exampleComponent = document.querySelector(".example-component");

    // Return if the example component was not found on this page.
    if (!exampleComponent) return;

    exampleComponent.addEventListener("click", displayExampleClickAlert);
  };

  document.addEventListener("DOMContentLoaded", setUpExampleClickHandler);
})();
