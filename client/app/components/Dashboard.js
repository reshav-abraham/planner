import React from 'react';
import ReactDOM from 'react-dom';
import '../index.css';
import Button from '@material-ui/core/Button';
import PlannerCard from './PlannerCard';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import AddIcon from '@material-ui/icons/Add';

// Card styles



// check for existing cards dynamically render

// new card button


export default function Dashboard() {
  function createNewPlan (){
    console.log("yoyoyoyo");
  }
  return (
    <>
    <div>
      <p><b>Dashboard</b></p>
    </div>
    <div style={{display:"flex", "white-space": "nowrap"}}>
      <PlannerCard />
      <div style={{"width":"20px"}}/>
      <Card style={{maxWidth:"200px"}}>
        <CardContent>
          <p>Create New Plan</p>
          <Button onClick={createNewPlan}><AddIcon /></Button>
        </CardContent>
      </Card>
    </div>
    </>
  );
}