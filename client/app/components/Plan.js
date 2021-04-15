import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import DeleteIcon from '@material-ui/icons/Delete';
// https://material-ui.com/components/material-icons/

import { PlannerContext } from './PlannerContext.js'

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

export default function Plan(props) {
  const classes = useStyles();
  const plannerContext = React.useContext(PlannerContext);


  return (
      <>
    <div>PLAN {plannerContext.planId}</div>
    <Button 
        onClick={()=>{plannerContext.setPlannerView('dashboard'); plannerContext.setPlanId();}}>
        Back to Dashboard
        </Button>
        </>
  );
}