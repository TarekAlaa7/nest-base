export class ErrorResponse {
  success: boolean;
  message: string;
  errors: any[];
  status: number; 

  constructor(message: string = 'An error occurred.', errors: any[] = [], status: number = 422) {
    this.success = false;
    this.message = message;
    this.errors = errors;
    this.status = status; 
  }
}
