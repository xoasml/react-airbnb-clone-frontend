export interface IUploadRoom {
  name: string;
  country: string;
  city: string;
  price: number;
  rooms: number;
  toilets: number;
  description: string;
  address: string;
  pet_friendly: boolean;
  kind: string;
  amenities: number[];
  category: number;
}

export interface IAmenity {
  pk: number;
  name: string;
  description: string;
}

export interface IRoomImageUpload {
  image: FileList;
}

export interface IUploadURLResponse {
  id: string;
  uploadURL: string;
}

export interface IUploadImageVariables {
  file: FileList;
  uploadURL: string;
}

export interface ICreatePhotoVariables {
  description: string;
  file: string;
  roomPk: string;
}
