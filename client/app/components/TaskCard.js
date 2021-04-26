import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import DeleteIcon from '@material-ui/icons/Delete';
import Checkbox from '@material-ui/core/Checkbox';
// https://material-ui.com/components/material-icons/

import { PlannerContext } from './PlannerContext.js';
import { updateSubTask } from '../api/PlannerApi';

const useStyles = makeStyles({
  root: {
    minWidth: 50,
    maxWidth: 200,
  },
  bullet: {
    display: 'inline-block',
    margin: '0 2px',
    transform: 'scale(0.8)',
  },
  title: {
    fontSize: 14,
  },
  pos: {
    marginBottom: 12,
  },
});

export default function TaskCard(props) {
  const classes = useStyles();
  const plannerContext = React.useContext(PlannerContext);

function handleCheckBox(event, x){
    if (event){
      console.log("event.target.checked", event.target.checked, x);
      // update state in db
      console.log("props", props.taskId);
      updateSubTask(plannerContext.planId, props.taskId, x, event.target.checked ? 'done' : 'todo');
    }
}

return (
    <Card style={{"width":"170px"}} className={classes.root}>
      <CardContent>
        <Typography className={classes.title} color="textSecondary" gutterBottom>
           {props.taskId}
        </Typography>
      </CardContent>
      {props.subTask ? props.subTask.map((x) => { return <div key={x+"_div"}><Checkbox key={x+"_check"} onChange={(e)=>{handleCheckBox(e,x)}}></Checkbox><ul key={x}> {x} </ul> </div> }) : ''}
      <CardActions>
        <Button onClick={()=>{console.log("Delete task", props.taskId)}} ><DeleteIcon/></Button>
      </CardActions>
    </Card>
  );
}