import { OperationValueObject, UserValueObject } from "./ValueObjects";

export interface BaseEntity {
  id: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface User {
    id: number;
    first_name: string;
    last_name: string;
    email: string;
    phone: string;
    created_at: string;
    user_type: number;
    role: string | null;
    
}

export interface Car extends BaseEntity {
  title: string;
  brand: string;
  model: string;
  plate: string;
  color: string;
  fuelType: string;
  description?: string;
  images?: {
    fileName: string;
    fileUrl: string;
    fileType: string;
  }[];
}

export interface Company {
    id: number;
    user_id: string;
    companyType: string | null;
    companyName: string;
    companyPhone: string;
    taxNumber: string;
    taxOffice: string;
    address: string;
    tcNo: string;
    taxCity: string;
    isApprove: number;
    firstName: string;
    lastName: string;
    email: string;
    phone: string;
    profileImage: string | null;
    accountType: number;
    role: string;
    providerRequested: boolean;
    isActive: number;
    providerStatus: number;
    bankIban: string | null;
    bankOwnerName: string | null;
    isOpen: boolean;
    createdAt: Date;
    updatedAt: Date;
}

export interface Address extends BaseEntity {
    userId: string;
    title: string;
    street: string;
    neighborhood: string;
    county: string;
    city: string;
    description?: string;
    distance?: number;
    latitude?: number;
    longitude?: number;
}

export interface WorkTime extends BaseEntity {
    userId: string;
    startHour: string;
    endHour: string;
    days: string[];
    updatedAt: Date;
}

export interface Support extends BaseEntity {
    topic: string;
    description: string;
    userId: string;
    createdAt: Date;
}

export interface Service extends BaseEntity {
    userId: string;
    userServices: any; // JSONB type
    createdAt: Date;
    updatedAt: Date;
}

export interface ServiceHistory extends BaseEntity {
    appointmentType: string;
    customerId: string;
    companyId: string;
    carId: string;
    addressId?: string;
    scheduledTime: Date;
    latitude?: number;
    longitude?: number;
    serviceStatus: number;
    paymentStatus: number;
    createdAt: Date;
}

export interface Rating extends BaseEntity {
    appointmentId: string;
    raterUserId: string;
    targetUserId: string;
    rating: number;
    comment?: string;
    createdAt: Date;
}

export interface Operation extends BaseEntity {
  name: string;
  description?: string;
  parentOperationId?: string;
  parentOperation?: OperationValueObject;
  createdAt: Date;
  createdById?: string;
  createdBy?: UserValueObject;
  updatedAt: Date;
  updatedById?: string;
  updatedBy?: UserValueObject;
  isDeleted: boolean;
  deletedAt?: Date;
  deletedById?: string;
  deletedBy?: UserValueObject;
}

export interface ServiceType extends BaseEntity {
  service_name: string;
  min_price: number;
  description?: string;
  status: boolean;
  created_at: Date;
  updated_at: Date;
}