$(() => {
  // Put container in a cache variable
  const $container = $('div.switcher');

  // Clear all current buttons inside container
  $container.find('button').remove();

  // Create a new styleSwitcher with one default button named 'Defecto'
  const switcher = new StyleSwitcher('Defecto');

  // Add some optionals buttons. Any of this buttons can be omited without compromise app's functionality
  switcher.addButton('Estrecho', 'narrow');
  switcher.addButton('Grande', 'large');

  // Launch our switcher
  switcher.enable();

  // Hide StyleSwitcher content
  $container.click();
});
