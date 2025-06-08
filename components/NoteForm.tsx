"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";

import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { subjects } from "@/constants";
import { createNeuranote } from "@/lib/actions/neuranote.actions";
import { redirect } from "next/navigation";
import { PdfUploadDemo } from "@/components/PdfUploadDemo";

const formSchema = z.object({
  name: z.string().min(1, { message: "Neura name is required" }),
  subject: z.string().min(1, { message: "Subject name is required" }),
  topic: z.string().min(1, { message: "Topic name is required" }),
  voice: z.string().min(1, { message: "Voice type is required" }),
  style: z.string().min(1, { message: "Speaking style is required" }),
  duration: z.coerce.number().min(1, { message: "Duration is required" }),
});

const NoteForm = () => {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      subject: "",
      topic: "",
      voice: "",
      style: "",
      duration: 15,
    },
  });

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    const neuranote = await createNeuranote(values);

    if (neuranote) {
      redirect(`/notes/${neuranote.id}`);
    } else {
      console.log("Failed to create Neuranote");
      redirect("/");
    }
  };
  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 rounded-4xl border-4 border-white shadow-[0_5px_10px_rgba(0,0,0,0.08),0_15px_25px_-5px_rgba(25,28,33,0.2)] p-4 w-full mt-4">
          <div className="space-y-4">
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Neuranote Topic name</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="Enter the Neuranote topic name"
                      {...field}
                      className="input"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="subject"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Neuranote Subject name</FormLabel>
                  <FormControl>
                    <Select
                      onValueChange={field.onChange}
                      value={field.value}
                      defaultValue={field.value}
                    >
                      <SelectTrigger className="capitalize input">
                        <SelectValue placeholder="Select the Neuranote subject name" />
                      </SelectTrigger>
                      <SelectContent>
                        {subjects.map((subject) => (
                          <SelectItem value={subject} key={subject}>
                            {subject}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="topic"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>What should this Neuranote teach you?</FormLabel>
                  <FormControl>
                    <Textarea
                      placeholder="Describe what this Neuranote should teach you"
                      {...field}
                      className="input"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="voice"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Neuranote Voice type</FormLabel>
                  <FormControl>
                    <Select
                      onValueChange={field.onChange}
                      value={field.value}
                      defaultValue={field.value}
                    >
                      <SelectTrigger className="input">
                        <SelectValue placeholder="pick your voice assistance type" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="male">Male</SelectItem>
                        <SelectItem value="Female">Female</SelectItem>
                      </SelectContent>
                    </Select>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="style"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Neuranote style</FormLabel>
                  <FormControl>
                    <Select
                      onValueChange={field.onChange}
                      value={field.value}
                      defaultValue={field.value}
                    >
                      <SelectTrigger className="input">
                        <SelectValue placeholder="Select the Neuranote style" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="formal">Formal</SelectItem>
                        <SelectItem value="casual">Casual</SelectItem>
                      </SelectContent>
                    </Select>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="duration"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Session duration</FormLabel>
                  <FormControl>
                    <Input
                      type="number"
                      placeholder="15"
                      {...field}
                      className="input"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
          <div className="flex flex-col justify-center items-center">
            <PdfUploadDemo />
          </div>
        </div>

        <Button type="submit" className="w-full cursor-pointer">
          Build your Neuranote
        </Button>
      </form>
    </Form>
  );
};

export default NoteForm;
