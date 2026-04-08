"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function RegisterPage() {
  const router = useRouter();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleRegister = async (e: any) => {
    e.preventDefault();

    const res = await fetch("/api/register", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email, password }),
    });

    const data = await res.json();
    console.log("REGISTER:", data);

    if (!res.ok) {
      alert(data.error);
      return;
    }

    alert("Admin berhasil dibuat!");
    router.push("/login");
  };

  return (
    <form onSubmit={handleRegister}>
      <input onChange={(e) => setEmail(e.target.value)} />
      <input onChange={(e) => setPassword(e.target.value)} />
      <button type="submit">Register</button>
    </form>
  );
}
