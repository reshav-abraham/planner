import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import '@babel/polyfill'
import Button from '@material-ui/core/Button';
import Dashboard from './components/Dashboard';

// check for existing cards

export const PlannerContext = React.createContext();

function App() {
  return (
    <>
    <Dashboard />
    </>
  );
}

ReactDOM.render(<App />, document.getElementById('root'));