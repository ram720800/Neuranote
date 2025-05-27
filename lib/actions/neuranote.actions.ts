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

export const getAllNeuranotes = async ({
  limit = 10,
  page = 1,
  subject,
  topic,
}: GetAllNeuranotes) => {
  const supabase = createSupabaseClient();

  let query = supabase.from("neuranotes").select();

  if (subject && topic) {
    query =  query.ilike( "subject",  `%${subject}%`)
    .or(`topic.ilike.%${topic}%,name.ilkie.%${topic}%`)
  }else if(subject){
    query = query.ilike("subject",  `%${subject}%`);
  } else if (topic) {
    query=query.or(`topic.ilike.%${topic}%,name.ilike.%${topic}%`);
  }

  query = query.range((page - 1) * limit, page * limit - 1);

  const { data: neuranotes, error } = await query;

  if (error) throw new Error(error.message)
  
  return neuranotes;
};
