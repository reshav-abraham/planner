import React, { useState, useEffect, useContext } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import Modal from '@material-ui/core/Modal';
import TextField from '@material-ui/core/TextField';

import Chip from '@material-ui/core/Chip';
import Paper from '@material-ui/core/Paper';
import TagFacesIcon from '@material-ui/icons/TagFaces';


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
  const [chipData, setChipData] = React.useState([]);
  // getModalStyle is not a pure function, we roll the style only on the first render
  const [textFieldValue, setTextFieldValue] = useState("");
  const [subTask, setSubTask] = useState("");
  const [modalStyle] = React.useState(getModalStyle);

  const handleDelete = (chipToDelete) => () => {
    setChipData((chips) => chips.filter((chip) => chip.key !== chipToDelete.key));
  };
  
  const handleClose = () => {
    props.closeTaskModal('close', {});
  };

  const handleSave = () => {
    props.closeTaskModal('save', {"task":textFieldValue, "chipData": chipData});
  };

  function handleTextFieldChange(e){
    setTextFieldValue(e.target.value);
  }

  function handleSubTaskFieldChange(e){
    setSubTask(e.target.value);
  }

  function addSubTask(subTask){
    // let newChipData = chipData;
    // newChipData.push({key: chipData.length+1, label: subTask});
    setChipData(oldArray => [...oldArray, {key: chipData.length+1, label: subTask}]);
    console.log(chipData);
  }

  const keyPress = async (e) => {
    if (e.key === 'Enter') {
      addSubTask(subTask);
      setSubTask("");
    }
  }

  const body = (
    <div style={modalStyle} className={classes.paper}>
      <h2 id="simple-modal-title">Text in a modal</h2>
      <h3>Task</h3>
      <TextField value={textFieldValue} onChange={handleTextFieldChange} style={{width:"100px"}}/>
      <h3>Sub Tasks</h3>
      <TextField value={subTask} onKeyDown={keyPress} onChange={handleSubTaskFieldChange}  style={{width:"100px"}}/>
      <div>

      {chipData.map((data) => {
        let icon;

        if (data.label === 'React') {
          icon = <TagFacesIcon />;
        }

        return (
          <li key={data.key}>
            <Chip
              icon={icon}
              label={data.label}
              onDelete={handleDelete(data)}
              className={classes.chip}
            />
          </li>
        );
      })}

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