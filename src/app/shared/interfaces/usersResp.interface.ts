import { User } from "./user.interface";

export interface UsersRep {
  data: User[],
  page: number,
  per_page: number,
  total: number,
  total_pages: number
}
