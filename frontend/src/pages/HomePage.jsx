import { useProducts } from "../hooks/useProducts";
import { PackageIcon, SparklesIcon } from "lucide-react";
import { Link } from "react-router";
import LoadingSpinner from "../components/LoadingSpinner";
import ProductCard from "../components/ProductCard";
import { SignInButton } from "@clerk/clerk-react";
import { motion } from "framer-motion";
import img from "../assets/img.svg";

function HomePage() {
  const { data: products = [], isLoading, error } = useProducts();

  if (isLoading) return <LoadingSpinner />;

  if (error) {
    return (
      <div role="alert" className="alert alert-error">
        <span>Something went wrong. Please refresh the page.</span>
      </div>
    );
  }

  return (
    <div className="space-y-16 overflow-hidden">
      <div className="space-y-2 overflow-hidden py-4">
        {[0, 1].map((i) => (
          <motion.div
            key={i}
            className="flex gap-16 whitespace-nowrap font-semibold text-primary text-lg"
            animate={{ x: i === 0 ? ["0%", "-100%"] : ["-100%", "0%"] }}
            transition={{
              repeat: Infinity,
              duration: 25,
              ease: "linear",
            }}
          >
            <span>🚀 Build</span>
            <span>✨ Create</span>
            <span>💎 Monetize</span>
            <span>🔥 Scale</span>
            <span>🚀 Build</span>
            <span>✨ Create</span>
            <span>💎 Monetize</span>
          </motion.div>
        ))}
      </div>

      {/* HERO */}
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="hero bg-gradient-to-br from-base-300 via-base-200 to-base-300 rounded-box overflow-hidden"
      >
        <div className="hero-content flex-col lg:flex-row-reverse gap-16 py-14">
          {/* Floating Image */}
          <motion.div
            animate={{ y: [0, -15, 0] }}
            transition={{
              repeat: Infinity,
              duration: 4,
              ease: "easeInOut",
            }}
            className="relative"
          >
            <div className="absolute inset-0 bg-primary/20 blur-3xl rounded-full scale-110" />
            <img
              src={img}
              alt="Creator"
              className="relative h-64 lg:h-80 rounded-2xl shadow-2xl"
            />
          </motion.div>

          <div className="text-center lg:text-left space-y-4">
            <motion.h1
              initial={{ opacity: 0, x: -30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.3 }}
              className="text-4xl lg:text-6xl font-extrabold leading-tight"
            >
              Share Your{" "}
              <span className="text-primary relative">
                Products
                <motion.span
                  layoutId="underline"
                  className="absolute left-0 -bottom-1 h-1 w-full bg-primary"
                />
              </span>
            </motion.h1>

            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.5 }}
              className="text-base-content/60"
            >
              Upload, discover, and connect with creators in a modern
              marketplace.
            </motion.p>

            <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
              <SignInButton mode="modal">
                <button className="btn btn-primary shadow-lg">
                  <SparklesIcon className="size-4" />
                  Start Selling
                </button>
              </SignInButton>
            </motion.div>
          </div>
        </div>
      </motion.div>

      {/* PRODUCTS */}
      <div>
        <h2 className="text-xl font-bold flex items-center gap-2 mb-6">
          <PackageIcon className="size-5 text-primary" />
          All Products
        </h2>

        {products.length === 0 ? (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="card bg-base-300"
          >
            <div className="card-body items-center text-center py-16">
              <PackageIcon className="size-16 text-base-content/20" />
              <h3 className="card-title text-base-content/50">
                No products yet
              </h3>
              <p className="text-base-content/40 text-sm">
                Be the first to share something!
              </p>
              <Link to="/create" className="btn btn-primary btn-sm mt-2">
                Create Product
              </Link>
            </div>
          </motion.div>
        ) : (
          <motion.div
            initial="hidden"
            animate="visible"
            variants={{
              hidden: {},
              visible: {
                transition: {
                  staggerChildren: 0.15,
                },
              },
            }}
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6"
          >
            {products.map((product) => (
              <motion.div
                key={product.id}
                variants={{
                  hidden: { opacity: 0, y: 40 },
                  visible: { opacity: 1, y: 0 },
                }}
                whileHover={{ y: -5 }}
                transition={{ duration: 0.4 }}
              >
                <ProductCard product={product} />
              </motion.div>
            ))}
          </motion.div>
        )}
      </div>
    </div>
  );
}

export default HomePage;
