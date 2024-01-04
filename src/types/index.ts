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

export type NewSongType = {
  singer: string;
  title: string;
  file: File[];
  tags?: string;
}

export type UpdateSongType = {
  songId: string;
  imageId: string;
  imageUrl: URL;
  singer: string;
  title: string;
  file: File[];
  tags?: string;
}