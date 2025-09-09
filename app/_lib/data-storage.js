"use server";
import { eachDayOfInterval } from "date-fns";
import { supabase } from "./supabase";

export async function getAllCars() {
  const { data, error } = await supabase
    .from("cars")
    .select("*")
    .order("price_per_day", { ascending: true });

  if (error) throw error;
  return data;
}

export async function getAvailableCars() {
  const { data, error } = await supabase
    .from("cars")
    .select("*")
    .order("price_per_day", { ascending: true });

  if (error) throw error;
  return data;
}

export async function getCarById(carId) {
  const { data, error } = await supabase
    .from("cars")
    .select("*")
    .eq("id", carId)
    .single();

  if (error) throw error;
  return data;
}

export async function getReviewsByCarId(carId) {
  const { data, error } = await supabase
    .from("reviews")
    .select("*")
    .eq("carId", carId)
    .order("created_at", { ascending: false });

  if (error) throw error;
  return data;
}

/* export async function getRentalsByCar(carId) {
  const { data, error } = await supabase
    .from("rentals")
    .select("*")
    .eq("car_id", carId)
    .order("start_date", { ascending: true });

  if (error) throw error;
  return data;
}


export async function getRentalsByUser(userId) {
  const { data, error } = await supabase
    .from("rentals")
    .select("*")
    .eq("user_id", userId)
    .order("start_date", { ascending: false });

  if (error) throw error;
  return data;
}
 */

export async function cancelRental(rentalId) {
  const { data, error } = await supabase
    .from("rentals")
    .update({ status: "Cancelled" })
    .eq("id", rentalId);

  if (error) throw error;
  return data;
}

/**
 * 5. Get all booked/pre-booked dates for a car
 *    -> Use this to disable booked dates in calendar
 */

export async function getRentalById(id) {
  console.log(id);
  const { data, error } = await supabase
    .from("rentals")
    .select("*")
    .eq("id", id)
    .single();
  if (error) {
    console.error("Error finding Booking :", error);
    throw new Error(error);
  }
  return data;
}

export async function getBookedDates(carId) {
  const today = new Date();
  today.setUTCHours(0, 0, 0, 0);

  const { data, error } = await supabase
    .from("rentals")
    .select("startDate, endDate")
    .eq("carId", carId)
    .eq("status", "active")
    .gte("endDate", today.toISOString());

  if (error) {
    console.error(error);
    throw new Error("Bookings could not get loaded");
  }

  // Flatten all dates into one array
  return data.map((rental) => ({
    startDate: rental.startDate,
    endDate: rental.endDate,
  }));
}

export async function createCustomer(newCustomer) {
  const { data: last } = await supabase
    .from("customer")
    .select("id")
    .order("id", { ascending: false })
    .limit(1);

  const newId = last?.[0]?.id ? last[0].id + 1 : 1;

  newCustomer = {
    ...newCustomer,
    id: newId,
  };
  const { data, error } = await supabase.from("customer").insert([newCustomer]);

  if (error) {
    console.error(error);
    throw new Error("User could not be created");
  }

  return data;
}

export async function getCustomer(email) {
  const { data, error } = await supabase
    .from("customer")
    .select("*")
    .eq("email", email)
    .single();

  if (error && error.code !== "PGRST116") throw error;
  return data;
}

export async function uploadAvatar(file, userId) {
  try {
    const { data: userData, error } = await supabase
      .from("customer")
      .select("*")
      .eq("id", userId)
      .single();
    if (userData?.avatar) {
      await supabase.storage.from("customer-avatar").remove([userData.avatar]);
    }
    if (!file) return null;
    const fileExt = file.name.split(".").pop();
    const fileName = `${userId}.${fileExt}`;
    const filePath = `${fileName}`;
    const { error: uploadError } = await supabase.storage
      .from("customer-avatar")
      .upload(filePath, file, { upsert: true });

    if (uploadError) throw uploadError;

    const { data } = supabase.storage
      .from("customer-avatar")
      .getPublicUrl(filePath);

    const avatarUrl = data.publicUrl;

    const { error: updateError } = await supabase
      .from("customer")
      .update({ avatar: avatarUrl })
      .eq("id", userId);
    if (updateError) throw updateError;

    return avatarUrl;
  } catch (error) {
    console.error("Error uploading avatar:", error.message);
    throw error;
  }
}

export async function getBookingByUser(userId) {
  const { data, error } = await supabase
    .from("rentals")
    .select("*")
    .eq("customerId", userId);
  if (error) throw error;
  return data;
}
