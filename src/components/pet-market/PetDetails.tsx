"use client";

import { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogDescription,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Pet, InquiryResponse } from "@/types";

export function PetDetails({ pet }: { pet: Pet }) {
  const [view, setView] = useState<"details" | "form" | "success">("details");
  const [result, setResult] = useState<InquiryResponse | null>(null);

  const reset = () => {
    setView("details");
    setResult(null);
  };

  const formatDate = (dateStr: string) => {
    return new Intl.DateTimeFormat("en-SG", {
      dateStyle: "medium",
      timeStyle: "short",
    }).format(new Date(dateStr));
  };

  return (
    <Dialog onOpenChange={(open) => !open && reset()}>
      <DialogTrigger asChild>
        <Button
          className="w-full"
          variant={pet.available ? "default" : "secondary"}
        >
          View Details
        </Button>
      </DialogTrigger>

      <DialogContent className="sm:max-w-[425px]">
        <DialogDescription className="sr-only">
          Details and inquiry form for {pet.name}
        </DialogDescription>
        {view === "details" && (
          <div className="space-y-4">
            <img
              src={pet.image_url}
              alt={pet.name}
              className="w-full h-52 object-cover rounded-md"
            />
            <div className="flex justify-between items-center">
              <DialogTitle className="text-xl font-bold">
                {pet.name}
              </DialogTitle>
              <Badge variant={pet.available ? "default" : "destructive"}>
                {pet.available ? "Available" : "Unavailable"}
              </Badge>
            </div>
            <div className="text-sm border-t pt-4 space-y-2">
              <p>
                Species: <span className="capitalize">{pet.species}</span>
              </p>
              <p>
                Size: <span className="capitalize">{pet.size}</span>
              </p>
              <p>
                Age: {pet.age_months}{" "}
                {pet.age_months === 1 ? "month" : "months"}
              </p>
              <p className="text-lg font-bold">${pet.price}</p>
            </div>
            {pet.available ? (
              <Button onClick={() => setView("form")} className="w-full">
                Inquire
              </Button>
            ) : (
              <p className="text-sm text-center text-muted-foreground p-2 bg-slate-50 rounded">
                Closed
              </p>
            )}
          </div>
        )}

        {view === "form" && (
          <>
            <DialogHeader>
              <DialogTitle>Inquiry: {pet.name}</DialogTitle>
            </DialogHeader>
          </>
        )}

        {view === "success" && result && (
          <div className="text-center space-y-4 py-6">
            <div className="text-4xl text-green-500 font-bold">✓</div>
            <DialogTitle>Success</DialogTitle>
            <img
              src={result.imageUrl}
              className="h-24 w-24 rounded-full mx-auto object-cover"
            />
            <div className="text-xs text-muted-foreground">
              <p>Ref: {result.inquiryId}</p>
              <p>{formatDate(result.receivedAt)}</p>
            </div>
            <Button onClick={reset} variant="outline" className="w-full">
              Close
            </Button>
          </div>
        )}
      </DialogContent>
    </Dialog>
  );
}
