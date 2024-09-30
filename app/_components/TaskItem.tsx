"use client";

import React from 'react';
import { Button, Card, Flex, Space, Typography } from 'antd';
import { Task } from "../types/task";
import { showDeleteConfirm } from "./constants";
import dynamic from 'next/dynamic';

const Draggable = dynamic(
    () =>
        import('react-beautiful-dnd').then(mod => {
            return mod.Draggable;
        }),
    { ssr: false },
);

interface TaskItemProps {
    task: Task;
    onEdit: (task: Task) => void;
    index: number;
}

const TaskItem: React.FC<TaskItemProps> = ({ task, onEdit, index }) => {
    return (
        <Draggable key={task.id} draggableId={task.id} index={index}>
            {(provided) => (
                <div
                    ref={provided.innerRef}
                    {...provided.draggableProps}
                    {...provided.dragHandleProps}
                >
                    <Card className="w-full py-6">
                        <Flex justify="space-between" className="w-full" >
                            <Space direction="vertical">
                                <Typography.Text className="font-bold capitalize">
                                    {task.title} - {task.status}
                                </Typography.Text>
                                <Typography.Text className="capitalize">{task.description}</Typography.Text>
                            </Space>
                            <Space>
                                <Button onClick={() => onEdit(task)}>Edit</Button>
                                <Button danger onClick={() => showDeleteConfirm(task)}>Delete</Button>
                            </Space>
                        </Flex>
                    </Card>
                </div>
            )}
        </Draggable>
    );
};

export default TaskItem;
