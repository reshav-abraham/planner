import React, { useState, useEffect, useContext } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import DeleteIcon from '@material-ui/icons/Delete';
import TaskCard from './TaskCard';
import { DragDropContext } from "react-beautiful-dnd";
import Column from "./Column";
// https://material-ui.com/components/material-icons/
// https://codesandbox.io/s/react-material-ui-drag-and-drop-trello-clone-2-lists-7q46h?file=/src/App.js:664-1080
import 'date-fns';

import Grid from '@material-ui/core/Grid';
import DateFnsUtils from '@date-io/date-fns';
import {
  MuiPickersUtilsProvider,
  KeyboardTimePicker,
  KeyboardDatePicker,
} from '@material-ui/pickers';

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
  const plannerContext = useContext(PlannerContext);
  const [tasks, setTasks] = useState([1,1,1,1,1,1,1,1]);
  const [selectedDate, setSelectedDate] = useState(new Date('2014-08-18T21:11:54'));
  const initialColumns = {
    todo: {
      id: "todo",
      list: [
        { id: "1", text: "text1" },
        { id: "2", text: "text2" },
        { id: "3", text: "text3" }
      ]
    },
    doing: {
      id: "doing",
      list: [
        { id: "4", text: "text4" },
        { id: "5", text: "text5" },
        { id: "6", text: "text6" }
      ]
    },
    done: {
      id: "done",
      list: []
    }
  };
  const [columns, setColumns] = useState(initialColumns);

  const handleDateChange = (date) => {
    setSelectedDate(date);
  };


  return (
    <>
      <div>PLAN {plannerContext.planId}</div>
      <Button 
          onClick={()=>{plannerContext.setPlannerView('dashboard'); plannerContext.setPlanId();}}>
          Back to Dashboard
          </Button>
          <MuiPickersUtilsProvider utils={DateFnsUtils}>
        <Grid container justify="space-around">
          <KeyboardDatePicker
            disableToolbar
            variant="inline"
            format="MM/dd/yyyy"
            margin="normal"
            id="date-picker-inline"
            label="Date picker inline"
            value={selectedDate}
            onChange={handleDateChange}
            KeyboardButtonProps={{
              'aria-label': 'change date',
            }}
          />
          <KeyboardDatePicker
            margin="normal"
            id="date-picker-dialog"
            label="Date picker dialog"
            format="MM/dd/yyyy"
            value={selectedDate}
            onChange={handleDateChange}
            KeyboardButtonProps={{
              'aria-label': 'change date',
            }}
          />
          <KeyboardTimePicker
            margin="normal"
            id="time-picker"
            label="Time picker"
            value={selectedDate}
            onChange={handleDateChange}
            KeyboardButtonProps={{
              'aria-label': 'change time',
            }}
          />
        </Grid>
      </MuiPickersUtilsProvider>
      <div>TASKS</div>

      <DragDropContext > 
      <Grid container direction={"row"} justify={"center"}>
        {Object.values(columns).map((column) => {
          console.log(column);
          return (
            <Grid item>
              <Column column={column} key={column.id} />
            </Grid>
          );
        })}
      </Grid>
    </DragDropContext>
    </>
  );
}