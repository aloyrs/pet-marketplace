import { api } from "@/lib/api";
import { Pet, InquiryRequest, InquiryResponse } from "@/types";

export const petService = {
  getPets: async (params: Record<string, any>) => {
    const cleanParams = Object.fromEntries(
      Object.entries(params).filter(([_, v]) => v !== ""),
    );
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
