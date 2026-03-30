import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useRef } from 'react';
import { motion } from 'framer-motion';
import { Menu, X, Phone, ChevronDown } from 'lucide-react';
import { Button } from './Button';
import { siteConfig } from '@data/site';

export const Header: React.FC = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [servicesOpen, setServicesOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
   const closeTimeoutRef = useRef(null) as any;
  const [isMobile, setIsMobile] = useState(false);
  const effectiveScrolled = isMobile ? true : isScrolled;
  const [productsOpen, setProductsOpen] = useState(false);
const [categories, setCategories] = useState([]);
React.useEffect(() => {
  const fetchCategories = async () => {
    try {
      const res = await fetch("https://techline-backend-1.onrender.com/api/categories");
      const data = await res?.json();
      setCategories(data);
    } catch (err) {
      console.error("Failed to fetch categories", err);
    }
  };

  fetchCategories();
}, []);

React.useEffect(() => {
  const handleResize = () => {
    setIsMobile(window.innerWidth < 768); // md breakpoint (Tailwind)
  };

  handleResize(); // set initial value
  window.addEventListener("resize", handleResize);

  return () => window.removeEventListener("resize", handleResize);
}, []);
    const links = [
    { to: "/services/it-support-infrastructure", label: "IT Support & Infrastructure" },
    { to: "/services/cyber-security", label: "Cyber Security Services" },
    { to: "/services/backup-business-continuity", label: "Backup & Business Continuity" },
    { to: "/services/microsoft-365-collaboration", label: "Microsoft 365 & Collaboration" },
    { to: "/services/telecom-cloud-telephony", label: "Telecom & Cloud Telephony" },
    { to: "/services/digital-services", label: "Digital Services" },
  ];
  const location = useLocation();
const containerVariants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.2,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, x: -20 },
  visible: {
    opacity: 1,
    x: 0,
    transition: { duration: 0.5, ease: "easeOut" },
  },
};
  React.useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  React.useEffect(() => {
    setMobileMenuOpen(false);
  }, [location]);

  const isActive = (href: string) => location.pathname === href;

  const navText = isScrolled ? 'text-gray-700' : 'text-black';
  const navHover = 'text-black' 
  const iconColor = 'text-gray-900';

  return (
<motion.header
  initial={false}
  animate={{
    maxWidth: effectiveScrolled ? "100%" : "80rem",
    borderRadius: effectiveScrolled ? "0rem" : "0.75rem",
    left: effectiveScrolled ? "0%" : "50%",
    x: effectiveScrolled ? "0%" : "-50%",
  }}
  transition={{
    duration: 0.5,
    ease: [0.4, 0, 0.2, 1],
  }}
  className={`fixed z-50 w-full ${effectiveScrolled ? 'top-0' : 'top-4'} transition-colors duration-500 bg-white`}
>
      <div className="container-custom">
        <div className="flex items-center justify-between h-16 md:h-20">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-2">
            <img src="/Tech-Line-Logo.webp" alt="Tech Line" className="h-8 md:h-10 w-auto" />
          </Link>

          {/* Desktop Nav */}
          <nav className="hidden md:flex items-center gap-8">
            <Link
              to="/about"
              className={`relative text-md font-medium transition-colors ${isActive('/about') ? 'text-primary-600' : `${navText} ${navHover}`} after:absolute after:left-0 after:-bottom-1 after:h-[2px] after:w-full after:origin-left after:scale-x-0 after:bg-green-500 after:transition-transform after:duration-300 hover:after:scale-x-100 ${isActive('/about') ? 'after:scale-x-100' : ''}`}
            >
              About
            </Link>
            
            {/* Services Dropdown */}
        <div
      className="relative"
      onMouseEnter={() => {
        if (closeTimeoutRef.current) clearTimeout(closeTimeoutRef.current);
        setServicesOpen(true);
      }}
      onMouseLeave={() => {
        closeTimeoutRef.current = setTimeout(() => setServicesOpen(false), 700);
      }}
    >
      <button className={`flex items-center gap-1 text-md font-medium ${navText} ${navHover} transition-colors`}>
        Services
        <ChevronDown className="w-5 h-5 pt-1" />
      </button>

      {servicesOpen && (
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 12 }}
          transition={{ duration: 0.5, ease: "easeOut" }}
          className="absolute top-full left-0 mt-2 w-72 bg-white rounded-lg shadow-lg border border-gray-200 py-2 z-50 overflow-hidden"
        >
          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            exit="hidden"
          >
            {links.map((link) => (
              <motion.div key={link.to} variants={itemVariants}>
               <Link
  to={link.to}
  className={`block px-4 py-2 text-sm font-medium transition-colors text-black ${isActive(link.to) ? 'text-primary-600' : `${'text-black'} ${navHover}`}`}
>
  <span
    className={`relative
      after:absolute after:left-0 after:-bottom-1 after:h-[2px] after:w-full
      after:origin-left after:scale-x-0 after:bg-green-500
      after:transition-transform after:duration-500 after:ease-out
      hover:after:scale-x-100
      ${isActive(link.to) ? 'after:scale-x-100' : ''}
    `}
  >
    {link.label}
  </span>
</Link>
              </motion.div>
            ))}
          </motion.div>
        </motion.div>
      )}
    </div>

          <Link to="/contact" className={`relative text-md font-medium transition-colors ${isActive('/contact') ? 'text-primary-600' : `${navText} ${navHover}`} after:absolute after:left-0 after:-bottom-1 after:h-[2px] after:w-full after:origin-left after:scale-x-0 after:bg-green-500 after:transition-transform after:duration-300 hover:after:scale-x-100 ${isActive('/contact') ? 'after:scale-x-100' : ''}`}>
  Contact
