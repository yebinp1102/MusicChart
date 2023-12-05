export type NewUserType = {
  name: string;
  email: string;
  password: string;
}

export type UserType = {
  id: string;
  name: string;
  email: string;
  imageUrl: string;
  isAdmin: boolean;
}


export type NavLinkType = {
  imgUrl: string;
  route: string;
  label: string;
}