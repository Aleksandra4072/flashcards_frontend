import { DragDropContext, Droppable, Draggable } from "@hello-pangea/dnd";
import { useState, useEffect } from "react";
import { Card } from "antd";
import TaskCard from "../components/my_tasks/TaskCard";

import styles from "../css/pages/Home.module.css";

const initTasks = [
  {
    id: "1",
    title: "Task#1",
  },
  {
    id: "2",
    title: "Task#1",
  },
  {
    id: "3",
    title: "Task#1",
  },
];

const MyTasks = () => {
  const [data, setData] = useState(initTasks);

  const handleOnDragEnd = (result) => {
    if (!result.destination) return;

    const taskList = Array.from(data);
    const [draggedItem] = taskList.splice(result.source.index, 1);
    taskList.splice(result.destination.index, 0, draggedItem);
    setData(taskList);
    console.log(taskList);
  };

  return (
    <div className={styles.page}>
      <Card className={styles.taskBoard}>
        <DragDropContext onDragEnd={handleOnDragEnd}>
          <Droppable droppableId="cards">
            {(provided) => (
              <div ref={provided.innerRef} {...provided.droppableProps}>
                {data.map((item, index) => (
                  <Draggable key={item.id} draggableId={item.id} index={index}>
                    {(provided) => (
                      <div
                        ref={provided.innerRef}
                        {...provided.draggableProps}
                        {...provided.dragHandleProps}
                      >
                        <TaskCard title={item.title} />
                      </div>
                    )}
                  </Draggable>
                ))}
                {provided.placeholder}
              </div>
            )}
          </Droppable>
        </DragDropContext>
      </Card>
    </div>
  );
};

export default MyTasks;
