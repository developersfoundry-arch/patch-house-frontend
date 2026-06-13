export interface User {
  id: string;
  phone: string;
  name: string;
  email: string;
  address: string;
  city: string;
  concern: string;
  created_at: string;
  updated_at: string;
}

export interface Expert {
  id: string;
  name: string;
  phone: string;
  specialization: string;
}

export type AppointmentStatus = "pending" | "confirmed" | "rescheduled" | "completed" | "cancelled";
export type TimeSlot = "morning" | "afternoon" | "evening";

export interface Appointment {
  id: string;
  booking_ref: string;
  user_id: string;
  expert_id: string | null;
  expert: Expert | null;
  service_type: string;
  status: AppointmentStatus;
  preferred_date: string;
  time_slot: TimeSlot;
  address: string;
  city: string;
  notes: string;
  created_at: string;
  updated_at: string;
}

export interface Patch {
  id: string;
  patch_ref: string;
  user_id: string;
  appointment_id: string | null;
  expert_id: string | null;
  expert: Expert | null;
  patch_type: string;
  base_material: string;
  color: string;
  density: string;
  hair_length: string;
  fitted_date: string | null;
  next_maintenance_date: string | null;
  status: "active" | "replaced" | "inactive";
  notes: string;
  created_at: string;
  updated_at: string;
}
