"use client";

import axios from "axios";
import { useRouter } from "next/navigation";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useForm } from "react-hook-form";
import { toast } from "sonner";

import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Slider } from "@/components/ui/slider";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Form, FormItem, FormLabel, FormControl, FormMessage, FormField } from "@/components/ui/form";

const categories = ["Hardware Problem", "Software Problem", "Application Development", "Project"];

const status = [
  { value: "not started", name: "Not Started" },
  { value: "started", name: "Started" },
  { value: "done", name: "Done" },
];

export function EditTicketForm({ ticket }) {
  const EDIT_MODE = ticket?.id !== undefined;
  const router = useRouter();
  const queryClient = useQueryClient();

  const form = useForm({
    defaultValues: {
      title: ticket?.title || "",
      description: ticket?.description || "",
      priority: ticket?.priority || 1,
      progress: ticket?.progress || 0,
      status: ticket?.status || "not started",
      category: ticket?.category || "Hardware Problem",
    },
  });

  const { mutate } = useMutation({
    mutationFn: (formData) => {
      axios({
        method: EDIT_MODE ? "put" : "post",
        url: `/api/tickets/${EDIT_MODE ? ticket.id : ""}`,
        data: JSON.stringify({ formData }),
      });
    },
    onSuccess: async () => {
      await queryClient.invalidateQueries({ queryKey: ["tickets"] });
      router.push("/");
      router.refresh();
      toast.success(`Ticket ${EDIT_MODE ? "updated" : "created"} with success`);
    },
    onError: () => {
      toast.error(`Failed to ${EDIT_MODE ? "update" : "create"} ticket`);
    },
  });

  return (
    <div className="flex justify-center">
      <Form {...form}>
        <form onSubmit={form.handleSubmit(mutate)} className="flex w-1/2 flex-col gap-3">
          <h3 className="mt-5 text-3xl font-bold">{EDIT_MODE ? "Update Your Ticket" : "Create New Ticket"}</h3>

          <FormField
            control={form.control}
            name="title"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Title</FormLabel>
                <FormControl>
                  <Input {...field} className="p1 m-1 rounded bg-custom-card" />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="description"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Description</FormLabel>
                <FormControl>
                  <Textarea
                    {...field}
                    placeholder="Type your Description here."
                    className="bg-custom-card text-white placeholder-white"
                    cols="30"
                    rows="5"
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="category"
            render={({ field: { value, onChange } }) => (
              <FormItem>
                <FormLabel>Category</FormLabel>
                <Select onValueChange={onChange} defaultValue={value}>
                  <FormControl>
                    <SelectTrigger className="bg-custom-card">
                      <SelectValue placeholder="Select a verified email to display" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    {categories?.map((category, index) => (
                      <SelectItem value={category} key={index}>
                        {category}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="priority"
            render={({ field: { value, onChange } }) => (
              <FormItem className="space-y-3">
                <FormLabel>Priority</FormLabel>
                <FormControl>
                  <RadioGroup onValueChange={onChange} defaultValue={value} className="flex flex-col space-y-1">
                    {Array.from({ length: 5 }, (_, index) => (
                      <FormItem key={index} className="flex items-center space-x-3 space-y-0">
                        <FormControl>
                          <RadioGroupItem value={index + 1} />
                        </FormControl>
                        <FormLabel className="cursor-pointer font-normal">Level {index + 1}</FormLabel>
                      </FormItem>
                    ))}
                  </RadioGroup>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="progress"
            render={({ field: { value, onChange } }) => (
              <FormItem>
                <FormLabel>Status</FormLabel>
                <FormControl>
                  <Slider
                    min={0}
                    max={100}
                    step={1}
                    defaultValue={[value]}
                    onValueChange={(vals) => {
                      onChange(vals[0]);
                    }}
                  />
                </FormControl>
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="status"
            render={({ field: { value, onChange } }) => (
              <FormItem className="space-y-3">
                <FormLabel>Status</FormLabel>
                <FormControl>
                  <RadioGroup onValueChange={onChange} defaultValue={value} className="flex flex-col space-y-1">
                    {status.map(({ value, name }, index) => (
                      <FormItem key={index} className="flex items-center space-x-3 space-y-0">
                        <FormControl>
                          <RadioGroupItem value={value} />
                        </FormControl>
                        <FormLabel className="cursor-pointer font-normal">{name}</FormLabel>
                      </FormItem>
                    ))}
                  </RadioGroup>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <Button type="submit" className="mt-5 max-w-xs bg-custom-card">
            {EDIT_MODE ? "Update Ticket" : "Create Ticket"}
          </Button>
        </form>
      </Form>
    </div>
  );
}
