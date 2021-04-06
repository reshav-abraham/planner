import React, { useState } from 'react';
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
  const [plans, setPlans] = useState(["1"]);

  function createNewPlan (){
    setPlans(plans.concat(<PlannerCard key={plans.length}></PlannerCard>))
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
      <p><b>Dashboard</b></p>
    </div>
    <div style={{display:"flex", "white-space": "nowrap"}}>
      
      {plans}

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