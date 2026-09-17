import { createClient } from "@supabase/supabase-js";

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

export const supabase = createClient(supabaseUrl, supabaseAnonKey);

// 아이디 로그인을 이메일 기반 Supabase Auth 위에 얹기 위한 변환 함수
const AUTH_DOMAIN = process.env.NEXT_PUBLIC_AUTH_EMAIL_DOMAIN || "campus.local";

export function usernameToEmail(username) {
  return `${username}@${AUTH_DOMAIN}`;
}
