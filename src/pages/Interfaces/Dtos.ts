
export interface CreateCarDto {
    title: string;
    brand: string;
    model: string;
    plate: string;
    color: string;
    fuelType: string;
    description?: string;
}

export interface CreateCompanyDto {
    companyType: string;
    companyName: string;
    companyPhone: string;
    taxNumber: string;
    taxOffice: string;
    address?: string;
    tcNo?: string;
}

export interface CreateAddressDto {
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

export interface CreateWorkTimeDto {
    startHour: string;
    endHour: string;
    days: string[];
}

export interface CreateSupportDto {
    topic: string;
    description: string;
}

export interface CreateServiceDto {
    userServices: any; // JSONB type
}

export interface CreateServiceHistoryDto {
    appointmentType: string;
    customerId: string;
    companyId: string;
    carId: string;
    addressId?: string;
    scheduledTime: Date;
    latitude?: number;
    longitude?: number;
}

export interface CreateRatingDto {
    appointmentId: string;
    rating: number;
    comment?: string;
}

export interface CreateOperationDto {
    name: string;
    description?: string;
    parentOperationId?: string;
}

export interface UpdateOperationDto {
    name?: string;
    description?: string;
    parentOperationId?: string;
} 