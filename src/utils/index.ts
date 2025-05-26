"use server";

import supabase from "@/app/config/supabase-config";

export const uploadImages = async (file: File) => {
  try {
    const filename = new Date().getTime() + file.name;
    const { data, error } = await supabase.storage
      .from("plans")
      .upload(filename, file);
    if (error) throw new Error(error.message);

    const url = await supabase.storage.from("default").getPublicUrl(filename);
    return {
      success: true,
      data: url.data.publicUrl,
    };
  } catch (e) {
    if (e instanceof Error) {
      return {
        success: false,
        message: e.message,
      };
    }
  }
};
