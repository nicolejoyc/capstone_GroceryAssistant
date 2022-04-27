class InterfaceComponent {
  constructor(parent) {
    this.parent = parent;
  }
}

/*
 * Interface Toolbar
 */
class InterfaceToolbar extends InterfaceComponent {
  constructor(parent) {
    super(parent);
    this.$addIcon = null;
    this.$editIcon = null;
    this.$deleteIcon = null;
    this.$searchControl = null;
    this.init();
  }

  init() {
    this.$addIcon = $('#add-icon');
    this.$editIcon = $('#edit-icon');
    this.$deleteIcon = $('#delete-icon');
    this.$searchControl = $('#search-control');
    this.enableIcon(this.$addIcon);
    this.disableIcon(this.$editIcon);
    this.disableIcon(this.$deleteIcon);

    this.$searchControl.keydown((e) => {
      console.log("search change");
    });
  }

  // Add icon apperance / behavior
  enableAddIcon() {
    this.enableIcon(this.$addIcon);
  }
  disableAddIcon() {
    this.disableIcon(this.$addIcon);
  }
  // Edit icon apperance / behavior
  enableEditIcon() {
    this.enableIcon(this.$editIcon);
  }
  disableEditIcon() {
    this.disableIcon(this.$editIcon);
    this.$editIcon.prop('disabled', false);
  }
  // Delete icon apperance / behavior
  enableDeleteIcon() {
    this.enableIcon(this.$deleteIcon);
  }
  disableDeleteIcon() {
    this.disableIcon(this.$deleteIcon);
  }

  // Enable / disable icon controls
  enableIcon($icon) {
    $icon.addClass('icon-active');
    $icon.removeClass('icon-inactive');
  }
  disableIcon($icon) {
    $icon.addClass('icon-inactive');
    $icon.removeClass('icon-active');
  }
}

/*
 * Define button state constants
 */
const ButtonState = {
  Active: 'Active',
  Inactive: 'Inactive',
  Disabled: 'Disabled',
};

/*
 * Interface Button
 */
class InterfaceButton extends InterfaceComponent {
  constructor(buttonList, name, id) {
    super(buttonList);
    this.name = name;
    this.id = id;
    this.$button = null;
    this.state = ButtonState.Inactive;
    this.init();
  }

  init() {
    this.$button = $(`#${this.id}`);
    this.$button.click((e) => {
      this.removeClassAttribute();
      if(this.state === ButtonState.Active) {
        this.deactivate();
      } else {
        this.activate();
      }
      this.parent.buttonStateChange(this);
    });
    this.deactivate();
  }

  // Control button appearance / state
  activate() {
    this.$button.addClass('list-button-active');
    this.$button.prop('disabled', false);
    this.state = ButtonState.Active;
  }
  deactivate() {
    this.$button.addClass('list-button-inactive');
    this.$button.prop('disabled', false);
    this.state = ButtonState.Inactive;
  }
  disable() {
    this.$button.addClass('list-button-disabled');
    this.$button.prop('disabled', true);
    this.state = ButtonState.Disabled;
  }

  removeClassAttribute() {
    switch(this.state) {
      case ButtonState.Active:
        this.$button.removeClass('list-button-active');
        break;
      case ButtonState.Inactive:
        this.$button.removeClass('list-button-inactive');
        break;
      case ButtonState.Disabled:
        this.$button.removeClass('list-button-disabled');
        break;
    }
  }
}

class InterfaceButtonList extends InterfaceComponent {
  constructor(parent) {
    super(parent);
    this.buttons = [];
    this.init();
  }

  init() {
    $('.list-button').each((index, e) => {
      this.buttons.push({
        'button': new InterfaceButton(this, String($(e).text()).trim(), e.id),
        'state': ButtonState.Inactive
      });
    });
  }

  buttonStateChange(button) {
    let buttonElement = this.buttons.find((element) => element.button.id === button.id);
    if( buttonElement !== -1 )  {
      buttonElement.state = button.state;
    }
    this.parent.buttonStateChange(this);
  }

  // Button active state
  getActiveCount()   { return this.getActiveButtons().length; }
  getActiveButtons() { return this.filterButtonsByState(ButtonState.Active); }

  // Get button by state
  filterButtonsByState(state) {
    return this.buttons.filter(function(button) { 
        return button.state === state;
    });
  }
}

/*
 * Interface Button List (One Active)
 *
 *  The button list only allows a single button within the list
 *  to be selected (active) at any given time.
 */
class InterfaceButtonList_SelectOne extends InterfaceButtonList {
  constructor(parent) {
    super(parent);
  }

  buttonStateChange(button) {
    let activeButtons = this.filterButtonsByState(ButtonState.Active);
    activeButtons.forEach(element => {
      element.button.deactivate();
      element.state = ButtonState.Inactive;
    });
    super.buttonStateChange(button);
  }
}

/*
 * Control Interface
 */
class ControlInterface {
  constructor() {
    this.toolbar =null;
    this.buttonList =null;
    this.init();
  }

  init() {
    this.toolbar = new InterfaceToolbar(this);
    this.buttonList = new InterfaceButtonList(this);
  }

  buttonStateChange(component) {
    switch(this.buttonList.getActiveCount()) {
      case 0:
        this.toolbar.enableAddIcon();
        this.toolbar.disableEditIcon();
        this.toolbar.disableDeleteIcon();
        break;
      case 1:
        this.toolbar.disableAddIcon();
        this.toolbar.enableEditIcon();
        this.toolbar.enableDeleteIcon();
        break;
      default:
        this.toolbar.disableAddIcon();
        this.toolbar.disableEditIcon();
        this.toolbar.enableDeleteIcon();
    }
  }
}

// Create Control Interface
let controlInterface = new ControlInterface();