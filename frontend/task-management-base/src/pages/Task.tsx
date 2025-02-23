import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { PlusCircle, Check, Pencil, Trash2 } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card';
import { Button } from '../ui/button';
import { Input } from '../ui/input';
import { Checkbox } from '@radix-ui/react-checkbox';
import { TaskType } from '../utils/utils';
import Navbar from '../ui/Navbar';

const Task = () => {
  const navigate = useNavigate();
  const [tasks, setTasks] = useState<TaskType[]>([]);
  const [newTask, setNewTask] = useState('');
  const [editingTask, setEditingTask] = useState<TaskType | null>(null);

  const [isLoading, setIsLoading] = useState(true); 
  useEffect(() => {
    fetchTasks();
  }, []);

  const fetchTasks = async () => {
    try {
      const response = await fetch(`${process.env.FRONTENDURL}/tasks`, {
        credentials: 'include',
      });
      console.log(response);

      if (response.status === 401) {
       
        navigate('/');
        alert('You are not logged in!')
        return;
      }

      if (!response.ok) {
        throw new Error('Failed to fetch tasks');
      }

      const data = await response.json();
      setTasks(data);
    } catch (error) {
      console.error('Error fetching tasks:', error);
    }finally {
      setIsLoading(false); //Set loading to false after fetch completes
    }
  };

  const addTask = async () => {
    if (newTask.trim()) {
      try {
        const response = await fetch('http://localhost:3000/tasks', {
          method: 'POST',
          credentials: 'include',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            title: newTask,
            description: '',
          }),
        });

        if (!response.ok) {
          throw new Error('Failed to add task');
        }

        const newTaskData = await response.json();
        setTasks([...tasks, newTaskData]);
        setNewTask('');
      } catch (error) {
        console.error('Error adding task:', error);
      }
    }
  };

  const toggleComplete = async (taskId: number) => {
    try {
      const task = tasks.find(t => t.id === taskId);
      if (!task) return;

      const response = await fetch(`http://localhost:3000/tasks/${taskId}`, {
        method: 'PUT',
        credentials: 'include',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          title: task.title,
          description: task.description,
          isComplete: !task.isComplete,
        }),
      });

      if (!response.ok) {
        throw new Error('Failed to update task');
      }

      setTasks(
        tasks.map(task =>
          task.id === taskId ? { ...task, isComplete: !task.isComplete } : task,
        ),
      );
    } catch (error) {
      console.error('Error updating task:', error);
    }
  };

  const startEditing = (task: TaskType) => {
    setEditingTask(task);
  };

  const saveEdit = async () => {
    if (editingTask) {
      try {
        const response = await fetch(`http://localhost:3000/tasks/${editingTask.id}`, {
          method: 'PUT',
          credentials: 'include',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            title: editingTask.title,
            description: editingTask.description,
            isComplete: editingTask.isComplete,
          }),
        });

        if (!response.ok) {
          throw new Error('Failed to update task');
        }

        setTasks(
          tasks.map(task =>
            task.id === editingTask.id ? editingTask : task,
          ),
        );
        setEditingTask(null);
      } catch (error) {
        console.error('Error updating task:', error);
      }
    }
  };

  const deleteTask = async (taskId: number) => {
    try {
      const response = await fetch(`${process.env.FRONTENDURL}/tasks/${taskId}`, {
        method: 'DELETE',
        credentials: 'include',
      });

      if (!response.ok) {
        throw new Error('Failed to delete task');
      }

      setTasks(tasks.filter(task => task.id !== taskId));
    } catch (error) {
      console.error('Error deleting task:', error);
    }
  };
  if (isLoading) {
    return <div></div>; //return something to change before we get auth completed
  }
  return (
    <div className="w-screen h-screen flex flex-col bg-gray-50">
      <Navbar />
      <div className="flex-1 overflow-y-auto p-8">
        <Card className="w-1/2 mx-auto">
          <CardHeader>
            <CardTitle className="text-2xl font-bold text-gray-900">Your Tasks:</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex gap-4 mb-6">
              <Input
                type="text"
                placeholder="Add a new task..."
                value={newTask}
                onChange={(e) => setNewTask(e.target.value)}
                className="flex-1"
              />
              <Button onClick={addTask} className="flex items-center gap-2 text-white bg-blue-600 hover:bg-blue-700">
                <PlusCircle className="w-4 h-4 text-white" />
                Add Task
              </Button>
            </div>

            <div className="space-y-4">
              {tasks.map(task => (
                <div
                  key={task.id}
                  className="flex items-center gap-4 p-4 bg-white rounded-lg shadow-sm overflow-hidden"
                >
                  {editingTask?.id === task.id ? (
                    <div className="flex-1 flex gap-2">
                      <Input
                        value={editingTask.title}
                        onChange={(e) =>
                          setEditingTask({ ...editingTask, title: e.target.value })
                        }
                        className="flex-1"
                      />
                      <Button onClick={saveEdit}  className = 'text-black white' size="sm">
                        <Check className="w-7 h-7  text-white" />
                      </Button>
                    </div>
                  ) : (
                    <>
                  
                      <Checkbox
                        checked={task.isComplete}
                        onCheckedChange={() => toggleComplete(task.id)}
                          className= {`w-5 h-5 ${task.isComplete ? 'bg-green-600' : 'bg-red-600'}`}
      
                      />
                     
                      <span
                        className={`flex-1 ${task.isComplete ? 'line-through text-gray-500' : ''}`}
                      >
                        {task.title}
                      </span>
                      <div className="flex gap-2">

                        <Button
                          onClick={() => startEditing(task)}
                          variant="ghost"
                          size="sm"
                          className="p-2 text-black hover:bg-transparent hover:text-black" // Static black color
                        >
                          <Pencil className="pointer-events-auto w-4 h-4 text-yellow-600 " />
                        </Button>

                        <Button
                          onClick={() => deleteTask(task.id)}
                          variant="ghost"
                          size="sm"
                          className="p-2 " // White icon with hover effect
                        >
                          <Trash2 className="w-4 h-4 text-red-600" />
                        </Button>
                      </div>
                    </>
                  )}
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Task;