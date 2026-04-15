import React, { useEffect, useRef, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Menu, X, Phone, ChevronDown, ChevronRight } from 'lucide-react';
import { siteConfig } from '@data/site';
import { useAuth } from '@/context/AuthContext';
import { buildUrl } from '@/utils/api';
import ProductDropdown from './Product_dropdown';

interface SubSubcategoryItem {
  name: string;
}

interface SubcategoryItem {
  name: string;
  subSubcategories?: SubSubcategoryItem[];
}

interface CategoryItem {
  _id: string;
  name: string;
  subcategories?: SubcategoryItem[];
}

export const Header: React.FC = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [servicesOpen, setServicesOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const closeTimeoutRef = useRef(null) as any;
  const [isMobile, setIsMobile] = useState(false);
  const effectiveScrolled = isMobile ? true : isScrolled;
  const [productsOpen, setProductsOpen] = useState(false);
   const [mobproductsOpen, setMobproductsOpen] = useState(false);
  const [categories, setCategories] = useState<CategoryItem[]>([]);
  const [activeProductCategory, setActiveProductCategory] = useState<string | null>(null);
  const [activeProductSubcategory, setActiveProductSubcategory] = useState<string | null>(null);
  const [expandedMobileCategory, setExpandedMobileCategory] = useState<string | null>(null);
  const [expandedMobileSubcategory, setExpandedMobileSubcategory] = useState<string | null>(null);
  const [activeCategory, setActiveCategory] = useState<any>(null);
  const [activeSubcategory, setActiveSubcategory] = useState<any>(null);  
  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const res = await fetch(buildUrl('/api/categories'));
        const data = await res.json();
        console.log('Fetched categories:', data);
        setCategories(Array.isArray(data) ? data : []);
      } catch (err) {
        console.error('Failed to fetch categories', err);
      }
    };

    fetchCategories();
  }, []);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768);
    };

    handleResize();
    window.addEventListener('resize', handleResize);

    return () => window.removeEventListener('resize', handleResize);
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
  const { isAuthenticated, logout } = useAuth();
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
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    setMobileMenuOpen(false);
  }, [location]);

  const isActive = (href: string) => location.pathname === href;
  const buildProductLink = (categoryName: string, subcategoryName?: string, subSubcategoryName?: string) => {
    const searchParams = new URLSearchParams();

    if (subcategoryName) {
      searchParams.set('subcategory', subcategoryName);
    }

    if (subSubcategoryName) {
      searchParams.set('subSubcategory', subSubcategoryName);
    }

    const search = searchParams.toString();
    return `/products/${encodeURIComponent(categoryName)}${search ? `?${search}` : ''}`;
  };

  const clearCloseTimeout = () => {
    if (closeTimeoutRef.current) {
      clearTimeout(closeTimeoutRef.current);
      closeTimeoutRef.current = null;
    }
  };

  const closeProductMenus = () => {
    setProductsOpen(false);
    setActiveProductCategory(null);
    setActiveProductSubcategory(null);
    setExpandedMobileCategory(null);
    setExpandedMobileSubcategory(null);
  };

  const handleProductMenuEnter = () => {
    if (isMobile) return;
    clearCloseTimeout();
    setProductsOpen(true);
    setServicesOpen(false);
  };

  const handleProductMenuLeave = () => {
    if (isMobile) return;
    closeTimeoutRef.current = setTimeout(() => {
      closeProductMenus();
    }, 300);
  };

  const handleProductsLinkClick = () => {
    closeProductMenus();
    setMobileMenuOpen(false);
  };

  const navText = isScrolled ? 'text-gray-700' : 'text-black';
  const navHover = 'text-black';
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
        setProductsOpen(false);
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

          {/* {isAuthenticated && (
            <button
              type="button"
              onClick={() => logout()}
              className={`relative text-md font-medium transition-colors ${navText} ${navHover}`}
            >
              Logout
            </button>
          )} */}

