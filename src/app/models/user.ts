export interface IUser {
  id?: number,
  name: string,
  email: string,
  phone: string | null,
  profile_id: number,
  uf: string | null,
  city: string | null,
  neighborhood: string | null
}
