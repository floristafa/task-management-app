"use client";

import React, { useMemo, useState } from 'react';
import TaskItem from './TaskItem';
import { Task } from "../types/task";
import dynamic from 'next/dynamic';
import { List } from "antd";
import { PaginationConfig } from "antd/es/pagination";
import { paginationItemRender, TASKS_PER_PAGE } from "./constants";

const Droppable = dynamic(
    () =>
        import('react-beautiful-dnd').then(mod => {
            return mod.Droppable;
        }),
    { ssr: false },
);

// This component renders a list of tasks, allowing for drag-and-drop functionality and pagination.
// It receives a list of tasks and an edit handler as props, and manages the current page state for pagination.
interface TaskListProps {
    tasks: Task[];
    onEdit: (task: Task) => void;
}

const TaskList: React.FC<TaskListProps> = ({ tasks, onEdit }) => {

    const [currentPage, setCurrentPage] = useState(1); // State to track the current page in the pagination.

    // Memoized pagination configuration to improve performance and avoid unnecessary recalculations.

    const pagination: PaginationConfig | false = useMemo(() => {
        if (!tasks?.length || tasks?.length / TASKS_PER_PAGE <= 1)
            return false;
        return {
            onChange: setCurrentPage,
            current: currentPage,
            pageSize: TASKS_PER_PAGE,
            total: tasks?.length || 0,
            align: "center",
            itemRender: paginationItemRender,
        };
    }, [currentPage, tasks?.length, setCurrentPage]);

    return (
        // The Droppable component allows for dropping draggable items in the task list.
        <Droppable droppableId="taskList">
            {(provided) => (
                <div ref={provided.innerRef} {...provided.droppableProps}>
                    <List
                        itemLayout="vertical"
                        grid={{ gutter: 16, column: 1 }}
                        pagination={pagination}
                        dataSource={tasks}
                        renderItem={(task: Task, index: number) => (
                            // Render each task item using the TaskItem component.
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
