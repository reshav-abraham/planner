import React, { useState, useEffect } from 'react';
import '../index.css';
import Button from '@material-ui/core/Button';
import PlannerCard from './PlannerCard';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import AddIcon from '@material-ui/icons/Add';
import TextField from '@material-ui/core/TextField';
import { helloWorld, getPlans, createPlan, deletePlan } from '../api/PlannerApi';
import fetchData from '../api/PlannerApi';
import { async } from 'regenerator-runtime';

import { PlannerContext } from './PlannerContext.js'

// Card styles



// check for existing cards dynamically render

// new card button


export default function Dashboard(props) {
  const [plans, setPlans] = useState([]);
  const [creatingNewPlan, setCreatingNewPlan] = useState(false);
  const [planData, setPlanData] = useState([]);
  const [textFieldValue, setTextFieldValue] = useState("");
  const plannerContext = React.useContext(PlannerContext);

  useEffect(()=> {
    getPlans().then(data => {
      setPlans(JSON.parse(data))
    })
    .catch(err => console.log(err))

    },[])


  function handleTextFieldChange(e){
    setTextFieldValue(e.target.value);
  }

  function createNewPlan(){
    return (
      creatingNewPlan ? 
        <div onKeyDown={keyPress} style={{}}>
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

  const keyPress = async (e) => {
    if (e.key === 'Enter') {
      saveNewPlan();
    }
  }

  const saveNewPlan = async () => {
    setCreatingNewPlan(false); 
    // send requist to add plan
    console.log("target", textFieldValue);
    let r1 = await createPlan(textFieldValue);
    console.log("fetchData", textFieldValue);
    // setPlans(plans.concat( textFieldValue ));
    setTextFieldValue("");

    getPlans().then(data => {
      setPlans(JSON.parse(data))
    })
    .catch(err => console.log(err))
  }

  const removePlanT = async (planId) => {
    // send requist to add plan
    console.log(plans);
    console.log("delete data", planId);
    // setPlans(plans.pop());
    deletePlan(planId);
    console.log(plans);

    getPlans().then(data => {
      setPlans(JSON.parse(data))
    })
    .catch(err => console.log(err))

    console.log(plans);

  }

  return (
    <>
    <div>
      <p><b>Plans</b> {plannerContext.planId} </p>
    </div>

    <div style={{display:"flex", whiteSpace: "nowrap"}}>
    {plans.map((x) => { return <> <PlannerCard key={x.planId} planId={x.planId} removePlanT={removePlanT} ></PlannerCard> <div key={x.planId} style={{"width":"20px"}}/></>})}

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