</Link>

{/* <Link to="/productForm">Products</Link> */}
<div
  className="relative"
  onMouseEnter={() => {
    if (closeTimeoutRef.current) clearTimeout(closeTimeoutRef.current);
    setProductsOpen(true);
  }}
  onMouseLeave={() => {
    closeTimeoutRef.current = setTimeout(() => setProductsOpen(false), 700);
  }}
>
  <button className={`flex items-center gap-1 text-md font-medium ${navText} ${navHover} transition-colors`}>
    Products
    <ChevronDown className="w-5 h-5 pt-1" />
  </button>

  {productsOpen && (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: 12 }}
      transition={{ duration: 0.5, ease: "easeOut" }}
      className="absolute top-full left-0 mt-2 w-72 bg-white rounded-lg shadow-lg border border-gray-200 py-2 z-50 overflow-hidden"
    >
      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        exit="hidden"
      >
        {categories?.map((cat: any) => (
          <motion.div key={cat._id} variants={itemVariants}>
            <Link
              to={`/products/${cat.name}`}
              className={`block px-4 py-2 text-sm font-medium transition-colors text-black ${navHover}`}
            >
              <span
                className={`relative
                  after:absolute after:left-0 after:-bottom-1 after:h-[2px] after:w-full
                  after:origin-left after:scale-x-0 after:bg-green-500
                  after:transition-transform after:duration-500 after:ease-out
                  hover:after:scale-x-100
                `}
              >
                {cat.name}
              </span>
            </Link>
          </motion.div>
        ))}
      </motion.div>
    </motion.div>
  )}
</div>

          </nav>

          {/* Desktop CTA Bar (Sticky) */}
<div className="hidden md:flex items-center gap-4">
  <a
    href={`tel:${siteConfig.phone}`}
    className="group flex flex-col items-start justify-center px-5 py-3 rounded-xl bg-accent-600 text-white transition-transform duration-300 hover:scale-105 hover:shadow-lg"
  >
    <div className="flex items-center gap-3">
      <Phone className="w-5 h-5 text-white" />
      <div className="flex flex-col leading-tight">
        <span className="text-xs font-medium uppercase opacity-90">Contact Now</span>
        <span className="text-sm font-semibold">{siteConfig.phone}</span>
      </div>
    </div>
  </a>
