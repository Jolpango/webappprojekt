export default interface AuthResponse {
  type: "success" | "error" | "warning",
  title: string,
  message: string,
}