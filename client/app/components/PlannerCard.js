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

export default function PlannerCard(props) {
  const classes = useStyles();
  const plannerContext = React.useContext(PlannerContext);

  const bull = <span className={classes.bullet}>•</span>;

function goToPlan(){
  console.log("Going to plan!", props.plan);
  console.log("plannerContext", plannerContext);
  plannerContext.setPlannerView('plan');
  plannerContext.setPlanId(props.plan);
  console.log("plannerContext", plannerContext);
}

console.log("plannerContext", plannerContext);

function deletePlan(){
  props.removePlan(props.plan);
}

  return (
    <Card className={classes.root}>
      <CardContent>
        <Typography className={classes.title} color="textSecondary" gutterBottom>
           {props.plan}
        </Typography>
        <Typography variant="h5" component="h2">
          be{bull}nev{bull}o{bull}lent
        </Typography>
        <Typography className={classes.pos} color="textSecondary">
          adjective
        </Typography>
        <Typography variant="body2" component="p">
          well meaning and kindly.
          <br />
          {'"a benevolent smile"'}
        </Typography>
      </CardContent>
      <CardActions>
        <Button onClick={goToPlan} size="small">Go To Plan</Button>
        <Button onClick={deletePlan} ><DeleteIcon/></Button>
      </CardActions>
    </Card>
  );
}