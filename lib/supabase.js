import { createClient } from "@supabase/supabase-js";

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

export const isSupabaseConfigured = Boolean(supabaseUrl && supabaseAnonKey);

export const supabase = isSupabaseConfigured
  ? createClient(supabaseUrl, supabaseAnonKey)
  : null;

/**
 * Fetch sales transactions from Supabase (falls back to local data if unconfigured)
 */
export async function getSalesTransactions() {
  if (!supabase) return null;
  const { data, error } = await supabase
    .from("sales")
    .select("*, customers(*), products(*)")
    .order("order_date", { ascending: false });

  if (error) {
    console.error("Supabase sales query error:", error);
    return null;
  }
  return data;
}

/**
 * Fetch monthly analytics view from Supabase
 */
export async function getMonthlyAnalysis() {
  if (!supabase) return null;
  const { data, error } = await supabase
    .from("vw_monthly_analysis")
    .select("*");

  if (error) {
    console.error("Supabase monthly view error:", error);
    return null;
  }
  return data;
}

/**
 * Fetch inventory risk view from Supabase
 */
export async function getInventoryAnalysis() {
  if (!supabase) return null;
  const { data, error } = await supabase
    .from("vw_inventory_analysis")
    .select("*");

  if (error) {
    console.error("Supabase inventory view error:", error);
    return null;
  }
  return data;
}
