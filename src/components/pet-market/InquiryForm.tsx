"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { useMutation } from "@tanstack/react-query";
import { petService } from "@/services/petService";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";

const inquirySchema = z.object({
  fullName: z
    .string()
    .min(2, "Name is required, should have at least 2 characters"),
  email: z.email("Invalid email format"),
  message: z.string().min(10, "Message must be at least 10 characters"),
});

type InquiryFormData = z.infer<typeof inquirySchema>;

export function InquiryForm({ petId, onSuccess, onCancel }: any) {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<InquiryFormData>({
    resolver: zodResolver(inquirySchema),
  });

  const mutation = useMutation({
    mutationFn: (data: InquiryFormData) =>
      petService.submitInquiry({ ...data, petId }),
    onSuccess: (data) => onSuccess(data),
  });

  return (
    <form
      onSubmit={handleSubmit((data) => mutation.mutate(data))}
      className="space-y-4"
    >
      <div className="space-y-1">
        <Input {...register("fullName")} placeholder="Full Name" />
        {errors.fullName && (
          <p className="text-xs text-red-500">{errors.fullName.message}</p>
        )}
      </div>

      <div className="space-y-1">
        <Input {...register("email")} placeholder="Email" />
        {errors.email && (
          <p className="text-xs text-red-500">{errors.email.message}</p>
        )}
      </div>

      <div className="space-y-1">
        <Textarea {...register("message")} placeholder="Message" />
        {errors.message && (
          <p className="text-xs text-red-500">{errors.message.message}</p>
        )}
      </div>

      <div className="flex gap-2 pt-2">
        <Button
          type="button"
          variant="outline"
          className="flex-1"
          onClick={onCancel}
        >
          Cancel
        </Button>
        <Button type="submit" className="flex-1" disabled={mutation.isPending}>
          {mutation.isPending ? "Sending..." : "Submit Inquiry"}
        </Button>
      </div>
    </form>
  );
}
