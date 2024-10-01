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

interface TaskItemProps {
    task: Task;
    onEdit: (task: Task) => void;
    index: number;
}

const TaskItem: React.FC<TaskItemProps> = ({ task, onEdit, index }) => {

    const menuItems = getTaskMenuItems(onEdit, showDeleteConfirm, task)

    return (
        <Draggable key={task.id} draggableId={task.id} index={index}>
            {(provided) => (
                <div
                    ref={provided.innerRef}
                    {...provided.draggableProps}
                    {...provided.dragHandleProps}
                >
                    <Card className="w-full">
                        <Flex justify="space-between" className="w-full" >
                            <Space direction="vertical">
                                <Typography.Text className="font-bold capitalize">
                                    {task.title}
                                </Typography.Text>
                                <Typography.Text className="capitalize">{task.description}</Typography.Text>
                            </Space>
                            <Space size={16}>
                                <Typography.Text className={`${task.status === Status.ACTIVE ? 'text-blue-600' : ''}`} >
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
