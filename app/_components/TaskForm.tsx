"use client"

import React, { useEffect, useState } from 'react';
import { Form, Input, Button, Modal, Select } from 'antd';
import { Task } from "../types/task";
import { Status } from "../types/status";
import { descriptionValidationRules, titleValidationRules } from "./constants";

// This component renders a form for adding or editing a task within a modal.
// It handles form validation and state management to ensure the form is correctly filled out.
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
            // Populate the form fields with the task data for editing.
            form.setFieldsValue({
                title: task.title,
                description: task.description,
                status: task.status,
            });
        } else {
            // Reset the form fields when adding a new task.
            form.resetFields();
        }
    }, [task, form]);

    const handleFinish = (values: Task) => {
        onAdd(values); // Call the onAdd function with the form values.
        form.resetFields(); // Reset the form fields after submission.
        setVisible(false); // Close the modal.
    };

    // Options for the status select dropdown.

    const statusOptions =
        Object.values(Status).map((status) => ({
            value: status,
            label: status,
        }))

    return (
        // Modal component for adding or editing a task.
        <Modal
            title={task ? "Edit Task" : "Add Task"}
            open={visible}
            onCancel={() => setVisible(false)}
            footer={null}
        >
            {/* Ant Design Form component for capturing task details. */}
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
