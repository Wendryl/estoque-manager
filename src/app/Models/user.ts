export interface IUser {
  id?: number,
  name: string,
  email: string,
  phone: string | null,
  profile_id: number,
  uf: string,
  city: string | null,
  neighborhood: string | null,
  password?: string
}
