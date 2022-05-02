$(function() {

  let controlInterface;

  switch($('#interface-identifier').text()) {
    case 'grocery_list':
      controlInterface = new GroceryListControlInterface();
      break;
    case 'listitem':
      controlInterface = new GroceryListitemControlInterface();
      break;
    default:
      controlInterface = new ControlInterface();
  }

});