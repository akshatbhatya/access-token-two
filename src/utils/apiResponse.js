class ApiResponse {
  constructor(status, message, data) {
    (this.status = status),
      (this.message = message),
      (this.data = data),
      (this.sucess = status < 400);
  }
}

export default ApiResponse;
