"use server";

import supabase from "@/app/config/supabase-config";

export const getReport = async () => {
  try {
    const { data, error } = await supabase.rpc("users_report");
    if (error) {
      return {
        success: false,
        message: error.message,
      };
    }

    return {
      success: true,
      data: data[0],
    };
  } catch (error: any) {
    return {
      success: false,
      message: error.message,
    };
  }
};

export const getSubscriptionsReport = async () => {
  try {
    const { data, error } = await supabase.rpc("subscriptions_report");
    if (error) {
      return {
        success: false,
        message: error.message,
      };
    }

    return {
      success: true,
      data: data[0],
    };
  } catch (error: any) {
    return {
      success: false,
      message: error.message,
    };
  }
};
