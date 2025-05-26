import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { motion, AnimatePresence } from "framer-motion";

const loginSchema = z.object({
  email: z.string().email("Invalid email"),
  password: z.string().min(6, "Password must be at least 6 characters"),
});

const signupSchema = loginSchema.extend({
  name: z.string().min(1, "Name is required"),
});

export default function AuthModal({ isOpen, onClose, defaultMode = "login" }) {
  const [isLogin, setIsLogin] = useState(defaultMode === "login");
  const navigate = useNavigate();
  const [serverError, setServerError] = useState("");

  useEffect(() => {
    setIsLogin(defaultMode === "login");
    setServerError("");
  }, [defaultMode, isOpen]);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm({
    resolver: zodResolver(isLogin ? loginSchema : signupSchema),
  });

  const onSubmit = async (data) => {
    setServerError("");
    try {
      const url = isLogin
        ? "http://localhost:5000/api/auth/login"
        : "http://localhost:5000/api/auth/signup";

      const response = await fetch(url, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });

      const result = await response.json();

      if (!response.ok) {
        setServerError(result.message || "Something went wrong");
        return;
      }

      // On success: you get token and user info here
      console.log(isLogin ? "Login success:" : "Signup success:", result);

      reset();
      onClose();
      navigate("/dashboard");
    } catch (error) {
      setServerError("Network error, please try again.");
      console.error("API error:", error);
    }
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        >
          <motion.div
            className="bg-white rounded-lg shadow-lg p-6 w-full max-w-md relative"
            initial={{ y: -50, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: -50, opacity: 0 }}
          >
            <h2 className="text-xl font-bold mb-4 text-center">
              {isLogin ? "Login" : "Sign Up"}
            </h2>

            {serverError && (
              <p className="text-red-600 text-center mb-4">{serverError}</p>
            )}

            <form onSubmit={handleSubmit(onSubmit)}>
              {!isLogin && (
                <div className="mb-3">
                  <input
                    type="text"
                    {...register("name")}
                    placeholder="Full Name"
                    className="w-full px-3 py-2 border rounded"
                    disabled={isSubmitting}
                  />
                  {errors.name && (
                    <p className="text-red-500 text-sm">{errors.name.message}</p>
                  )}
                </div>
              )}

              <div className="mb-3">
                <input
                  type="email"
                  {...register("email")}
                  placeholder="Email"
                  className="w-full px-3 py-2 border rounded"
                  disabled={isSubmitting}
                />
                {errors.email && (
                  <p className="text-red-500 text-sm">{errors.email.message}</p>
                )}
              </div>

              <div className="mb-3">
                <input
                  type="password"
                  {...register("password")}
                  placeholder="Password"
                  className="w-full px-3 py-2 border rounded"
                  disabled={isSubmitting}
                />
                {errors.password && (
                  <p className="text-red-500 text-sm">{errors.password.message}</p>
                )}
              </div>

              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700 disabled:opacity-50"
              >
                {isSubmitting
                  ? isLogin
                    ? "Logging in..."
                    : "Signing up..."
                  : isLogin
                  ? "Login"
                  : "Sign Up"}
              </button>
            </form>

            <p className="text-center mt-4 text-sm">
              {isLogin ? (
                <>
                  Don't have an account?{" "}
                  <button
                    onClick={() => {
                      setIsLogin(false);
                      reset();
                      setServerError("");
                    }}
                    className="text-blue-600 hover:underline"
                  >
                    Sign Up
                  </button>
                </>
              ) : (
                <>
                  Already have an account?{" "}
                  <button
                    onClick={() => {
                      setIsLogin(true);
                      reset();
                      setServerError("");
                    }}
                    className="text-blue-600 hover:underline"
                  >
                    Login
                  </button>
                </>
              )}
            </p>

            <button
              onClick={() => {
                onClose();
                reset();
                setServerError("");
              }}
              className="absolute top-4 right-4 text-gray-600 hover:text-gray-800 text-lg"
            >
              ✕
            </button>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
