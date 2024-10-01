import { MenuProps, message, Modal, PaginationProps, Typography } from "antd";
import { Task } from "../types/task";
import { deleteTask } from "../services/api.service";
import { CloseCircleTwoTone, DeleteOutlined, EditOutlined } from "@ant-design/icons";
import { Rule } from "antd/es/form";



export const showDeleteConfirm = (record: Task) => {
    Modal.confirm({
        title: `Delete task`,
        icon: <CloseCircleTwoTone />,
        closable: true,
        className: 'text-wrap',
        content: (
            <>
                You are about to  delete <Typography.Text className="font-bold capitalize">{record.title}</Typography.Text>.
                <br />
                Do you wish to continue?
            </>
        ),
        okText: 'Delete',
        cancelText: 'Cancel',
        okType: 'primary',
        onOk: async () => {
            deleteTask(record.id).then(
                message.success('Task deleted successfully')).catch(
                    (error) => {
                        message.error(error.message || 'Failed to delete task');
                    }
                )
        }
    });

    return showDeleteConfirm;
}


export const titleValidationRules: Rule[] = [
    { required: true, message: 'Please input the task title!' },
    { max: 20, message: "Title should be less than 20 characters" },
    { min: 2, message: "Title should be more than 2 characters" },
    { whitespace: true, message: "Title should not be empty" }]


export const descriptionValidationRules: Rule[] =
    [
        { max: 255, message: "Description should be less than 255 characters" },
        { min: 2, message: "Description should be more than 2 characters" },
    ]

export const paginationItemRender: PaginationProps['itemRender'] = (_, type, originalElement) => {
    if (type === 'prev') {
        return <a>Previous</a>;
    }
    if (type === 'next') {
        return <a>Next</a>;
    }
    return originalElement;
};

export const TASKS_PER_PAGE = 5


export const getTaskMenuItems = (
    onEdit: (record: Task) => void,
    showDeleteConfirm: (record: Task) => void,
    record: Task
): MenuProps["items"] => [
        {
            key: 'edit',
            icon: <EditOutlined className="text-blue-500" />,
            label: "Edit",
            onClick: () => {
                onEdit(record)
            },
        },
        {
            key: 'delete',
            icon: <DeleteOutlined className="text-red-500" />,
            label: 'Delete',
            onClick: () => {
                showDeleteConfirm(record)
            },
        }
    ];