{/* <Link to="/productForm">Products</Link> */}
<div
  className="relative hidden md:block"
  onMouseEnter={handleProductMenuEnter}
  onMouseLeave={handleProductMenuLeave}
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
      className="absolute top-full left-0 mt-2 w-56 bg-white rounded-lg shadow-lg border border-gray-200 py-2 z-50"
    >
      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        exit="hidden"
      >
        {categories.map((category) => {
          const hasSubcategories = (category.subcategories?.length || 0) > 0;
          const isCategoryActive = activeProductCategory === category._id;

          return (
            <motion.div
              key={category._id}
              variants={itemVariants}
              className="relative"
              onMouseEnter={() => {
                setActiveProductCategory(category._id);
                setActiveProductSubcategory(null);
              }}
            >
              <div className="flex items-center">
                <Link
                  to={buildProductLink(category.name)}
                  onClick={handleProductsLinkClick}
                  className={`flex-1 px-4 py-3 text-sm font-medium transition-colors text-black hover:bg-gray-50 ${navHover}`}
                >
                  <span className="relative after:absolute after:left-0 after:-bottom-1 after:h-[2px] after:w-full after:origin-left after:scale-x-0 after:bg-green-500 after:transition-transform after:duration-500 after:ease-out hover:after:scale-x-100">
                    {category.name}
                  </span>
                </Link>
                {hasSubcategories && (
                  <button
                    type="button"
                    onMouseEnter={() => {
                      setActiveProductCategory(category._id);
                      setActiveProductSubcategory(null);
                    }}
                    className={`px-4 py-3 text-gray-500 transition-colors hover:bg-gray-50 ${
                      isCategoryActive ? 'text-gray-900' : ''
                    }`}
                    aria-label={`Show ${category.name} subcategories`}
                  >
                    <ChevronRight className="h-4 w-4" />
                  </button>
                )}
              </div>

              {hasSubcategories && isCategoryActive && (
                <div className="absolute left-full top-0 ml-1 w-56 rounded-lg border border-gray-200 bg-white py-2 shadow-lg">
                  {category.subcategories?.map((subcategory) => {
                    const subcategoryKey = `${category._id}-${subcategory.name}`;
                    const hasSubSubcategories = (subcategory.subSubcategories?.length || 0) > 0;
                    const isSubcategoryActive = activeProductSubcategory === subcategoryKey;

                    return (
                      <div
                        key={subcategoryKey}
                        className="relative"
                        onMouseEnter={() => setActiveProductSubcategory(subcategoryKey)}
                      >
                        <div className="flex items-center">
                          <Link
                            to={buildProductLink(category.name, subcategory.name)}
                            onClick={handleProductsLinkClick}
                            className="flex-1 px-4 py-3 text-sm font-medium text-gray-800 transition-colors hover:bg-gray-50"
                          >
                            {subcategory.name}
                          </Link>
                          {hasSubSubcategories && (
                            <button
                              type="button"
                              onMouseEnter={() => setActiveProductSubcategory(subcategoryKey)}
                              className={`px-4 py-3 text-gray-500 transition-colors hover:bg-gray-50 ${
                                isSubcategoryActive ? 'text-gray-900' : ''
                              }`}
                              aria-label={`Show ${subcategory.name} sub subcategories`}
                            >
                              <ChevronRight className="h-4 w-4" />
                            </button>
                          )}
                        </div>

                        {hasSubSubcategories && isSubcategoryActive && (
                          <div className="absolute left-full top-0 ml-1 w-56 rounded-lg border border-gray-200 bg-white py-2 shadow-lg">
                            {subcategory.subSubcategories?.map((subSubcategory) => (
                              <Link
                                key={`${subcategoryKey}-${subSubcategory.name}`}
                                to={buildProductLink(category.name, subcategory.name, subSubcategory.name)}
                                onClick={handleProductsLinkClick}
                                className="block px-4 py-3 text-sm font-medium text-gray-800 transition-colors hover:bg-gray-50"
                              >
                                {subSubcategory.name}
                              </Link>
                            ))}
                          </div>
                        )}
                      </div>
                    );
                  })}
                </div>
              )}
            </motion.div>
          );
        })}
      </motion.div>
    </motion.div>
  )}
