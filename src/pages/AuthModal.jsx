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

  useEffect(() => {
    setIsLogin(defaultMode === "login");
  }, [defaultMode]);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(isLogin ? loginSchema : signupSchema),
  });

  const onSubmit = (data) => {
    console.log("Submitted:", data);

    setTimeout(() => {
      reset();
      onClose();
      navigate("/dashboard");
    }, 500);
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

            <form onSubmit={handleSubmit(onSubmit)}>
              {!isLogin && (
                <div className="mb-3">
                  <input
                    type="text"
                    {...register("name")}
                    placeholder="Full Name"
                    className="w-full px-3 py-2 border rounded"
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
                />
                {errors.password && (
                  <p className="text-red-500 text-sm">{errors.password.message}</p>
                )}
              </div>

              <button
                type="submit"
                className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700"
              >
                {isLogin ? "Login" : "Sign Up"}
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

const navigate = useNavigate();

