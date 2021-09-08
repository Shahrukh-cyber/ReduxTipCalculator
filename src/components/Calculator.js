import { Card } from '@twilio-paste/core';
import { MenuItemsContainer } from '../containers/MenuItemsContainer';
import { NewItemContainer } from '../containers/NewItemContainer';
import { SummaryContainer } from '../containers/SummaryContainer';
import { TipSelectContainer } from '../containers/TipSelectContainer';

// import { MenuItems } from './MenuItems';
// import { NewItemForm } from './NewItemForm';
// import { Summary } from './Summary';



const Calculator = () => {
  return (
    <Card>
      <NewItemContainer />
      <MenuItemsContainer />
      <TipSelectContainer />
      <SummaryContainer />
    </Card>
  );
};

export default Calculator;
