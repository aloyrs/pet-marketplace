import { api } from "@/lib/api";
import { Pet, InquiryRequest, InquiryResponse } from "@/types";

export const petService = {
  getPets: async (params: Record<string, any>) => {
    const cleanParams: Record<string, any> = {};

    Object.entries(params).forEach(([key, value]) => {
      if (value === "") return;

      if (key === "available") {
        cleanParams[key] = value === "true";
      } else {
        cleanParams[key] = value;
      }
    });
    const { data } = await api.get<{ data: Pet[] }>("/pets", {
      params: cleanParams,
    });
    return data.data;
  },
  submitInquiry: async (payload: InquiryRequest) => {
    const { data } = await api.post<InquiryResponse>("/inquiries", payload);
    return data;
  },
};
