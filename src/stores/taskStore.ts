import { defineStore } from 'pinia';
import { ref, computed } from 'vue';
import { collection, addDoc, updateDoc, deleteDoc, doc, getDocs } from 'firebase/firestore';
import { db } from '../config/firebase';
import { useLocalStorage } from '@vueuse/core';

export interface Task {
  id?: string;
  title: string;
  description: string;
  dueDate: string;
  priority: 'low' | 'medium' | 'high';
  status: 'pending' | 'in-progress' | 'completed';
}

export const useTaskStore = defineStore('tasks', () => {
  const tasks = ref<Task[]>(useLocalStorage('tasks', []));
  const loading = ref(false);

  const pendingTasks = computed(() => 
    tasks.value.filter(task => task.status === 'pending')
  );

  const inProgressTasks = computed(() => 
    tasks.value.filter(task => task.status === 'in-progress')
  );

  const completedTasks = computed(() => 
    tasks.value.filter(task => task.status === 'completed')
  );

  async function fetchTasks() {
    loading.value = true;
    try {
      const querySnapshot = await getDocs(collection(db, 'tasks'));
      tasks.value = querySnapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      })) as Task[];
    } catch (error) {
      console.error('Error fetching tasks:', error);
    } finally {
      loading.value = false;
    }
  }

  async function addTask(task: Omit<Task, 'id'>) {
    try {
      const docRef = await addDoc(collection(db, 'tasks'), task);
      tasks.value.push({ ...task, id: docRef.id });
    } catch (error) {
      console.error('Error adding task:', error);
    }
  }

  async function updateTask(taskId: string, updates: Partial<Task>) {
    try {
      await updateDoc(doc(db, 'tasks', taskId), updates);
      const index = tasks.value.findIndex(t => t.id === taskId);
      if (index !== -1) {
        tasks.value[index] = { ...tasks.value[index], ...updates };
      }
    } catch (error) {
      console.error('Error updating task:', error);
    }
  }

  async function deleteTask(taskId: string) {
    try {
      await deleteDoc(doc(db, 'tasks', taskId));
      tasks.value = tasks.value.filter(t => t.id !== taskId);
    } catch (error) {
      console.error('Error deleting task:', error);
    }
  }

  return {
    tasks,
    loading,
    pendingTasks,
    inProgressTasks,
    completedTasks,
    fetchTasks,
    addTask,
    updateTask,
    deleteTask
  };
});