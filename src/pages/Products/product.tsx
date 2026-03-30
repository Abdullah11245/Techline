import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

interface Product {
  _id: string;
  title: string;
  description: string;
  image: string;
  category: { name: string };
}
import { motion } from 'framer-motion';
import { Section } from '@components/Section';
import { Typewriter } from '@/components/TypeWriter';

const Product = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const { name } = useParams();
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const res = await fetch("https://techline-backend-1.onrender.com/api/products");
        if (!res.ok) throw new Error("Failed to fetch products");
        const data = await res.json();
        const filtered = data.filter((p: Product) =>
          // console.log(p.category.name, name?.toLowerCase()) 
        p.category?.name.toLowerCase() === name?.toLowerCase()
          );
          console.log(filtered);
        setProducts(filtered);
      } catch (err: any) {
        setError(err.message || "Unknown error");
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, [products, name]);

  const truncateDescription = (desc: string, wordLimit = 15) => {
    const words = desc.split(" ");
    return words.length > wordLimit
      ? words.slice(0, wordLimit).join(" ") + "…"
      : desc;
  };

  if (loading) return <p className="text-center py-10">Loading products...</p>;
  if (error) return <p className="text-center py-10 text-red-600">{error}</p>;

  return (
    
    <section className="relative">
        <Section className="relative overflow-hidden pt-20 md:pt-32 pb-20" noAnimation>

  {/* ===== Mobile Background Image ===== */}
  <div className="absolute inset-0 lg:hidden">
    <img
      src="/ai-nuclear.jpg"
      alt="Tech background"
      className="w-full h-full object-cover"
    />
  </div>

  {/* ===== Dark Overlay ===== */}
  <div className="absolute inset-0 bg-black/70"></div>

  <div className="relative z-10 max-w-7xl mx-auto px-4 grid lg:grid-cols-2 gap-16 items-center">

    {/* ===== Images (Desktop Only) ===== */}
    <div className="hidden lg:grid sm:grid-cols-2 gap-6">
      
      <div className="pt-20 flex justify-end sm:justify-center">
        <img
          src="/firewall.jpg"
          alt="Tech team"
          className="rounded-xl object-cover shadow-2xl"
        />
      </div>

      <img
        src="/product_service.jpg"
        alt="Tech work"
        className="rounded-xl object-cover shadow-2xl"
      />

    </div>

    {/* ===== Content ===== */}
    <motion.div
      className="flex flex-col gap-2 md:gap-8"
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.7 }}
    >

      <motion.h1
        className="mt-2 md:mt-8 max-w-4xl text-5xl font-bold leading-tight text-white md:text-6xl lg:text-7xl"
        initial={{ opacity: 0, y: 18 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.05 }}
      >
        <Typewriter
          text="About Our Products"
          speed={100}
          className="text-3xl md:text-5xl font-bold text-white"
        />
      </motion.h1>

    <p className="text-white/70 text-lg max-w-xl">
  At Tech Line, we supply trusted IT products from leading global brands.
  We carefully select reliable hardware and software solutions to meet modern business needs,
  ensuring quality, performance, and long-term value for your organization.
</p>

      {/* Stats */}
      {/* <div className="backdrop-blur-xl bg-white/10 border border-white/20 rounded-2xl p-8 flex gap-10 w-fit shadow-[0_20px_60px_rgba(0,0,0,0.4)]">

        <div>
          <h3 className="text-4xl font-bold text-white">15+</h3>
          <p className="text-white/70 text-sm">Years Experience</p>
        </div>

        <div>
          <h3 className="text-4xl font-bold text-white">100+</h3>
          <p className="text-white/70 text-sm">Happy Clients</p>
        </div>

        <div>
          <h3 className="text-4xl font-bold text-white">80+</h3>
          <p className="text-white/70 text-sm">Projects Completed</p>
        </div>

      </div> */}

    </motion.div>

  </div>
</Section>
      <div className="relative mx-auto max-w-6xl py-10 px-4 my-12">
     
        <div className="grid w-full gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {products.map((product) => (
            <article
              key={product._id}
              className="bg-white rounded-lg shadow hover:shadow-lg transition duration-300 aspect-square flex flex-col overflow-hidden"
            >
             <a
        href={`/contact?product=${encodeURIComponent(product.title)}`}
        className="flex flex-col h-full"
    >
      {/* Im
                {/* Image */}
                <div className="h-2/3 w-full overflow-hidden">
                  <img
                    src={product.image}
                    alt={product.title}
                    className="w-full h-full object-cover"
                  />
                </div>
                {/* Content */}
                <div className="p-4 flex flex-col justify-between h-1/4">
                
                  <p className=" font-semibold text-lg">{product.title}</p>
                   <p className=" font-semibold text-xs">{product?.category?.name}</p>
                  <p className=" text-gray-600 text-base mt-2">
                    {truncateDescription(product.description)}
                  </p>
                </div>
              </a>
            </article>
          ))}
        </div>
      </div>

      {/* Background SVG */}
      <svg
        className="-z-10 absolute -top-10 opacity-10"
        width="100%"
        height="100%"
        xmlns="http://www.w3.org/2000/svg"
      >
        <defs>
          <pattern
            id="a"
            patternUnits="userSpaceOnUse"
            width="20"
            height="20"
            patternTransform="scale(2) rotate(0)"
          >
            <rect x="0" y="0" width="100%" height="100%" fill="hsla(0,0%,100%,1)" />
            <path
              d="M3.25 10h13.5M10 3.25v13.5"
              strokeLinecap="square"
              strokeWidth="0.5"
              stroke="hsla(258.5,59.4%,59.4%,1)"
              fill="none"
            />
          </pattern>
        </defs>
        <rect width="800%" height="800%" transform="translate(0,0)" fill="url(#a)" />
      </svg>
    </section>
  );
};

export default Product;