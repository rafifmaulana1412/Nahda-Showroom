"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { signIn } from "next-auth/react";
import { motion, AnimatePresence } from "framer-motion";

export default function AuthPage() {
  const router = useRouter();

  const [isLogin, setIsLogin] = useState(true);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const resetForm = () => {
    setEmail("");
    setPassword("");
  };

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    setLoading(true);

    if (isLogin) {
      const res = await signIn("credentials", {
        email,
        password,
        redirect: false,
      });

      if (res?.ok) {
        resetForm();
        router.push("/admin");
      } else {
        alert("Email atau password salah");
      }
    } else {
      const res = await fetch("/api/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }),
      });

      const data = await res.json();

      if (!res.ok) {
        alert(data.error || "Register gagal");
        setLoading(false);
        return;
      }

      alert("Admin berhasil dibuat!");

      resetForm(); // ✅ ini penting
      setIsLogin(true);
    }

    setLoading(false);
  };

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center px-4">
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
        className="w-full max-w-5xl grid md:grid-cols-2 bg-white shadow-2xl rounded-3xl overflow-hidden"
      >
        {/* LEFT */}
        <div className="hidden md:flex flex-col justify-center bg-gradient-to-br from-primary to-primary-dark text-white p-10">
          <h1 className="text-4xl font-bold mb-4">Nahda Showroom</h1>
          <p className="text-sm opacity-90">
            Platform jual beli mobil terpercaya dengan harga terbaik dan
            kualitas terjamin.
          </p>

          <div className="mt-8 space-y-2 text-sm">
            <p>✔ Mobil berkualitas</p>
            <p>✔ Harga terbaik</p>
            <p>✔ Proses cepat</p>
          </div>
        </div>

        {/* RIGHT */}
        <div className="p-8 md:p-12 flex flex-col justify-center">
          {/* TOGGLE */}
          <div className="flex mb-6 bg-gray-100 rounded-xl p-1">
            <button
              type="button"
              onClick={() => {
                setIsLogin(true);
                resetForm();
              }}
              className={`flex-1 py-2 rounded-lg text-sm font-semibold transition ${
                isLogin
                  ? "bg-primary text-white"
                  : "text-gray-600 hover:text-primary"
              }`}
            >
              Login
            </button>

            <button
              type="button"
              onClick={() => {
                setIsLogin(false);
                resetForm();
              }}
              className={`flex-1 py-2 rounded-lg text-sm font-semibold transition ${
                !isLogin
                  ? "bg-primary text-white"
                  : "text-gray-600 hover:text-primary"
              }`}
            >
              Register
            </button>
          </div>

          {/* TITLE */}
          <AnimatePresence mode="wait">
            <motion.div
              key={isLogin ? "login" : "register"}
              initial={{ opacity: 0, x: isLogin ? -20 : 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: isLogin ? 20 : -20 }}
              transition={{ duration: 0.25 }}
            >
              <h2 className="text-2xl font-bold text-gray-800 mb-2">
                {isLogin ? "Masuk ke Admin" : "Buat Admin"}
              </h2>
              <p className="text-sm text-gray-500 mb-6">
                {isLogin
                  ? "Silakan login untuk mengelola showroom"
                  : "Daftarkan akun admin"}
              </p>
            </motion.div>
          </AnimatePresence>

          {/* FORM */}
          <form onSubmit={handleSubmit} className="space-y-4">
            <input
              type="email"
              value={email}
              placeholder="Email"
              className="w-full px-4 py-3 border rounded-xl focus:ring-2 focus:ring-primary outline-none transition"
              onChange={(e) => setEmail(e.target.value)}
            />

            <input
              type="password"
              value={password}
              placeholder="Password"
              className="w-full px-4 py-3 border rounded-xl focus:ring-2 focus:ring-primary outline-none transition"
              onChange={(e) => setPassword(e.target.value)}
            />

            <motion.button
              whileTap={{ scale: 0.97 }}
              whileHover={{ scale: 1.02 }}
              disabled={loading}
              className={`w-full py-3 rounded-xl text-white font-semibold transition ${
                isLogin
                  ? "bg-primary hover:bg-primary-dark"
                  : "bg-green-500 hover:bg-green-600"
              } ${loading && "opacity-70 cursor-not-allowed"}`}
            >
              {loading ? "Loading..." : isLogin ? "Login" : "Register"}
            </motion.button>
          </form>

          {/* FOOTER */}
          <p className="text-xs text-gray-400 mt-6 text-center">
            © 2026 Nahda Showroom
          </p>
        </div>
      </motion.div>
    </div>
  );
}
