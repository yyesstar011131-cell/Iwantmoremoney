"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { supabase, usernameToEmail } from "@/lib/supabaseClient";

export default function SignupPage() {
  const router = useRouter();
  const [username, setUsername] = useState("");
  const [name, setName] = useState("");
  const [grade, setGrade] = useState(1);
  const [password, setPassword] = useState("");
  const [passwordCheck, setPasswordCheck] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  async function handleSignup(e) {
    e.preventDefault();
    setError("");

    if (username.length < 3) {
      setError("아이디는 3자 이상이어야 해요.");
      return;
    }
    if (password.length < 6) {
      setError("비밀번호는 6자 이상이어야 해요.");
      return;
    }
    if (password !== passwordCheck) {
      setError("비밀번호가 서로 일치하지 않아요.");
      return;
    }

    setLoading(true);

    const { data: signUpData, error: signUpError } = await supabase.auth.signUp({
      email: usernameToEmail(username),
      password,
    });

    if (signUpError || !signUpData.user) {
      setLoading(false);
      setError("이미 사용 중인 아이디이거나 오류가 발생했습니다.");
      return;
    }

    const { error: profileError } = await supabase.from("profiles").insert({
      id: signUpData.user.id,
      username,
      name,
      grade,
    });

    setLoading(false);

    if (profileError) {
      setError("프로필 생성 중 오류가 발생했습니다.");
      return;
    }

    router.replace("/main");
  }

  return (
    <div className="flex min-h-screen flex-col justify-center px-8 py-12">
      <div className="mb-10">
        <p className="text-sm text-muted">우리 학교 학생들의</p>
        <h1 className="mt-1 text-[28px] font-bold leading-tight text-ink">
          회원가입
        </h1>
      </div>

      <form onSubmit={handleSignup} className="flex flex-col gap-3">
        <input
          type="text"
          placeholder="아이디 (3자 이상)"
          required
          value={username}
          onChange={(e) => setUsername(e.target.value.trim())}
          className="hairline rounded-card bg-white px-4 py-3 text-[15px] outline-none focus:border-primary"
        />
        <input
          type="text"
          placeholder="이름"
          required
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="hairline rounded-card bg-white px-4 py-3 text-[15px] outline-none focus:border-primary"
        />

        <div>
          <label className="mb-1 block text-xs text-muted">학년</label>
          <div className="flex gap-2">
            {[1, 2, 3].map((g) => (
              <button
                type="button"
                key={g}
                onClick={() => setGrade(g)}
                className={`flex-1 rounded-card py-2.5 text-sm font-medium hairline ${
                  grade === g ? "border-primary bg-primary text-white" : "bg-white text-ink"
                }`}
              >
                {g}학년
              </button>
            ))}
          </div>
        </div>

        <input
          type="password"
          placeholder="비밀번호 (6자 이상)"
          required
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="hairline rounded-card bg-white px-4 py-3 text-[15px] outline-none focus:border-primary"
        />
        <input
          type="password"
          placeholder="비밀번호 확인"
          required
          value={passwordCheck}
          onChange={(e) => setPasswordCheck(e.target.value)}
          className="hairline rounded-card bg-white px-4 py-3 text-[15px] outline-none focus:border-primary"
        />

        {error && <p className="text-sm text-accent">{error}</p>}

        <button
          type="submit"
          disabled={loading}
          className="mt-2 rounded-card bg-primary py-3 text-[15px] font-medium text-white active:bg-primary-dark disabled:opacity-60"
        >
          {loading ? "가입 중..." : "가입 완료"}
        </button>
      </form>

      <p className="mt-6 text-center text-sm text-muted">
        이미 계정이 있으신가요?{" "}
        <Link href="/login" className="font-medium text-primary">
          로그인
        </Link>
      </p>
    </div>
  );
}