</div>
<div className="md:hidden">
  {/* PRODUCTS BUTTON */}
  <button
  onClick={() => {
    setMobproductsOpen(!mobproductsOpen);
    if (!mobproductsOpen) setServicesOpen(false);

    // reset drill state when opening
    if (!mobproductsOpen) {
      setActiveCategory(null);
      setActiveSubcategory(null);
    }
  }}
    className="w-full flex items-center justify-between px-4 py-2 rounded-lg hover:bg-gray-100 text-gray-900 font-medium"
  >
    Products
    <ChevronDown
      className={`w-4 h-4 transition-transform ${
        mobproductsOpen  ? "rotate-180" : ""
      }`}
    />
  </button>

  {/* MAIN DROPDOWN */}
  {mobproductsOpen  && (
    <div className="mt-2 bg-white rounded-lg shadow-sm p-2">

      {/* ================= LEVEL 1: CATEGORIES ================= */}
      {!activeCategory && (
        <div className="space-y-2">
          {categories.map((category) => (
            <button
              key={category._id}
              onClick={() => setActiveCategory(category)}
              className="w-full text-left px-4 py-2 rounded-md hover:bg-gray-100 font-medium"
            >
              {category.name}
            </button>
          ))}
        </div>
      )}

      {/* ================= LEVEL 2: SUBCATEGORIES ================= */}
      {activeCategory && !activeSubcategory && (
        <div>
          {/* HEADER */}
          <div className="flex items-center gap-2 px-2 py-2 border-b">
            <button
              onClick={() => setActiveCategory(null)}
              className="text-sm text-gray-500"
            >
              ← Back
            </button>
            <span className="font-semibold">{activeCategory.name}</span>
          </div>

          {/* SUBCATEGORY LIST */}
          <div className="mt-2 space-y-2">
            {activeCategory.subcategories?.map((sub:any) => (
              <button
                key={sub.name}
                onClick={() => setActiveSubcategory(sub)}
                className="w-full text-left px-4 py-2 rounded-md hover:bg-gray-100"
              >
                {sub.name}
              </button>
            ))}
          </div>
        </div>
      )}

      {/* ================= LEVEL 3: SUB-SUBCATEGORIES ================= */}
      {activeCategory && activeSubcategory && (
        <div>
          {/* HEADER */}
          <div className="flex items-center gap-2 px-2 py-2 border-b">
            <button
              onClick={() => setActiveSubcategory(null)}
              className="text-sm text-gray-500"
            >
              ← Back
            </button>
            <span className="font-semibold">
              {activeSubcategory.name}
            </span>
          </div>

          {/* SUB-SUBCATEGORY LIST */}
          <div className="mt-2 space-y-2">
            {activeSubcategory.subSubcategories?.map((subSub:any) => (
              <Link
                key={subSub.name}
                to={buildProductLink(
                  activeCategory.name,
                  activeSubcategory.name,
                  subSub.name
                )}
                onClick={handleProductsLinkClick}
                className="block px-4 py-2 rounded-md hover:bg-gray-100 text-gray-700"
              >
                {subSub.name}
              </Link>
            ))}
          </div>
        </div>
      )}

    </div>
  )}
</div>

          </nav>

          {/* Desktop CTA Bar (Sticky) */}
{/* <div className="hidden md:flex items-center gap-4">
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
</div> */}
<div className="hidden md:flex items-center gap-4">
  {isAuthenticated ? (
    <button
      onClick={logout}
      className="group flex items-center gap-3 px-5 py-3 rounded-2xl bg-[#111827] text-white transition-transform duration-300 hover:scale-105 hover:shadow-lg"
    >
      <span className="text-sm font-semibold">Logout</span>
    </button>
  ) : (
    <a
      href={`tel:${siteConfig.phone}`}
      className="group flex flex-col items-start justify-center px-5 py-3 rounded-xl bg-accent-600 text-white transition-transform duration-300 hover:scale-105 hover:shadow-lg"
    >
      <div className="flex items-center gap-3">
        <Phone className="w-5 h-5 text-white" />
        <div className="flex flex-col leading-tight">
          <span className="text-xs font-medium uppercase opacity-90">
            Contact Now
          </span>
          <span className="text-sm font-semibold">
            {siteConfig.phone}
          </span>
        </div>
      </div>
    </a>
  )}
