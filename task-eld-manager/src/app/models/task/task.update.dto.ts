export interface TaskUpdateDTO {
    id: number;
    userId: number;
    title: string;
    status: string;
    deadline: Date;
    createdAt: Date;
}