"use server";
import { parseISO } from "date-fns";
import { auth, signIn, signOut } from "./auth";
import { supabase } from "./supabase";
import { id } from "date-fns/locale";

export async function createBooking(formData) {
  const {
    carId,
    customerId,
    startDate,
    endDate,
    totalPrice,
    name,
    email,
    phone,
    paymentMethod,
    description,
    pickupLocation,
    dropoffLocation,
    driversLicense,
    isPayed,
  } = formData;

  if (!carId || !customerId) throw new Error("Missing car or customer ID.");
  if (!startDate || !endDate)
    throw new Error("Start and end dates are required.");
  if (!totalPrice || totalPrice <= 0) throw new Error("Invalid total price.");
  if (!name || !email) throw new Error("Customer details are incomplete.");
  if (!pickupLocation || !dropoffLocation)
    throw new Error("Pickup and dropoff locations are required.");

  const start = new Date(startDate);
  const end = new Date(endDate);

  if (start > end) {
    throw new Error("Invalid date range: Start date is after end date.");
  }
  const { data: bookings, error: bookingError } = await supabase
    .from("rentals")
    .select("startDate, endDate")
    .eq("carId", carId)
    .eq("status", "active");
  if (bookingError) {
    console.error(bookingError);
    throw new Error("Could not check existing bookings");
  }
  const isOverlapping = bookings.some((booking) => {
    const bookedStart = parseISO(booking.startDate);
    const bookedEnd = parseISO(booking.endDate);
    return start <= bookedEnd && end >= bookedStart;
  });
  if (isOverlapping) {
    throw new Error("Selected dates are already booked for this car");
  }
  const { data: last } = await supabase
    .from("rentals")
    .select("id")
    .order("id", { ascending: false })
    .limit(1);
  const newId = last?.[0]?.id ? last[0].id + 1 : 1;
  try {
    const { data, error } = await supabase.from("rentals").insert([
      {
        id: newId,
        carId,
        customerId,
        startDate,
        endDate,
        totalPrice,
        phone,
        paymentMethod,
        description,
        pickupLocation,
        dropoffLocation,
        driversLicense,
        isPayed,
        status: "active",
        created_at: new Date().toISOString(),
      },
    ]);

    const { data: payData, error: paymentErr } = await supabase
      .from("payments")
      .insert([
        {
          id: newId,
          amount: totalPrice,
          method: paymentMethod,
          status: paymentMethod !== "cash" ? "Paid" : "Pending",
          rental_id: newId,
        },
      ]);
    if (paymentErr) {
      console.error("payment  error:", paymentErr);
      throw new Error("Payment failed.");
    }

    if (error) {
      console.error("Booking error:", error);
      throw new Error("Booking failed.");
    }
    return newId;
  } catch (err) {
    console.log(err);
    throw new Error(err.message || "Something went wrong.");
  }
}

export async function signInAction() {
  await signIn("google", {
    redirectTo: "/cars",
  });
}

export async function signOutAction() {
  await signOut();
}
export async function updateRental(rentalId, updates) {
  try {
    const session = await auth();

    if (!session?.user) {
      throw new Error("Unauthorized: Please log in first.");
    }

    const { data: rental, error: rentalError } = await supabase
      .from("rentals")
      .select("customerId")
      .eq("id", rentalId)
      .single();

    if (rentalError) throw rentalError;

    if (rental.customerId !== session.user.customerId) {
      throw new Error("Unauthorized: You cannot update this rental.");
    }

    const { data, error } = await supabase
      .from("rentals")
      .update(updates)
      .eq("id", rentalId)
      .select()
      .single();

    if (error) throw error;

    return { success: true, rental: data };
  } catch (err) {
    console.error("Update rental error:", err.message);
    return { success: false, error: err.message };
  }
}
export async function deleteBooking(id) {
  const session = await auth();

  const { data: rental, error: rentalError } = await supabase
    .from("rentals")
    .select("customerId")
    .eq("id", id)
    .single();

  if (rentalError) {
    console.error("Error finding booking:", rentalError.message);
    throw rentalError;
  }

  if (session?.user.customerId !== rental.customerId) {
    return { error: "You are not authorized to delete this booking." };
  }
  const { error: paymentError } = await supabase
    .from("payments")
    .delete()
    .eq("rental_id", id);
  if (paymentError) throw paymentError;

  const { data, error } = await supabase.from("rentals").delete().eq("id", id);
  if (error) {
    console.error("Error finding Booking :", error);
    throw new Error(error);
  }
  return data;
}
