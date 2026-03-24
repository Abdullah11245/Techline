import { useEffect, useState } from "react";

interface Product {
  _id: string;
  title: string;
  description: string;
  image: string;
  category: string;
}

const Product = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const res = await fetch("http://localhost:5000/api/products");
        if (!res.ok) throw new Error("Failed to fetch products");
        const data = await res.json();
        setProducts(data);
      } catch (err: any) {
        setError(err.message || "Unknown error");
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

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
      <div className="relative mx-auto max-w-6xl py-10 px-4">
        <h2 className="my-4 text-4xl font-bold text-center">Recent Products</h2>
        <div className="grid w-full gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {products.map((product) => (
            <article
              key={product._id}
              className="bg-white rounded-lg shadow hover:shadow-lg transition duration-300 aspect-square flex flex-col overflow-hidden"
            >
              <a href="#" className="flex flex-col h-full">
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
                  <p className=" text-gray-600 text-sm">
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