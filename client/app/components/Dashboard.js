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
import PlannerContext from '../index.js';

// Card styles



// check for existing cards dynamically render

// new card button


export default function Dashboard(props) {
  const [plans, setPlans] = useState([]);
  const [creatingNewPlan, setCreatingNewPlan] = useState(false);
  const [planData, setPlanData] = useState({});
  const [textFieldValue, setTextFieldValue] = useState("");

  function handleTextFieldChange(e){
    setTextFieldValue(e.target.value);
  }

  function createNewPlan(){
    return (
      creatingNewPlan ? 
        <div style={{}}>
          <TextField value={textFieldValue} onChange={handleTextFieldChange} style={{width:"100px"}}/>
          <div style={{display:"flex", whiteSpace: "nowrap"}}>
            <Button onClick={()=>{saveNewPlan()}}> Save </Button>
            <Button onClick={()=>{setCreatingNewPlan(false); setTextFieldValue("");}}> Cancel </Button>
          </div>
        </div> 
        : 
        <div>
          <p>Create New Plan</p>
          <Button onClick={()=>{setCreatingNewPlan(true)}}><AddIcon /></Button>
        </div>
    );
  }

  const saveNewPlan = async () => {
    setCreatingNewPlan(false); 
    // send requist to add plan
    console.log("target", textFieldValue);
    let r = await helloWorld(textFieldValue);
    console.log("fetchData", r.data, textFieldValue);
    setPlans(plans.concat( textFieldValue ));
    setTextFieldValue("");
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
      
      {plans.map((x) =>{ return <> <PlannerCard key={x} plan={x} removePlan={removePlan} ></PlannerCard> <div key={x+1} style={{"width":"20px"}}/></>})}

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