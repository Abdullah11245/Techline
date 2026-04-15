import { useEffect, useMemo, useState } from "react";
import { motion } from 'framer-motion';
import { useLocation, useParams } from "react-router-dom";
import { Section } from '@components/Section';
import { Typewriter } from '@/components/TypeWriter';
import Loader from "@/components/Loader/Loader";
import { buildUrl } from '@/utils/api';

interface Product {
  _id: string;
  title: string;
  description: string;
  image: string;
  category: { name: string };
  subcategory?: string;
  subSubcategory?: string;
}

const Product = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const { name } = useParams();
  const location = useLocation();

  const { selectedCategory, selectedSubcategory, selectedSubSubcategory } = useMemo(() => {
    const searchParams = new URLSearchParams(location.search);

    return {
      selectedCategory: name ? decodeURIComponent(name) : '',
      selectedSubcategory: searchParams.get('subcategory') || '',
      selectedSubSubcategory: searchParams.get('subSubcategory') || '',
    };
  }, [location.search, name]);

  useEffect(() => {
    const normalizeValue = (value?: string) => (value || '').trim().toLowerCase();

    const fetchProducts = async () => {
      setLoading(true);
      setError(null);

      try {
        const res = await fetch(buildUrl('/api/products'));
        if (!res.ok) throw new Error('Failed to fetch products');

        const data = await res.json();
        const filtered = data.filter((product: Product) => {
          const matchesCategory =
            !selectedCategory ||
            normalizeValue(product.category?.name) === normalizeValue(selectedCategory);
          const matchesSubcategory =
            !selectedSubcategory ||
            normalizeValue(product.subcategory) === normalizeValue(selectedSubcategory);
          const matchesSubSubcategory =
            !selectedSubSubcategory ||
            normalizeValue(product.subSubcategory) === normalizeValue(selectedSubSubcategory);

          return matchesCategory && matchesSubcategory && matchesSubSubcategory;
        });

        setProducts(filtered);
      } catch (err: any) {
        setError(err.message || 'Unknown error');
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, [selectedCategory, selectedSubcategory, selectedSubSubcategory]);

  const pageTitle = selectedSubSubcategory || selectedSubcategory || selectedCategory || 'About Our Products';

  const truncateDescription = (desc: string, wordLimit = 15) => {
    const words = desc.split(' ');

    if (words.length <= wordLimit) {
      return desc;
    }

    return `${words.slice(0, wordLimit).join(' ')}...`;
  };

  if (loading) return <Loader />;
  if (error) return <p className="text-center py-10 text-red-600 h-screen w-screen">{error}</p>;

  return (
    <section className="relative">
      <Section className="relative overflow-hidden pt-20 md:pt-32 pb-20" noAnimation>
        <div className="absolute inset-0 lg:hidden">
          <img
            src="/ai-nuclear.jpg"
            alt="Tech background"
            className="w-full h-full object-cover"
          />
        </div>

        <div className="absolute inset-0 bg-black/70"></div>

        <div className="relative z-10 max-w-7xl mx-auto px-4 grid lg:grid-cols-2 gap-16 items-center">
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
                text={pageTitle}
                speed={100}
                className="text-3xl md:text-5xl font-bold text-white"
              />
            </motion.h1>

            <p className="text-white/70 text-lg max-w-xl">
              At Tech Line, we supply trusted IT products from leading global brands.
              We carefully select reliable hardware and software solutions to meet modern business needs,
              ensuring quality, performance, and long-term value for your organization.
            </p>
          </motion.div>
        </div>
      </Section>

      <div className="relative mx-auto max-w-6xl py-10 px-4 my-12">
        {products.length > 0 ? (
          <div className="grid w-full gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {products.map((product) => (
             <article key={product._id} className="flex justify-center">
  <a
    href={`/contact?product=${encodeURIComponent(product.title)}`}
    // href={`/Products/productdetail/${product._id}`}
    className="w-[240px] bg-white p-2 rounded-md shadow hover:shadow-lg transition duration-300"
  >
    {/* Image */}
    <div className="w-full h-[200px] 0 rounded-t-md overflow-hidden">
      <img
        src={product.image}
        alt={product.title}
        className="w-full h-full object-cover hover:scale-95 transition-transform"
      />
    </div>

    {/* Category */}
     <p className="font-medium text-lg">{product.title}</p>
    <div className="uppercase text-xs font-semibold text-[rgb(62 175 71)]  pb-1 cursor-pointer">
      {product.category?.name}
    </div>

    {/* Heading */}
    <div className="flex items-center gap-x-2">
     
      <div className="font-semibold text-sm text-gray-600  cursor-pointer line-clamp-2">
       {product.subcategory && <div>{product.subcategory} </div>}
      </div>

      <div className="text-gray-500 font-normal text-[11px] pt-1">
       
        {product.subSubcategory && <div>{product.subSubcategory}</div>}
      </div>
    </div>
  </a>
</article>
            ))}
          </div>
        ) : (
          <div className="rounded-2xl border border-dashed border-gray-300 bg-gray-50 px-6 py-12 text-center text-gray-600">
            No products were found for this selection.
          </div>
        )}
      </div>

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
