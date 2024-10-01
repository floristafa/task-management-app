"use client";

import React from 'react';
import { Card, Dropdown, Flex, Space, Typography } from 'antd';
import { Task } from "../types/task";
import { getTaskMenuItems, showDeleteConfirm } from "./constants";
import dynamic from 'next/dynamic';
import { EllipsisOutlined } from "@ant-design/icons";
import { Status } from "../types/status";

const Draggable = dynamic(
    () =>
        import('react-beautiful-dnd').then(mod => {
            return mod.Draggable;
        }),
    { ssr: false },
);

// This component is responsible for rendering an individual task item as a draggable element.
// It accepts a task, an edit handler, and the index as props. The task is draggable using `react-beautiful-dnd`.
// It also displays the task details like title, description, and status, with additional options provided through a dropdown menu.

interface TaskItemProps {
    task: Task;
    onEdit: (task: Task) => void;
    index: number;
    isDescriptionVisible: boolean; // Added prop to control visibility
    onClick: () => void; // This allows toggling the task description
}

const TaskItem: React.FC<TaskItemProps> = ({ task, onEdit, index, isDescriptionVisible, onClick }) => {

    // Generate the menu items for the task dropdown (e.g., edit, delete).
    const menuItems = getTaskMenuItems(onEdit, showDeleteConfirm, task);

    return (
        // The Draggable component enables drag-and-drop functionality for this task.
        <Draggable key={task.id} draggableId={task.id} index={index}>
            {(provided) => (
                <div
                    ref={provided.innerRef}
                    {...provided.draggableProps}
                    {...provided.dragHandleProps}
                >
                    <Card className="w-full">
                        <Flex justify="space-between" className="w-full" gap={8}>
                            <Space direction="vertical">
                                <Typography.Text className="font-bold capitalize" onClick={onClick}>
                                    {task.title}
                                </Typography.Text>
                                {isDescriptionVisible && ( // Use the prop to conditionally render the description
                                    <Typography.Text className="capitalize">{task.description}</Typography.Text>
                                )}
                            </Space>
                            <Space size={16} className="w-28 justify-end">
                                <Typography.Text className={`${task.status === Status.ACTIVE ? 'text-blue-600' : ''}`}>
                                    {task.status}
                                </Typography.Text>
                                <Dropdown
                                    menu={{ items: menuItems }}
                                    trigger={["click"]}
                                >
                                    <EllipsisOutlined rotate={90} />
                                </Dropdown>
                            </Space>
                        </Flex>
                    </Card>
                </div>
            )}
        </Draggable>
    );
};

export default TaskItem;
