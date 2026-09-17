"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { supabase, usernameToEmail } from "@/lib/supabaseClient";

export default function LoginPage() {
  const router = useRouter();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  async function handleLogin(e) {
    e.preventDefault();
    setError("");
    setLoading(true);

    const { error: signInError } = await supabase.auth.signInWithPassword({
      email: usernameToEmail(username),
      password,
    });

    setLoading(false);

    if (signInError) {
      setError("아이디 또는 비밀번호가 올바르지 않습니다.");
      return;
    }
    router.replace("/main");
  }

  return (
    <div className="flex min-h-screen flex-col justify-center px-8 py-12">
      <div className="mb-10">
        <p className="text-sm text-muted">우리 학교 학생들의</p>
        <h1 className="mt-1 text-[28px] font-bold leading-tight text-ink">
          캠퍼스 마켓
        </h1>
      </div>

      <form onSubmit={handleLogin} className="flex flex-col gap-3">
        <input
          type="text"
          placeholder="아이디"
          required
          value={username}
          onChange={(e) => setUsername(e.target.value.trim())}
          className="hairline rounded-card bg-white px-4 py-3 text-[15px] outline-none focus:border-primary"
        />
        <input
          type="password"
          placeholder="비밀번호"
          required
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="hairline rounded-card bg-white px-4 py-3 text-[15px] outline-none focus:border-primary"
        />

        {error && <p className="text-sm text-accent">{error}</p>}

        <button
          type="submit"
          disabled={loading}
          className="mt-2 rounded-card bg-primary py-3 text-[15px] font-medium text-white active:bg-primary-dark disabled:opacity-60"
        >
          {loading ? "로그인 중..." : "로그인"}
        </button>
      </form>

      <p className="mt-6 text-center text-sm text-muted">
        아직 계정이 없으신가요?{" "}
        <Link href="/signup" className="font-medium text-primary">
          회원가입
        </Link>
      </p>
    </div>
  );
}
