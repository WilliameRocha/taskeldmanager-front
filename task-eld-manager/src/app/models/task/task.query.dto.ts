export interface TaskQueryDTO{
    id: number;
    userId: number;
    title: string;
    status: string;
    deadline: Date;
    createdAt: Date;
}