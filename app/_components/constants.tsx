import { message, Modal, Typography } from "antd";
import { Task } from "../types/task";
import { deleteTask } from "../services/api-service";
import { CloseCircleTwoTone } from "@ant-design/icons";
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
        { max: 50, message: "Description should be less than 50 characters" },
        { min: 2, message: "Description should be more than 2 characters" },
    ]