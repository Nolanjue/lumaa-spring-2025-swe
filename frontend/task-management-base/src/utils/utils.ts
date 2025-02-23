export type TaskType = {
    id: number;
    title: string;
    description?: string;
    isComplete: boolean;
    userId?: number;
  }


export interface User{
    id: string
    username: string
}