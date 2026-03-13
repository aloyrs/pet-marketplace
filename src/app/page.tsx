"use client";

import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { petService } from "@/services/petService";
import { Skeleton } from "@/components/ui/skeleton";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

export default function PetPage() {
  const [filters, setFilters] = useState({ species: "", size: "" });

  const {
    data: pets,
    isLoading,
    isError,
  } = useQuery({
    queryKey: ["pets", filters],
    queryFn: () => petService.getPets(filters),
  });

  return (
    <div className="max-w-7xl mx-auto p-6 space-y-10">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-6">
        <div>
          <h1 className="text-4xl font-black">Pet Marketplace</h1>
        </div>
        <div className="flex gap-3">
          <select
            className="border h-9 rounded-md px-3 text-sm"
            onChange={(e) =>
              setFilters((p) => ({ ...p, species: e.target.value }))
            }
          >
            <option value="">All Species</option>
            <option value="cat">Cats</option>
            <option value="dog">Dogs</option>
            <option value="rabbit">Rabbits</option>
            <option value="bird">Birds</option>
          </select>
          <select
            className="border h-9 rounded-md px-3 text-sm"
            onChange={(e) =>
              setFilters((p) => ({ ...p, size: e.target.value }))
            }
          >
            <option value="">All Sizes</option>
            <option value="small">Small</option>
            <option value="medium">Medium</option>
            <option value="large">Large</option>
          </select>
        </div>
      </div>

      {isLoading ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {[1, 2, 3, 4].map((i) => (
            <Skeleton key={i} className="h-72 w-full rounded-xl" />
          ))}
        </div>
      ) : isError ? (
        <div className="text-center py-20">Error loading data.</div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {pets?.map((pet) => (
            <Card
              key={pet.id}
              className={!pet.available ? "opacity-50 grayscale" : ""}
            >
              <CardHeader className="p-0">
                <img
                  src={pet.image_url}
                  alt={pet.name}
                  className="h-48 w-full object-cover rounded-t-xl"
                />
              </CardHeader>
              <CardContent className="p-4 space-y-1">
                <div className="flex justify-between items-center">
                  <CardTitle className="text-lg">{pet.name}</CardTitle>
                  <Badge variant={pet.available ? "secondary" : "destructive"}>
                    {pet.available ? "Available" : "Sold"}
                  </Badge>
                </div>
                <p className="text-xs text-muted-foreground capitalize">
                  {pet.species} • {pet.size}
                </p>
                <p className="font-bold">${pet.price}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
}
