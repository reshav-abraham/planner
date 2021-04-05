import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import Button from '@material-ui/core/Button';
import PlannerCards from './components/plannerCards';

// check for existing cards


function App() {
  return (
    <>
    <PlannerCards />
    <Button onClick={()=>{console.log("What's good!")}} variant="contained" color="primary">
      Hello World
    </Button>
    </>
  );
}

ReactDOM.render(<App />, document.getElementById('root'));