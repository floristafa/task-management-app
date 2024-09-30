"use client";

import React from 'react';
import TaskItem from './TaskItem';
import { Task } from "../types/task";
import dynamic from 'next/dynamic';
import { List } from "antd";
const Droppable = dynamic(
    () =>
        import('react-beautiful-dnd').then(mod => {
            return mod.Droppable;
        }),
    { ssr: false },
);

interface TaskListProps {
    tasks: Task[];
    onEdit: (task: Task) => void;
}

const TaskList: React.FC<TaskListProps> = ({ tasks, onEdit }) => {
    return (
        <Droppable droppableId="taskList">
            {(provided) => (
                <div ref={provided.innerRef} {...provided.droppableProps}>
                    <List
                        itemLayout="vertical"
                        grid={{ gutter: 16, column: 1 }}
                        // loading={isLoading}
                        // pagination={pagination}
                        dataSource={tasks}
                        renderItem={(task: Task, index: number) => (
                            <List.Item>
                                <TaskItem key={task.id} task={task} onEdit={onEdit}
                                    index={index}></TaskItem>
                            </List.Item>
                        )}
                    />
                    {provided.placeholder}
                </div>
            )}
        </Droppable>
    );
};

export default TaskList;
