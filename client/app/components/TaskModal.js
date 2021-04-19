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
import Modal from '@material-ui/core/Modal';
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

function rand() {
    return Math.round(Math.random() * 20) - 10;
  }
  
  function getModalStyle() {
    const top = 50 + rand();
    const left = 50 + rand();
  
    return {
      top: `${top}%`,
      left: `${left}%`,
      transform: `translate(-${top}%, -${left}%)`,
    };
  }

const useStyles = makeStyles((theme) => ({
    paper: {
      position: 'absolute',
      width: 400,
      backgroundColor: theme.palette.background.paper,
      border: '2px solid #000',
      boxShadow: theme.shadows[5],
      padding: theme.spacing(2, 4, 3),
    },
  }));

export default function TaskModal(props) {
  const classes = useStyles();
  const plannerContext = useContext(PlannerContext);
  const [tasks, setTasks] = useState([1,1,1,1,1,1,1,1]);
  const [selectedDate, setSelectedDate] = useState(new Date('2014-08-18T21:11:54'));
  // getModalStyle is not a pure function, we roll the style only on the first render
  const [modalStyle] = React.useState(getModalStyle);

  const handleClose = () => {
    props.closeTaskModal();
  };

  const handleSave = () => {
    props.closeTaskModal();
  };

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
      list: [{ id: "4", text: "text7" }]
    }
  };

  const body = (
    <div style={modalStyle} className={classes.paper}>
      <h2 id="simple-modal-title">Text in a modal</h2>
      <p id="simple-modal-description">
        Duis mollis, est non commodo luctus, nisi erat porttitor ligula.
      </p>
      <div>
      <Button onClick={handleClose}>Close</Button>
      <Button onClick={handleSave}>Save</Button> 
      </div>
    </div>
  );


  return (
        <Modal
        open={props.visible}
        aria-labelledby="simple-modal-title"
        aria-describedby="simple-modal-description"
    >
        {body}
    </Modal>
  );
}