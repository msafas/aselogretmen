import { UserType } from './Enums';

export interface FileValueObject {
    fileName: string;
    fileUrl: string;
    fileType: string;
}

export interface UserValueObject {
    id: string;
    firstName: string;
    lastName: string;
    email: string;
    role?: UserType;
}

export interface OperationValueObject {
    id: string;
    name: string;
    description?: string;
} 