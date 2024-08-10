export interface User {
  id: number;
  email: string;
  first_name: string;
  last_name: string;
  avatar: string;
  name?: string;  // Optional property since it will be added later
}
