"use client";

import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { petService } from "@/services/petService";
import { Skeleton } from "@/components/ui/skeleton";
import { PetDetails } from "@/components/pet-market/PetDetails";
import {
  Card,
  CardHeader,
  CardTitle,
  CardContent,
  CardFooter,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { capitalize } from "@/lib/utils";

export default function PetPage() {
  const [filters, setFilters] = useState({
    species: "",
    size: "",
    available: "",
  });

  const {
    data: allPets,
    isLoading,
    isError,
  } = useQuery({
    queryKey: ["pets", "all"],
    queryFn: () => petService.getPets({}),
  });

  const uniqueSpecies = Array.from(new Set(allPets?.map((p) => p.species)));

  const filteredPets = allPets?.filter((pet) => {
    const matchesSpecies = !filters.species || pet.species === filters.species;
    const matchesSize = !filters.size || pet.size === filters.size;
    const matchesAvailable =
      filters.available === "" ||
      pet.available === (filters.available === "true");

    return matchesSpecies && matchesSize && matchesAvailable;
  });

  return (
    <div className="max-w-7xl mx-auto p-6 space-y-10">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-6">
        <div>
          <h1 className="text-4xl font-bold">Pet Marketplace</h1>
        </div>
        <div className="flex gap-3">
          <select
            className="border h-9 rounded-md px-3 text-sm"
            onChange={(e) =>
              setFilters((p) => ({ ...p, species: e.target.value }))
            }
          >
            <option value="">All Species</option>
            {uniqueSpecies.map((species) => (
              <option key={species} value={species}>
                {capitalize(species)}
              </option>
            ))}
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
          <select
            className="border h-9 rounded-md px-3 text-sm bg-white"
            value={filters.available}
            onChange={(e) =>
              setFilters((p) => ({ ...p, available: e.target.value }))
            }
          >
            <option value="">All Availability</option>
            <option value="true">Available</option>
            <option value="false">Unavailable</option>
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
          {filteredPets?.map((pet) => (
            <Card
              key={pet.id}
              className={`p-0 overflow-hidden ${!pet.available ? "opacity-50 grayscale" : ""}`}
            >
              <CardHeader className="p-0">
                <img
                  src={pet.image_url}
                  alt={pet.name}
                  className="h-80 w-full object-cover"
                />
              </CardHeader>
              <CardContent className="p-4 space-y-1">
                <div className="flex justify-between items-center">
                  <CardTitle className="text-lg">{pet.name}</CardTitle>
                  <Badge variant={pet.available ? "available" : "destructive"}>
                    {pet.available ? "Available" : "Unavailable"}
                  </Badge>
                </div>
                <p className="text-xs text-muted-foreground capitalize">
                  {pet.species} • {pet.size} • {pet.age_months}{" "}
                  {pet.age_months === 1 ? "month" : "months"}
                </p>
                <p>${pet.price}</p>
              </CardContent>
              <CardFooter className="p-4">
                <PetDetails pet={pet} />
              </CardFooter>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
}
