"use server";

import supabase from "@/app/config/supabase-config";
import dayjs from "dayjs";

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

export const getCurSubscription = async (user_id: string) => {
  try {
    const { data, error } = await supabase
      .from("subscriptions")
      .select("* , plans(*)")
      .eq("user_id", user_id)
      .order("created_at", { ascending: false })
      .limit(1);

    if (error) {
      throw new Error(error.message);
    }

    if (data.length === 0) {
      return {
        success: false,
        data: null,
      };
    }
    const sub = data[0];
    if (dayjs(sub.end_date, "YYYY-MM-DD").isBefore(dayjs())) {
      return {
        success: false,
        data: null,
      };
    }
    sub.plan = sub.plans;
    return {
      success: true,
      data: sub,
    };
  } catch (error: any) {
    return {
      success: false,
      message: error.message,
    };
  }
};

export const getAllUserSubscription = async (user_id: string) => {
  try {
    const { data, error } = await supabase
      .from("subscriptions")
      .select("* , plans(*)")
      .eq("user_id", user_id)
      .order("created_at", { ascending: false });

    if (error) {
      throw new Error(error.message);
    }

    let formattedData = data.map((item: any) => ({
      plan: item.plans,
      ...item,
    }));

    return {
      success: true,
      data: formattedData,
    };
  } catch (error: any) {
    return {
      success: false,
      message: error.message,
    };
  }
};

export const getAllSubscriptions = async () => {
  try {
    const { data, error } = await supabase
      .from("subscriptions")
      .select("* , plans(*), user_profiles(name)");

    if (error) {
      throw new Error(error.message);
    }

    let formattedData = data.map((item: any) => ({
      plan: item.plans,
      ...item,
    }));

    return {
      success: true,
      data: formattedData,
    };
  } catch (error: any) {
    return {
      success: false,
      message: error.message,
    };
  }
};
