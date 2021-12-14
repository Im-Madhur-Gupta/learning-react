import React from 'react';

import CourseGoalItem from '../CourseGoalItem/CourseGoalItem';
import './CourseGoalList.css';

const CourseGoalList = props => {
  return (
    <ul className="goal-list">
      {props.items.map((goal,index) => (
        <CourseGoalItem
          key={goal.id}
          id={goal.id}
          onDelete={()=>{props.onDeleteItem(index)}}
        >
          {goal.text}
        </CourseGoalItem>
      ))}
    </ul>
  );
};

export default CourseGoalList;
