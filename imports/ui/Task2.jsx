import React from 'react';
import {useTracker} from 'meteor/react-meteor-data'
import {  Task2Collection} from '../db/TaskCollection'
import { Task } from './Task';

export const Task2 = () =>{ 
  const tasks2 = useTracker(()=> Task2Collection.find({}).fetch())
  function createTask()
  {
    Task2Collection.insert({text: 'New Task'})
  }
  return (

  <div>
    <h1>Task2</h1>
    <button onClick={() => createTask()}>Bấm vào đây</button>
    <ul>
      {tasks2.map(task => <Task key={task._id} task={task} />)}
    </ul>
  </div>
)};
