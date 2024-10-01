"use client"

import { useEffect, useState } from 'react';
import { Button, Flex, Input, message, Segmented, Space, Typography } from 'antd';
import dynamic from 'next/dynamic';
import { DropResult } from 'react-beautiful-dnd';
import TaskForm from "./_components/TaskForm";
import TaskList from "./_components/TaskList";
import { getTasks, updateTask, createTask } from "./services/api.service";
import { Task } from "./types/task";
import { v4 as uuidv4 } from "uuid";
import { PlusOutlined, SearchOutlined } from "@ant-design/icons";
import { Status } from "./types/status";
const DragDropContext = dynamic(
  () =>
    import('react-beautiful-dnd').then(mod => {
      return mod.DragDropContext;
    }),
  { ssr: false },
);
const Droppable = dynamic(
  () =>
    import('react-beautiful-dnd').then(mod => {
      return mod.Droppable;
    }),
  { ssr: false },
);

const Home: React.FC = () => {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [currentTask, setCurrentTask] = useState<Task | null>(null);
  const [filter, setFilter] = useState<string>('All');
  const [formVisible, setFormVisible] = useState(false);
  const [searchTerm, setSearchTerm] = useState<string>('');

  // Fetch tasks only on the client side to avoid hydration issues
  useEffect(() => {
    const fetchTasks = async () => {
      const fetchedTasks = await getTasks();
      setTasks(fetchedTasks);
    };

    fetchTasks();
  }, [tasks]); // Only run once on mount

  const handleAdd = async (task: Omit<Task, 'id'>) => {
    const newTask = { ...task, id: uuidv4(), status: Status.ACTIVE }; // Set default status to ACTIVE
    if (currentTask) {
      await updateTask({ ...currentTask, ...task }); // Spread currentTask to retain the id and status
      message.success('Task updated successfully');

      // Update local state
      const updatedTasks = tasks.map(t => (t.id === currentTask.id ? { ...t, ...task } : t));
      setTasks(updatedTasks);
      localStorage.setItem('tasks', JSON.stringify(updatedTasks)); // Update local storage
    } else {
      await createTask(newTask);
      message.success('Task added successfully');

      // Update local state
      setTasks([...tasks, newTask]);
      localStorage.setItem('tasks', JSON.stringify([...tasks, newTask])); // Update local storage
    }

    setCurrentTask(null);
    setFormVisible(false);
  };

  const handleEdit = (task: Task) => {
    setCurrentTask(task);
    setFormVisible(true);
  };

  const onDragEnd = async (result: DropResult) => {
    if (!result.destination) return;

    const reorderedTasks = Array.from(tasks);
    const [removed] = reorderedTasks.splice(result.source.index, 1);
    reorderedTasks.splice(result.destination.index, 0, removed);
    setTasks(reorderedTasks);
    localStorage.setItem('tasks', JSON.stringify(reorderedTasks));
    message.success('Tasks reordered successfully');
  };

  const filteredTasks = tasks.filter(task => {
    const matchesSearch = [task.title, task.description || '']
      .some(field => field.toLowerCase().includes(searchTerm.toLowerCase()));
    if (filter === Status.ACTIVE) return task.status === Status.ACTIVE && matchesSearch;
    if (filter === Status.COMPLETED) return task.status === Status.COMPLETED && matchesSearch;
    return matchesSearch;
  });

  const handleSegmentedChange = (value: string) => {
    setFilter(value);
  };

  return (
    <Flex vertical className="container mx-auto p-4" >
      <Typography.Text className="text-3xl font-bold mb-4">Task Manager</Typography.Text>
      <Space>
        <Input
          placeholder="Search"
          prefix={<SearchOutlined />}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </Space>

      <Space className="my-4 justify-between w-full">
        <Segmented<string>
          options={['All', Status.ACTIVE, Status.COMPLETED]}
          onChange={handleSegmentedChange}
          className="bg-blue-200"
        />
        <TaskForm onAdd={handleAdd} task={currentTask} visible={formVisible} setVisible={setFormVisible} />
        <Button type="primary" icon={<PlusOutlined />} onClick={() => { setCurrentTask(null); setFormVisible(true); }}>
          Add Task
        </Button>
      </Space>

      <DragDropContext onDragEnd={onDragEnd}>
        <Droppable droppableId="taskList">
          {(provided) => (
            <div
              ref={provided.innerRef}
              {...provided.droppableProps}
            >
              <TaskList
                tasks={filteredTasks}
                onEdit={handleEdit}
              />
              {provided.placeholder}
            </div>
          )}
        </Droppable>
      </DragDropContext>
    </Flex>
  );
};

export default Home;
