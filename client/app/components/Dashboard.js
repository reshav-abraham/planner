import React, { useState } from 'react';
import '../index.css';
import Button from '@material-ui/core/Button';
import PlannerCard from './PlannerCard';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import AddIcon from '@material-ui/icons/Add';
import TextField from '@material-ui/core/TextField';


// Card styles



// check for existing cards dynamically render

// new card button


export default function Dashboard() {
  const [plans, setPlans] = useState([""]);
  const [creatingNewPlan, setCreatingNewPlan] = useState(false);

  function creatNewPlan(){
    return (
      creatingNewPlan ? 
        <div style={{}}>
          <TextField style={{width:"100px"}}/>
          <div style={{display:"flex", "white-space": "nowrap"}}>
            <Button onClick={()=>{addNewPlan()}}> Save </Button>
            <Button onClick={()=>{setCreatingNewPlan(false)}}> Cancel </Button>
          </div>
        </div> 
        : 
        <div>
          <p>Create New Plan</p>
          <Button onClick={()=>{setCreatingNewPlan(true)}}><AddIcon /></Button>
        </div>
    );
  }

  function addNewPlan (){
    setCreatingNewPlan(false); 
    // send requist to add plan
    setPlans(
      plans.concat(
          <>
          <PlannerCard key={plans.length}></PlannerCard>
          <div style={{"width":"20px"}}/>
          </>
        ))
  }

  function displayPlans (){
    const numbers = [1, 2, 3, 4, 5];
    const listItems = plans.map((plan) =>
    <PlannerCard />
    );
    return (listItems);
  }

  return (
    <>
    <div>
      <p><b>Plans</b></p>
    </div>
    <div style={{display:"flex", "white-space": "nowrap"}}>
      
      {plans}

      <div style={{"width":"20px"}}/>
      <Card style={{maxWidth:"200px"}}>
        <CardContent>
          {creatNewPlan()}
        </CardContent>
      </Card>
    </div>
    </>
  );
}