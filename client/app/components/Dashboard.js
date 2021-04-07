import React, { useState } from 'react';
import '../index.css';
import Button from '@material-ui/core/Button';
import PlannerCard from './PlannerCard';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import AddIcon from '@material-ui/icons/Add';
import TextField from '@material-ui/core/TextField';
import helloWorld from '../api/PlannerApi';
import fetchData from '../api/PlannerApi';
import { async } from 'regenerator-runtime';

// Card styles



// check for existing cards dynamically render

// new card button


export default function Dashboard(props) {
  const [plans, setPlans] = useState([]);
  const [creatingNewPlan, setCreatingNewPlan] = useState(false);
  const [planData, setPlanData] = useState({})

  function createNewPlan(){
    return (
      creatingNewPlan ? 
        <div style={{}}>
          <TextField style={{width:"100px"}}/>
          <div style={{display:"flex", whiteSpace: "nowrap"}}>
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

  const addNewPlan = async () => {
    setCreatingNewPlan(false); 
    // send requist to add plan
    let r = await helloWorld();
    console.log("fetchData", r.data);
    setPlans(plans.concat(plans.length));
  }

  const removePlan = async (x) => {
    // send requist to add plan
    let r = await helloWorld();
    console.log(plans);
    console.log("delete data", x, r.data);
    // setPlans(plans.pop());
    let tmpPlans = plans;
    var index = tmpPlans.indexOf(x);
    if (index > -1) {
      // tmpPlans.splice(index, 1);
      // https://stackoverflow.com/questions/55500810/list-of-child-components-not-updating-correctly-when-deleting-object-from-state
      delete tmpPlans[index]
   }
    console.log(index);
    tmpPlans = tmpPlans.filter(function(a){return typeof a !== 'undefined';});
    setPlans(tmpPlans);
    console.log(plans);
    console.log(tmpPlans);
  }

  return (
    <>
    <div>
      <p><b>Plans</b></p>
    </div>
    <div style={{display:"flex", whiteSpace: "nowrap"}}>
      
      {plans.map((x) =>{ return <> <PlannerCard key={x} plan={x} removePlan={removePlan} ></PlannerCard> <div style={{"width":"20px"}}/></>})}

      <div style={{"width":"20px"}}/>
      <Card style={{maxWidth:"200px"}}>
        <CardContent>
          {createNewPlan()}
        </CardContent>
      </Card>
    </div>
    </>
  );
}