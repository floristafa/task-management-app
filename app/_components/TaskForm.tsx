"use client"

import React, { useEffect, useState } from 'react';
import { Form, Input, Button, Modal, Select } from 'antd';
import { Task } from "../types/task";
import { Status } from "../types/status";
import { descriptionValidationRules, titleValidationRules } from "./constants";

interface TaskFormProps {
    onAdd: (task: Task) => void;
    task: Task | null;
    visible: boolean;
    setVisible: (visible: boolean) => void;
}

const TaskForm: React.FC<TaskFormProps> = ({ onAdd, task, visible, setVisible }) => {
    const [form] = Form.useForm();
    const [submitable, setSubmitable] = useState<boolean>(true);

    // Watch form values, specifically including status
    const values = Form.useWatch([], form);

    useEffect(() => {
        // This will validate the form fields whenever the values change
        form
            .validateFields({ validateOnly: true })
            .then(() => setSubmitable(true))
            .catch(() => setSubmitable(false));
    }, [form, values]);

    useEffect(() => {
        if (task) {
            // Ensure that form values are set correctly for editing
            form.setFieldsValue({
                title: task.title,
                description: task.description,
                status: task.status,
            });
        } else {
            // Reset the form for adding a new task
            form.resetFields();
        }
    }, [task, form]);

    const handleFinish = (values: Task) => {
        onAdd(values);
        form.resetFields();
        setVisible(false);
    };

    const selectOptions = [Status.ACTIVE, Status.COMPLETED];
    const statusOptions = selectOptions.map((status) => ({
        value: status,
        label: status,
    }));

    return (
        <Modal
            title={task ? "Edit Task" : "Add Task"}
            open={visible}
            onCancel={() => setVisible(false)}
            footer={null}
        >
            <Form form={form} onFinish={handleFinish} layout="vertical">

                <Form.Item
                    label="Title"
                    name="title"
                    rules={titleValidationRules}>
                    <Input placeholder="Enter title..." />
                </Form.Item>

                <Form.Item
                    name="description"
                    label="Description"
                    rules={descriptionValidationRules}>
                    <Input.TextArea autoSize={{ minRows: 2, maxRows: 5 }} placeholder="Enter description..." />
                </Form.Item>

                {task && (
                    <Form.Item
                        name="status"
                        label="Status"
                        rules={[{ required: true, message: 'Please select the status!' }]}>
                        <Select options={statusOptions} placeholder="Select status" />
                    </Form.Item>
                )}

                <Form.Item>
                    <Button type="primary" htmlType="submit" disabled={!submitable} className="justify-center w-full">
                        Save changes
                    </Button>
                </Form.Item>

            </Form>
        </Modal>
    );
};

export default TaskForm;
