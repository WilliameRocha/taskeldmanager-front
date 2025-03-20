import { User } from "../user/user";

export interface Task{
    id: number;
    user: User;
    title: string;
    status: string;
    deadline: Date;
    createdAt: Date;
}