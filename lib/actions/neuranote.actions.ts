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

  try {
    let query = supabase.from("neuranotes").select();

    if (subject && topic) {
      query = query
        .ilike("subject", `%${subject}%`)
        .or(`topic.ilike.%${topic}%,name.ilike.%${topic}%`);
    } else if (subject) {
      query = query.ilike("subject", `%${subject}%`);
    } else if (topic) {
      query = query.or(`topic.ilike.%${topic}%,name.ilike.%${topic}%`);
    }

    query = query.range((page - 1) * limit, page * limit - 1);

    const { data: neuranotes, error } = await query;

    if (error) throw new Error(error.message);

    return neuranotes;
  } catch (err) {
    console.error("Failed to fetch neuranotes:", err);
    throw new Error("Failed to load notes. Please check your connection.");
  }
};

export const getNeuranote = async (id: string) => {
  const supabase = createSupabaseClient();

  const { data, error } = await supabase
    .from("neuranotes")
    .select()
    .eq("id", id);
  if (error) {
    return console.log(error?.message);
  }

  return data[0];
};

export const addToSessionHistory = async (neuranoteId: string) => {
  const { userId } = await auth();
  const supabase = createSupabaseClient();

  const { data, error } = await supabase
    .from("session_history")
    .insert({ user_id: userId, note_id: neuranoteId });

  if (error) throw new Error(error.message);

  return data;
};

export const getSessions = async (limit = 10) => {
  const supabase = createSupabaseClient();

  const { data, error } = await supabase
    .from("session_history")
    .select(`notes:note_id(*)`)
    .order("created_at", { ascending: false })
    .limit(limit);

  if (error) throw new Error(error.message);

  return data.map(({ notes }) => notes);
};

export const getUserSessions = async (userId: string, limit = 10) => {
  const supabase = createSupabaseClient();

  const { data, error } = await supabase
    .from("session_history")
    .select(`notes:note_id(*)`)
    .eq("user_id", userId)
    .order("created_at", { ascending: false })
    .limit(limit);

  if (error) throw new Error(error.message);

  return data.map(({ notes }) => notes);
};
export const getUserNeuranotes = async (userId: string) => {
  const supabase = createSupabaseClient();

  const { data, error } = await supabase
    .from("neuranotes")
    .select()
    .eq("author", userId);

  if (error) throw new Error(error.message);

  return data;
};
