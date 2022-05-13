class InterfaceComponent {
  constructor(parent) {
    this.parent = parent;
  }
}

/*
 * Define key code constants
 */
const KeyCode = {
  Shift: 16,
  UpArrow: 38,
  DownArrow: 40,
  CarriageReturn : 13
};

/*
 * Interface Search
 */
class InterfaceSearch extends InterfaceComponent {
  constructor(parent, searchSelector, targetSelector) {
    super(parent);
    this.searchSelector = searchSelector;
    this.targetSelector = targetSelector;
    this.matchingTargetIndex = 0;
    this.matchingTargets = [];
    this.searchString = null;
    this.keyCode = null;
    this.init();
  }
  init() {
    $(this.searchSelector).keyup((e) => {
      this.searchString = e.target.value;
      this.keyCode = e.keyCode;
      //console.log(this.keyCode);
      this.search(e);
    });
  }

  /*
   * Search For Match
   *
   *  Parameters:
   *    e: Keyboard keyup event
   *
   *  Purpose:
   *    Process user keyboard input from search toolbar and filter a target
   *    list to only show matching list items. Arrow keys allow movement in
   *    the list of matching items highlighting the current position in the
   *    list. A cariage return selects the highlighted item.
   * 
   */
  search(e) {
    // Search String Not Empty
    if(!this.isSearchStringEmpty()) {
      // Process Key
      switch (this.keyCode) {
        // CARRIAGE RETURN
        case KeyCode.CarriageReturn:
        {
          if(this.matchingTargets.length) {
            let target = $(this.matchingTargets[this.matchingTargetIndex]);
            target.trigger('click');
            $(this.searchSelector).val($(target).text());
            this.disable();
          }
          return;
        }
        // UP ARROW
        case KeyCode.UpArrow:
        {
          // Move up the list
          let targetCount;
          if((targetCount = this.matchingTargets.length)) {
            $(this.matchingTargets[this.matchingTargetIndex]).removeClass('highlight');
            this.matchingTargetIndex = (this.matchingTargetIndex)
              ? this.matchingTargetIndex - 1 : targetCount - 1;
          }
          break;
        }
        // DOWN ARROW
        case KeyCode.DownArrow:
        {
          // Move down the list
          let targetCount;
          if((targetCount = this.matchingTargets.length)) {
            $(this.matchingTargets[this.matchingTargetIndex]).removeClass('highlight');
            this.matchingTargetIndex = (this.matchingTargetIndex + 1)
              % targetCount;
          }
          break;
        }
        // SHIFT
        case KeyCode.Shift:
          return;
        // ALL OTHER KEYS
        default:
        {
          // Search for string match in list
          this.matchingTargets = [];
          const searchString = this.searchString.toLowerCase();
          $(this.targetSelector).each((index, target) => {
              const targetString = $(target).text().toLowerCase();
              if(targetString.indexOf(searchString) !== -1) {
                  this.matchingTargets.push(target);
                  $(target).parent().removeClass('hide').addClass('show');
              } else {
                  $(target).parent().removeClass('show').addClass('hide');
              }
              $(target).removeClass('highlight');
          });
          // Reset to top of list
          if(this.matchingTargets.length) {
            this.matchingTargetIndex = 0;
          }
        }
      }
    }
    // Input empty, reset
    else {
      this.reset();
      return;
    }
    $(this.matchingTargets[this.matchingTargetIndex]).addClass('highlight');
  }

  // Enable search entry
  enable() {
    $(this.searchSelector).attr('disabled', false);
    if(this.matchingTargets.length) {
      $(this.matchingTargets[this.matchingTargetIndex]).addClass('highlight');
    }
  }
  // Disable search entry
  disable() {
    $(this.searchSelector).attr('disabled', true);
    if(this.matchingTargets.length) {
      $(this.matchingTargets[this.matchingTargetIndex]).removeClass('highlight');
    }
  }
  reset() {
    this.matchingTargets = [];
    $(this.searchSelector).val('');
    $(this.targetSelector).each((i, target) => {
      $(target).parent().removeClass('hide').addClass('show');
      $(target).removeClass('highlight');
    });
    this.enable();
  }
  // Access functions
  isSearchStringEmpty() { return this.searchString.length === 0; }
}

/*
 * Interface Icons
 */
class InterfaceIcons extends InterfaceComponent {
  constructor(parent) {
    super(parent);
    this.init();
  }

  init() {
    if($('#view-list-icon').length) {
      this.disableIcon($('#view-list-icon'));
      // View-list icon click hander
      $('#view-list-icon-button').click((e) => {
        this.parent.viewListIconClick();
      });
    }
    if($('#settings-icon')) {
      this.enableIcon($('#settings-icon'));
    }
    if($('#home-icon')) {
      this.enableIcon($('#home-icon'));
    }
    this.enableAddIcon();
    this.disableOpenIcon();
    this.disableEditIcon();
    this.disableDeleteIcon();

    // Icon click handers
    $('#add-icon-button').click((e) => {
      this.parent.addItemIconClick();
    });
    $('#open-icon-button').click((e) => {
      this.parent.openItemIconClick();
    });
    $('#edit-icon-button').click((e) => {
      this.parent.editItemIconClick();
    });
    // Commented out by Nicole -- probably won't need separate page for delete
    // $('#delete-icon-button').click((e) => {
    //   this.parent.deleteItemIconClick();
    // });
  }

