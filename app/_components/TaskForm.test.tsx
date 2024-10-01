// app/_components/TaskForm.test.tsx

import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import TaskForm from './TaskForm';
import { Task } from '../types/task';
import { Status } from '../types/status';

describe('TaskForm', () => {
    const onAddMock = jest.fn();

    const defaultTask: Task = {
        id: '1',
        title: 'Test Task',
        description: 'This is a test description',
        status: Status.ACTIVE,
    };

    beforeEach(() => {
        render(
            <TaskForm onAdd={onAddMock} task={defaultTask} visible={true} setVisible={() => { }} />
        );
    });

    afterEach(() => {
        jest.clearAllMocks();
    });

    it('renders the form correctly', () => {
        // Check for the presence of the Title input
        const titleInput = screen.getByLabelText(/title/i);
        expect(titleInput).toBeTruthy();

        // Check for the presence of the Description textarea
        const descriptionTextarea = screen.getByLabelText(/description/i);
        expect(descriptionTextarea).toBeTruthy();

        // Check for the presence of the Status select
        const statusSelect = screen.getByLabelText(/status/i);
        expect(statusSelect).toBeTruthy();

        // Check for the presence of the Save Changes button
        const saveButton = screen.getByRole('button', { name: /save changes/i });
        expect(saveButton).toBeTruthy();
    });



    it('does not call onAdd if Title is empty', () => {
        // Clear the Title input value
        userEvent.clear(screen.getByLabelText(/title/i));

        // Click the Save Changes button
        userEvent.click(screen.getByRole('button', { name: /save changes/i }));

        // Assert that onAdd was not called
        expect(onAddMock).not.toHaveBeenCalled();
    });
});
