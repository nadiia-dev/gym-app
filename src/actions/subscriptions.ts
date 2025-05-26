"use server";

import supabase from "@/app/config/supabase-config";

export const createSubscription = async (payload: any) => {
  try {
    const { data, error } = await supabase
      .from("subscriptions")
      .insert([payload]);
    if (error) {
      throw new Error(error.message);
    }

    await supabase.from("user_profiles").upsert({
      id: payload.user_id,
      is_customer: true,
    });

    return {
      success: true,
      data,
    };
  } catch (error: any) {
    return {
      success: false,
      message: error.message,
    };
  }
};
