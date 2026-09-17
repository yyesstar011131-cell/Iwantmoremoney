"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { supabase } from "@/lib/supabaseClient";

export default function RootPage() {
  const router = useRouter();
  const [checking, setChecking] = useState(true);

  useEffect(() => {
    supabase.auth.getSession().then(({ data }) => {
      if (data.session) {
        router.replace("/main");
      } else {
        router.replace("/login");
      }
      setChecking(false);
    });
  }, [router]);

  return (
    <div className="flex h-screen items-center justify-center">
      <p className="text-sm text-muted">
        {checking ? "불러오는 중..." : ""}
      </p>
    </div>
  );
}