</div>

          {/* Mobile Menu Button */}
          <button
            className="md:hidden p-2 hover:bg-gray-100 rounded-lg transition-colors text-black mr-2 bg-white/40"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            aria-label="Toggle menu"
            aria-expanded={mobileMenuOpen}
          >
            {mobileMenuOpen ? (
              <X className={`w-6 h-6 ${iconColor}`} />
            ) : (
              <Menu className={`w-6 h-6 ${iconColor}`} />
            )}
          </button>
        </div>

        {/* Mobile Menu */}
        {mobileMenuOpen && (
          <motion.nav
            className="md:hidden border-t border-gray-200 bg-white/40"
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.2 }}
          >
            <div className="p-2 space-y-4">
              <Link
                to="/about"
                className="block px-4 py-2 rounded-lg hover:bg-gray-100 text-gray-900 font-medium transition-colors"
              >
                About
              </Link>
              
              {/* Services Submenu */}
              <div>
                <button
                  onClick={() => setServicesOpen(!servicesOpen)}
                  className="w-full flex items-center justify-between px-4 py-2 rounded-lg hover:bg-gray-100 text-gray-900 font-medium transition-colors"
                >
                  Services
                  <ChevronDown className={`w-4 h-4 transition-transform ${servicesOpen ? 'rotate-180' : ''}`} />
                </button>
                {servicesOpen && (
                  <div className="ml-4 mt-2 space-y-2">
                    <Link
                      to="/services/it-support-infrastructure"
                      className="block px-4 py-2 text-sm rounded-lg hover:bg-gray-100 text-gray-700 transition-colors"
                    >
                      IT Support & Infrastructure
                    </Link>
                    <Link
                      to="/services/cyber-security"
                      className="block px-4 py-2 text-sm rounded-lg hover:bg-gray-100 text-gray-700 transition-colors"
                    >
                      Cyber Security Services
                    </Link>
                    <Link
                      to="/services/backup-business-continuity"
                      className="block px-4 py-2 text-sm rounded-lg hover:bg-gray-100 text-gray-700 transition-colors"
                    >
                      Backup & Business Continuity
                    </Link>
                    <Link
                      to="/services/microsoft-365-collaboration"
                      className="block px-4 py-2 text-sm rounded-lg hover:bg-gray-100 text-gray-700 transition-colors"
                    >
                      Microsoft 365 & Collaboration
                    </Link>
                    <Link
                      to="/services/telecom-cloud-telephony"
                      className="block px-4 py-2 text-sm rounded-lg hover:bg-gray-100 text-gray-700 transition-colors"
                    >
                      Telecom & Cloud Telephony
                    </Link>
                    <Link
                      to="/services/digital-services"
                      className="block px-4 py-2 text-sm rounded-lg hover:bg-gray-100 text-gray-700 transition-colors"
                    >
                      Digital Services
                    </Link>
                  </div>
                )}
              </div>

              <Link
                to="/contact"
                className="block px-4 py-2 rounded-lg hover:bg-gray-100 text-gray-900 font-medium transition-colors"
              >
                Contact
              </Link>
              <div>
  <button
    onClick={() => setProductsOpen(!productsOpen)}
    className="w-full flex items-center justify-between px-4 py-2 rounded-lg hover:bg-gray-100 text-gray-900 font-medium transition-colors"
  >
    Products
    <ChevronDown className={`w-4 h-4 transition-transform ${productsOpen ? 'rotate-180' : ''}`} />
  </button>

  {productsOpen && (
    <div className="ml-4 mt-2 space-y-2">
      {categories.map((cat: any) => (
        <Link
          key={cat._id}
          to={`/products/${cat.slug}`}
          className="block px-4 py-2 text-sm rounded-lg hover:bg-gray-100 text-gray-700 transition-colors"
        >
          {cat.name}
        </Link>
      ))}
    </div>
  )}
</div>
              
              <div className="border-t border-gray-200 pt-4">
                <a
                  href={`tel:${siteConfig.phone}`}
                  className="block px-4 py-2 rounded-lg text-primary-600 font-semibold hover:bg-primary-50 transition-colors"
                >
                  Call Now
                </a>
              </div>
            </div>
          </motion.nav>
        )}
      </div>
    </motion.header>
  );
};
