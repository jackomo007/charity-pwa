"use client";

import { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "../../../components/ui/dialog";
import { Button } from "../../../components/ui/button";
import { Input } from "../../../components/ui/input";
import { Label } from "../../../components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../../../components/ui/select";
import type { DonationFormData } from "../../../lib/types";
import { useToast } from "../../../hooks/use-toast";
import { useMutation } from "@apollo/client";
import { ADD_DONATION, GET_DONATIONS } from "../../../graphql/queries";
import { useDonationStore } from "../../../lib/store";

export function DonationDialog() {
  const { toast } = useToast();
  const addDonation = useDonationStore((state) => state.addDonation);
  const [open, setOpen] = useState(false);
  const [addDonationMutation] = useMutation(ADD_DONATION, {
    refetchQueries: [{ query: GET_DONATIONS }],
  });

  const [formData, setFormData] = useState<DonationFormData>({
    amount: "",
    category: "",
    description: "",
  });

  // Formatear cantidad en tiempo real
  const formatCurrency = (value: string) => {
    const numericValue = value.replace(/\D/g, ""); // Elimina todo excepto números
    if (!numericValue) return "";

    const formatted = new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
      minimumFractionDigits: 2,
    }).format(parseFloat(numericValue) / 100); // Dividir por 100 para incluir decimales

    return formatted;
  };

  const handleAmountChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const rawValue = e.target.value;
    const formattedValue = formatCurrency(rawValue);
    setFormData({ ...formData, amount: formattedValue });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const cleanAmount = parseFloat(formData.amount.replace(/[$,]/g, "")); // Limpia para enviar al backend
    if (!cleanAmount || !formData.category) {
      toast({
        title: "Error",
        description: "Please fill in all required fields",
        variant: "destructive",
      });
      return;
    }

    try {
      const month = new Date()
        .toLocaleString("default", { month: "short" })
        .toUpperCase();

      await addDonationMutation({
        variables: {
          amount: cleanAmount,
          donorName: "Anonymous",
          month,
          category: formData.category,
        },
      });

      addDonation({
        amount: cleanAmount,
        donorName: "Anonymous",
        category: formData.category,
        month: "",
        id: "",
      });

      toast({
        title: "Success",
        description: "Donation submitted successfully!",
      });

      setFormData({ amount: "", category: "", description: "" });
      setOpen(false);
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to submit donation. Please try again.",
        variant: "destructive",
      });
      console.error(error);
    }
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button>New Donation</Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Create New Donation</DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="amount">Amount *</Label>
            <Input
              id="amount"
              type="text"
              placeholder="$0.00"
              value={formData.amount}
              onChange={handleAmountChange}
              required
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="category">Category *</Label>
            <Select
              value={formData.category}
              onValueChange={(value) =>
                setFormData({ ...formData, category: value })
              }
              required
            >
              <SelectTrigger>
                <SelectValue placeholder="Select category" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="education">Education</SelectItem>
                <SelectItem value="healthcare">Healthcare</SelectItem>
                <SelectItem value="environment">Environment</SelectItem>
                <SelectItem value="poverty">Poverty Relief</SelectItem>
                <SelectItem value="arts">Arts & Culture</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <Button type="submit" className="w-full">
            Submit Donation
          </Button>
        </form>
      </DialogContent>
    </Dialog>
  );
}
