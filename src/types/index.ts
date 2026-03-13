export interface Pet {
  id: string;
  name: string;
  species: string;
  age_months: number;
  size: "small" | "medium" | "large";
  price: number;
  image_url: string;
  available: boolean;
}

export interface InquiryRequest {
  petId: string;
  fullName: string;
  email: string;
  message: string;
}

export interface InquiryResponse {
  ok: boolean;
  inquiryId: string;
  receivedAt: string;
  petId: string;
  petName: string;
  imageUrl: string;
}