</div>
          {/* Mobile Menu Button */}
          <button
            className="md:hidden p-2 hover:bg-gray-100 rounded-lg transition-colors text-black mr-2 bg-white/40"
            onClick={() => {
  setMobileMenuOpen(!mobileMenuOpen);
  setProductsOpen(false);
}}
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
                  onClick={() => {
                    setServicesOpen(!servicesOpen);
                    if (!servicesOpen) setProductsOpen(false);
                  }}
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
              <Link
                to={isAuthenticated ? '/admin/dashboard' : '/admin/login'}
                className="block px-4 py-2 rounded-lg hover:bg-gray-100 text-gray-900 font-medium transition-colors"
              >
                {isAuthenticated ? 'Dashboard' : 'Admin'}
              </Link>
              {isAuthenticated && (
                <button
                  type="button"
                  onClick={() => {
                    logout();
                    setMobileMenuOpen(false);
                  }}
                  className="w-full text-left px-4 py-2 rounded-lg hover:bg-gray-100 text-red-600 font-medium transition-colors"
                >
                  Logout
                </button>
              )}
              <div>
  <button
    onClick={() => {
      setProductsOpen(!productsOpen);
      if (!productsOpen) setServicesOpen(false);
    }}
    className="w-full flex items-center justify-between px-4 py-2 rounded-lg hover:bg-gray-100 text-gray-900 font-medium transition-colors"
  >
    Products
    <ChevronDown className={`w-4 h-4 transition-transform ${productsOpen ? 'rotate-180' : ''}`} />
  </button>

  {productsOpen && (
    <div className="ml-4 mt-2 space-y-2">
      {categories.map((category) => {
        const isCategoryExpanded = expandedMobileCategory === category._id;

        return (
          <div key={category._id} className="space-y-2">
            <div className="flex items-center gap-2">
              <Link
                to={buildProductLink(category.name)}
                onClick={handleProductsLinkClick}
                className="flex-1 px-4 py-2 text-sm rounded-lg hover:bg-gray-100 text-gray-700 transition-colors"
              >
                {category.name}
              </Link>
              {(category.subcategories?.length || 0) > 0 && (
                <button
                  type="button"
                  onClick={() =>
                    setExpandedMobileCategory((prev) =>
                      prev === category._id ? null : category._id
                    )
                  }
                  className="rounded-lg p-2 text-gray-700 hover:bg-gray-100"
                  aria-label={`Toggle ${category.name} subcategories`}
                >
                  <ChevronDown
                    className={`h-4 w-4 transition-transform ${
                      isCategoryExpanded ? 'rotate-180' : ''
                    }`}
                  />
                </button>
              )}
            </div>

            {isCategoryExpanded && (
              <div className="ml-4 space-y-2 border-l border-gray-200 pl-3">
                {category.subcategories?.map((subcategory) => {
                  const subcategoryKey = `${category._id}-${subcategory.name}`;
                  const isSubcategoryExpanded = expandedMobileSubcategory === subcategoryKey;

                  return (
                    <div key={subcategoryKey} className="space-y-2">
                      <div className="flex items-center gap-2">
                        <Link
                          to={buildProductLink(category.name, subcategory.name)}
                          onClick={handleProductsLinkClick}
                          className="flex-1 px-4 py-2 text-sm rounded-lg hover:bg-gray-100 text-gray-700 transition-colors"
                        >
                          {subcategory.name}
                        </Link>
                        {(subcategory.subSubcategories?.length || 0) > 0 && (
                          <button
                            type="button"
                            onClick={() =>
                              setExpandedMobileSubcategory((prev) =>
                                prev === subcategoryKey ? null : subcategoryKey
                              )
                            }
                            className="rounded-lg p-2 text-gray-700 hover:bg-gray-100"
                            aria-label={`Toggle ${subcategory.name} sub subcategories`}
                          >
                            <ChevronDown
                              className={`h-4 w-4 transition-transform ${
                                isSubcategoryExpanded ? 'rotate-180' : ''
                              }`}
                            />
                          </button>
                        )}
                      </div>

                      {isSubcategoryExpanded && (
                        <div className="ml-4 space-y-2 border-l border-gray-200 pl-3">
                          {subcategory.subSubcategories?.map((subSubcategory) => (
                            <Link
                              key={`${subcategoryKey}-${subSubcategory.name}`}
                              to={buildProductLink(category.name, subcategory.name, subSubcategory.name)}
                              onClick={handleProductsLinkClick}
                              className="block px-4 py-2 text-sm rounded-lg hover:bg-gray-100 text-gray-700 transition-colors"
                            >
                              {subSubcategory.name}
                            </Link>
                          ))}
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>
            )}
          </div>
        );
      })}
    </div>
  )} 
  {/* {productsOpen && (
  <ProductDropdown
    categories={categories}
    buildProductLink={buildProductLink}
    onClickLink={handleProductsLinkClick}
  />
)} */}
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
