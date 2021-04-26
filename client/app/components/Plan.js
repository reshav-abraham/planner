import React, { useState, useEffect, useContext } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import TaskModal from './TaskModal';
import { DragDropContext } from "react-beautiful-dnd";
import Column from "./Column";
import { getTasks } from '../api/PlannerApi';
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
  const plannerContext = useContext(PlannerContext);
  const [taskModalVisible, setTaskModalVisible] = useState(false);
  const [selectedDate, setSelectedDate] = useState(new Date('2014-08-18T21:11:54'));
  const [tasks, setTasks] = useState([]);
  const initialColumns = {
    todo: {
      id: "todo",
      list: []
    },
    doing: {
      id: "doing",
      list: []
    },
    done: {
      id: "done",
      list: []
    }
  };
  const [columns, setColumns] = useState(initialColumns);

  useEffect(()=> {
    getTasks(plannerContext.planId).then(data => {
      console.log(data);
      setTasks(data);
      // setColumns(JSON.parse(data))
    })
    .catch(err => console.log(err))

    },[])

  const handleDateChange = (date) => {
    setSelectedDate(date);
  };

  function createNewTaskModel(){
   console.log("create new task model");
   setTaskModalVisible(true);
   console.log("taskModalVisible", taskModalVisible);
  }

  function closeTaskModal(op, data){
    console.log("close task modal", op, data);
    let newColumns = columns;
    console.log(data);
    newColumns.todo.list.push({ id: data.task, text: data.task, subTask: data.subTask });
    setColumns(newColumns);
    setTaskModalVisible(false);
    // update db
    
  }


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

      <Button style={{color:"green"}} onClick={createNewTaskModel}> Create new task </Button>
      
      <TaskModal visible={taskModalVisible} closeTaskModal={closeTaskModal}/>

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