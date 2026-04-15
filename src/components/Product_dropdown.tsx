import React, { useState } from "react";
import { Link } from "react-router-dom";
import { ChevronRight } from "lucide-react";

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

interface Props {
  categories: CategoryItem[];
  buildProductLink: (
    category: string,
    subcategory?: string,
    subSubcategory?: string
  ) => string;
  onClickLink?: () => void;
}

const ProductDropdown: React.FC<Props> = ({
  categories,
  buildProductLink,
  onClickLink,
}) => {
  const [activeCategory, setActiveCategory] = useState<string | null>(null);
  const [activeSubcategory, setActiveSubcategory] = useState<string | null>(null);

  return (
    <div className="absolute top-full left-0 mt-2 w-80 bg-white rounded-lg shadow-lg border border-gray-200 py-2 z-50">
      
      {/* Categories */}
      {categories.map((category) => {
        const isActive = activeCategory === category._id;

        return (
          <div
            key={category._id}
            className="relative"
            onMouseEnter={() => {
              setActiveCategory(category._id);
              setActiveSubcategory(null);
            }}
          >
            <div className="flex items-center">
              <Link
                to={buildProductLink(category.name)}
                onClick={onClickLink}
                className="flex-1 px-4 py-3 text-sm hover:bg-gray-50"
              >
                {category.name}
              </Link>

              {(category.subcategories?.length || 0) > 0 && (
                <ChevronRight className="w-4 h-4 mr-3 text-gray-500" />
              )}
            </div>

            {/* Subcategories */}
            {isActive && category.subcategories && (
              <div className="absolute left-full top-0 ml-1 w-72 bg-white border rounded-lg shadow-lg">
                {category.subcategories.map((sub) => {
                  const subKey = `${category._id}-${sub.name}`;
                  const isSubActive = activeSubcategory === subKey;

                  return (
                    <div
                      key={subKey}
                      onMouseEnter={() => setActiveSubcategory(subKey)}
                      className="relative"
                    >
                      <div className="flex items-center">
                        <Link
                          to={buildProductLink(category.name, sub.name)}
                          onClick={onClickLink}
                          className="flex-1 px-4 py-3 text-sm hover:bg-gray-50"
                        >
                          {sub.name}
                        </Link>

                        {(sub.subSubcategories?.length || 0) > 0 && (
                          <ChevronRight className="w-4 h-4 mr-3 text-gray-500" />
                        )}
                      </div>

                      {/* Sub-Subcategories */}
                      {isSubActive && sub.subSubcategories && (
                        <div className="absolute left-full top-0 ml-1 w-72 bg-white border rounded-lg shadow-lg">
                          {sub.subSubcategories.map((subsub) => (
                            <Link
                              key={subsub.name}
                              to={buildProductLink(
                                category.name,
                                sub.name,
                                subsub.name
                              )}
                              onClick={onClickLink}
                              className="block px-4 py-3 text-sm hover:bg-gray-50"
                            >
                              {subsub.name}
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
  );
};

export default ProductDropdown;