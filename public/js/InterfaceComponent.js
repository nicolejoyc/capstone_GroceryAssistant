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
  constructor(buttonList, type, name, id) {
    super(buttonList);
    this.name = name;
    this.type = type;
    this.id = id;
    this.$button = null;
    this.state = ButtonState.Inactive;
    this.init();
  }

  init() {
    this.$button = $(`#${this.id}`);
    this.$button.click((e) => {
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
    this.removeClassAttribute();
    this.$button.addClass(`${this.type}-active`);
    this.$button.prop('disabled', false);
    this.state = ButtonState.Active;
  }
  deactivate() {
    this.removeClassAttribute();
    this.$button.addClass(`${this.type}-inactive`);
    this.$button.prop('disabled', false);
    this.state = ButtonState.Inactive;
  }
  disable() {
    this.removeClassAttribute();
    this.$button.addClass(`${this.type}-disabled`);
    this.$button.prop('disabled', true);
    this.state = ButtonState.Disabled;
  }

  removeClassAttribute() {
    switch(this.state) {
      case ButtonState.Active:
        this.$button.removeClass(`${this.type}-active`);
        break;
      case ButtonState.Inactive:
        this.$button.removeClass(`${this.type}-inactive`);
        break;
      case ButtonState.Disabled:
        this.$button.removeClass(`${this.type}-disabled`);
        break;
    }
  }
}

class InterfaceButtonList extends InterfaceComponent {
  constructor(parent, buttonType) {
    super(parent);
    this.buttons = [];
    this.buttonType = buttonType;
    this.init();
  }

  init() {
    $(`.${this.buttonType}`).each((index, e) => {
      this.buttons.push(new InterfaceButton(this, this.buttonType, String($(e).text()).trim(), e.id));
    });
  }

  buttonStateChange(button) {
    this.parent.buttonStateChange(button);
  }

  // Get button
  getButton(index) {
    if(index < this.buttons.length) {
      return this.buttons[index];
    }
  }

  // Button active state
  getActiveCount()   { return this.getActiveButtons().length; }
  getActiveButtons() { return this.filterButtonsByState(ButtonState.Active); }

  // Get index of first active button
  getActiveIndex() { 
    return this.buttons.findIndex(function(button) { 
        return button.state === ButtonState.Active;
    });
  }

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
  constructor(parent, buttonType) {
    super(parent, buttonType);
  }

  buttonStateChange(button) {
    let activeButtons = this.getActiveButtons();
    activeButtons.forEach(listButton => {
      if(listButton.id !== button.id) {
        listButton.deactivate();
      }
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
    this.openButtonList =null;
    this.selectButtonList =null;
    this.init();
  }

  init() {
    this.toolbar = new InterfaceToolbar(this);
    this.openButtonList = new InterfaceButtonList(this, 'open-button');
    this.selectButtonList = new InterfaceButtonList(this, 'select-button');
  }

  buttonStateChange(button) {
    switch(this.selectButtonList.getActiveCount()) {
      case 0:
        this.toolbar.enableAddIcon();
        this.toolbar.disableEditIcon();
        this.toolbar.disableDeleteIcon();
        this.deactivateOpenButton();
        break;
      case 1:
        this.toolbar.disableAddIcon();
        this.toolbar.enableEditIcon();
        this.toolbar.enableDeleteIcon();
        this.deactivateOpenButton();
        this.activateOpenButton(this.selectButtonList.getActiveIndex());
        break;
      default:
        this.toolbar.disableAddIcon();
        this.toolbar.disableEditIcon();
        this.toolbar.enableDeleteIcon();
        this.deactivateOpenButton();
    }
  }

  deactivateOpenButton() {
    let activeButton = this.openButtonList.getActiveButtons()[0];
    if( activeButton ) {
        activeButton.deactivate();
    }
  }

  activateOpenButton(index) {
    if(index !== -1) {
      this.openButtonList.getButton(index).activate();
    }
  }
}

// Create Control Interface
let controlInterface = new ControlInterface();
