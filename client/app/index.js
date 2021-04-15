import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import '@babel/polyfill'
import Button from '@material-ui/core/Button';
import Dashboard from './components/Dashboard';
import Plan from './components/Plan';
import PlannerProvider from './components/PlannerContext';
import { PlannerContext } from './components/PlannerContext.js'

// check for existing cards

function App() {
  const plannerContext = React.useContext(PlannerContext);
  console.log("plan", plannerContext);
  return (
      plannerContext.plannerView === "dashboard" ?
      <Dashboard />
      :
      <Plan />
  );
}

ReactDOM.render(<PlannerProvider><App /></PlannerProvider>, document.getElementById('root'));