"use server";

import { auth } from "@clerk/nextjs/server";
import { createSupabaseClient } from "@/lib/supabase";

export const createNeuranote = async (formData: CreateNeuranote) => {
  const { userId: author } = await auth();
  const supabase = createSupabaseClient();

  const { data, error } = await supabase
    .from("neuranotes")
    .insert({ ...formData, author })
    .select();

  if (error || !data) {
    throw new Error(`Error creating Neuranote: ${error?.message}`);
  }
  return data[0];
};
