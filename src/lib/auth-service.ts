import { supabase } from "@/lib/supabase/client";
import { generateReferralCode } from "@/lib/utils";

interface LoginCredentials {
  username: string;
  phone: string;
  password: string;
}

interface RegisterCredentials {
  full_name: string;
  username: string;
  email: string;
  phone: string;
  password: string;
  referral_code?: string;
}

interface AuthResponse {
  success: boolean;
  error?: string;
  user?: {
    id: string;
    username: string;
    phone: string;
    email: string;
    role?: string;
  };
}

function setAuthTokenCookie(userId: string) {
  if (typeof window === "undefined") return;
  document.cookie = `auth_token=${userId}; path=/; max-age=${60 * 60 * 24 * 7};`;
}

export async function loginWithCredentials(
  credentials: LoginCredentials
): Promise<AuthResponse> {
  try {
    const { username, phone, password } = credentials;
    const identifier = username.trim().toLowerCase() || phone.trim();

    if (!identifier || !password.trim()) {
      return { success: false, error: "Please enter your username or phone and password." };
    }

    const query = username.trim()
      ? `username.eq.${username.trim().toLowerCase()}`
      : `phone.eq.${phone.trim()}`;

    const { data: profile, error: fetchError } = await supabase
      .from("profiles")
      .select("user_id, username, phone, email, role, account_status")
      .or(query)
      .single();

    if (fetchError || !profile) {
      return { success: false, error: "Invalid credentials." };
    }

    const { data: authResult, error: authError } = await supabase.auth.signInWithPassword({
      email: profile.email,
      password,
    });

    if (authError || !authResult.session) {
      return { success: false, error: "Invalid credentials." };
    }

    setAuthTokenCookie(profile.user_id);

    return {
      success: true,
      user: {
        id: profile.user_id,
        username: profile.username,
        phone: profile.phone,
        email: profile.email,
        role: profile.role,
      },
    };
  } catch (error) {
    console.error("Login error:", error);
    return { success: false, error: "Unable to login at this time." };
  }
}

export async function registerUser(
  credentials: RegisterCredentials
): Promise<AuthResponse> {
  try {
    const normalizedUsername = credentials.username.trim().toLowerCase();
    const normalizedEmail = credentials.email.trim().toLowerCase();
    const normalizedPhone = credentials.phone.trim();

    const referralCode = (credentials.referral_code?.trim() || generateReferralCode()).toUpperCase();

    const { data: signUpData, error: signUpError } = await supabase.auth.signUp({
      email: normalizedEmail,
      password: credentials.password,
      options: {
        data: {
          username: normalizedUsername,
          phone: normalizedPhone,
          full_name: credentials.full_name,
          referral_code: referralCode,
          account_status: "inactive",
          account_approved: false,
          payment_verified: false,
        },
      },
    });

    if (signUpError || !signUpData?.user) {
      return { success: false, error: signUpError?.message || "Unable to create account." };
    }

    const userId = signUpData.user.id;

    const { error: profileError } = await supabase.from("profiles").insert({
      user_id: userId,
      full_name: credentials.full_name,
      email: normalizedEmail,
      username: normalizedUsername,
      phone: normalizedPhone,
      account_status: "inactive",
      account_approved: false,
      payment_verified: false,
      package_id: null,
      package_name: null,
      completed_tasks: 0,
      withdrawal_balance: 0,
      premium_referrals_used: 0,
      referral_code: referralCode,
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString(),
    });

    if (profileError) {
      return { success: false, error: profileError.message || "Failed to save profile." };
    }

    setAuthTokenCookie(userId);

    return {
      success: true,
      user: {
        id: userId,
        username: normalizedUsername,
        phone: normalizedPhone,
        email: normalizedEmail,
      },
    };
  } catch (error) {
    console.error("Register error:", error);
    return { success: false, error: "Unable to register at this time." };
  }
}

export async function logout(): Promise<void> {
  if (typeof window !== "undefined") {
    await supabase.auth.signOut();
    document.cookie = "auth_token=; path=/; max-age=0";
  }
}

export async function getSession() {
  if (typeof window !== "undefined") {
    const {
      data: { user },
    } = await supabase.auth.getUser();
    return user;
  }
  return null;
}