  // Add icon apperance / behavior
  enableAddIcon()  { this.enableIcon($('#add-icon')); }
  disableAddIcon() { this.disableIcon($('#add-icon')); }
  // Edit icon apperance / behavior
  enableOpenIcon()  { this.enableIcon($('#open-icon')); }
  disableOpenIcon() { this.disableIcon($('#open-icon')); }
  // Edit icon apperance / behavior
  enableEditIcon()  { this.enableIcon($('#edit-icon')); }
  disableEditIcon() { this.disableIcon($('#edit-icon')); }
  // Delete icon apperance / behavior
  enableDeleteIcon()  { this.enableIcon($('#delete-icon')); }
  disableDeleteIcon() { this.disableIcon($('#delete-icon')); }
  // View List icon apperance / behavior
  enableViewListIcon()  { this.enableIcon($('#view-list-icon')); }
  disableViewListIcon() { this.disableIcon($('#view-list-icon')); }

  // Enable / disable icon controls
  enableIcon($icon) {
    if($icon.length) {
      $icon.addClass('icon-active');
      $icon.removeClass('icon-inactive');
    }
  }
  disableIcon($icon) {
    if($icon.length) {
      $icon.addClass('icon-inactive');
      $icon.removeClass('icon-active');
    }
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
  constructor(parent, type, name, id) {
    super(parent);
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
    this.init(buttonType);
  }

  // Initialize object
  init(buttonType) {
    $(`.${buttonType}`).each((index, e) => {
      this.buttons.push(new InterfaceButton(this, buttonType, String($(e).text()).trim(), e.id));
    });
  }

  // Button state change callback
  buttonStateChange(button) {
    this.parent.buttonStateChange(button);
  }
  // Get count of current active buttons
  getActiveCount() {
    return this.getActiveButtons().length;
  }
  // Get array of active buttons
  getActiveButtons() {
    return this.filterButtonsByState(ButtonState.Active);
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
class InterfaceButtonList_OneActive extends InterfaceButtonList {
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
    this.icons =null;
    this.search =null;
    this.selectButtonList =null;
    this.init();
  }

  init() {
    this.icons = new InterfaceIcons(this);
    this.search = new InterfaceSearch(this, '#search-control', '.select-button');
    this.selectButtonList = new InterfaceButtonList(this, 'select-button');
    $('#back-icon').click((e) => {
      window.location.href = this.getURL('back');
    });
    this.search.reset();
  }

  // Process selection change
  buttonStateChange(button) {
    switch(this.selectButtonList.getActiveCount()) {
      case 0:
        this.icons.enableAddIcon();
        this.icons.disableOpenIcon();
        this.icons.disableEditIcon();
        this.icons.disableDeleteIcon();
        this.icons.disableViewListIcon();
        this.search.enable();
        break;
      case 1:
        this.icons.disableAddIcon();
        this.icons.enableOpenIcon();
        this.icons.enableEditIcon();
        this.icons.enableDeleteIcon();
        this.icons.enableViewListIcon();
        this.search.disable();
        break;
      default:
        this.icons.disableAddIcon();
        this.icons.disableOpenIcon();
        this.icons.disableEditIcon();
        this.icons.enableDeleteIcon();
        this.icons.disableViewListIcon();
        this.search.disable();
    }
  }
  // Toolbar add callback
  addItemIconClick() {
    window.location.href = this.getURL('add');
  }
  // Toolbar open callback
  openItemIconClick() {
    window.location.href = this.getURL('view');
  }
  // Toolbar edit callback
  editItemIconClick() {
    window.location.href = this.getURL('edit');
  }
  // Toolbar delete callback
  // Commented out by Nicole -- probably won't need separate page
  // deleteItemIconClick() {
  //   window.location.href = this.getURL('delete');
  // }
  // Toolbar add callback
  viewListIconClick() {
    window.location.href = this.getURL('list');
  }

  /*
   * Get URL (icon click event)
   *
   *  Subclasses over-ride to build specific URLs including
   *  necessary URL paramters.
   */
  getURL(operation) {
    switch(operation) {
      case 'back':
        var tokens = window.location.href.split('/');
        tokens.pop();
        return tokens.join('/');
      case 'add':
        return window.location.href + '/' + operation;
      default:
        const activeButton = this.selectButtonList.getActiveButtons()[0];
        const id = activeButton.id.split('-').pop();
        const name = activeButton.name;
        return window.location.href + '/' + operation + '?id=' + id + '&name=' + name;
    }
  }
}

/*
 * Grocery List Table Interface
 */
class GroceryListControlInterface extends ControlInterface {
  constructor() {
    super();
  }

  getURL(operation) {
    switch(operation) {
      case 'back':
        return '/'; // No back button on page
      case 'add':
        return window.location.href + '/' + operation;
      default:
        const activeButton = this.selectButtonList.getActiveButtons()[0];
        const id = activeButton.id.split('-').pop();
        const name = activeButton.name;
        if(operation === 'list') {
          return window.location.href + 'list?id=' + id + '&name=' + name + '&orderBy=name';
        } else {
          return window.location.href + '/' + operation + '?id=' + id + '&name=' + name + '&orderBy=name';
        }
    }
  }
}

/*
 * Grocery Listitem Table Interface
 */
class GroceryListitemControlInterface extends ControlInterface {
  constructor() {
    super();
  }

  getURL(operation) {
    const baseURL = window.location.origin;
    const queryString = window.location.search;
    const urlParams = new URLSearchParams(queryString);
    const listId = urlParams.get('id');
    const listName = urlParams.get('name');
    switch(operation) {
      case 'back':
        return baseURL;
      case 'add':
        return baseURL + '/list/listitem/' + operation + '?listid=' + listId + '&listname=' + listName;
      default:
        const activeButton = this.selectButtonList.getActiveButtons()[0];
        const id = activeButton.id.split('-').pop();
        const name = activeButton.name;
        return baseURL + '/list/listitem/' + operation + '?listid=' + listId + '&listname=' + listName + '&id=' + id + '&name=' + name;
    }
  }
}
