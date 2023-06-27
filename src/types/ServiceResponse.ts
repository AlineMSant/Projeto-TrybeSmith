export type ServiceResponseSuccess<T> = {
  status: 'SUCCESSFUL', 
  data: T
};

export type ServiceResponse<T> = ServiceResponseSuccess<T>;