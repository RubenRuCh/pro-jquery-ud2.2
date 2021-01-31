/**
 * jQuery style changer using buttons
 */
class StyleSwitcher {
  /**
   * Create a style selector for 'target' inside 'container'
   *
   * An initial button can be added and it will always be the one selected by default
   *
   * @param {String} defaultButtonName
   * @param {String} defaultButtonStyle
   * @param {CSSSelector|HTMLElement} container
   * @param {CSSSelector|HTMLElement} target
   */
  constructor(
    defaultButtonName = 'Default',
    defaultButtonStyle = 'default',
    container = 'div.switcher',
    target = 'main'
  ) {
    this.buttons = [];
    this.addButton(defaultButtonName, defaultButtonStyle);
    this.container = $(container);
    this.target = $(target);

    //  A hover effect will be applied to the container
    this.container.hover(
      () => {
        this.container.addClass('hover');
      },
      () => {
        this.container.removeClass('hover');
      }
    );

    // A click event to be able to hide and show the content of the switcher
    this.container.click(() => {
      this.container.find('button').toggleClass('hidden');
    });
  }

  /**
   * Launch this StyleSwitcher, printing all buttons saved so far
   */
  enable() {
    // Print all buttons added until now
    this.printButtons();

    // Force first button we added to be selected by default. It will always be button created at constructor
    this.container.find('button').first().click();
  }

  /**
   * Add a new button to the StyleSwitcher
   *
   * @param {String} buttonName Text to appear inside <button></button>
   * @param {String} buttonStyle CSS class to be applied to target when this button is clicked
   */
  addButton(buttonName, buttonStyle) {
    this.buttons.push({
      name: buttonName,
      style: buttonStyle,
    });
  }

  /**
   * Get current buttons of the switcher in JSON format
   */
  getButtons() {
    return this.buttons;
  }

  /**
   * Print all saved buttons in StyleSwitcher' container
   *
   */
  printButtons() {
    for (const button of this.getButtons()) {
      this.container.append(
        `<button data-style="${button.style}">${button.name}</button>`
      );
    }

    // Prepare buttons to be clicked
    this.container.find('button').click((event) => {
      this.handleClick(event);
    });
  }

  /**
   * Handles the click event on a switcher button.
   *
   * It will mark the button as 'selected', and it will apply a style to target element depending on the button pressed
   *
   * @param {Event} event
   */
  handleClick(event) {
    // Prevent default behavior
    event.preventDefault();

    // Prevent propagation, so a click on a button doesn't cause a click on the StyleSwitcher
    event.stopPropagation();

    // Remove class for all previous selected buttons in container
    this.container.find('button').removeClass('selected');

    // Get clicked button and mark it as selected
    const $button = $(event.target);
    $button.addClass('selected');

    // Remove previus style on target element and apply a new style based on data-style of clicked button
    this.target.removeClass();
    this.target.addClass($button.data('style'));
  }
}
