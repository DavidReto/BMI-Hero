// Shared TypeScript types used across the application

export interface User {
    id: number;
    name: string;
    createdAt?: Date;
    updatedAt?: Date;
}

export interface Measurement {
    id: number;
    userId: number;
    triceps?: number;
    biceps?: number;
    chest?: number;
    midaxillary?: number;
    subscapular?: number;
    suprailiac?: number;
    abdominal?: number;
    thigh?: number;
    bodyFatPercentage?: number;
    method: string;
    createdAt: Date;
    updatedAt: Date;
}

export interface ApiResponse<T> {
    data?: T;
    error?: string;
    message?: string;
}
