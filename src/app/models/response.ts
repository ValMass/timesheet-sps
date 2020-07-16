

export interface MyResponse<T>  {
  status: 'done' | 'error';
  message?; string;
  data?: T;
}
