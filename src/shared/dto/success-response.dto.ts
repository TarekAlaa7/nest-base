export class SuccessResponse<T> {
  data: T;
  success: boolean;
  message: string;
  status: number;

  constructor(data: T, message: string = 'Operation completed successfully.', status: number = 200) {
    this.data = data;
    this.success = true;
    this.message = message;
    this.status = status; 
  }
}
