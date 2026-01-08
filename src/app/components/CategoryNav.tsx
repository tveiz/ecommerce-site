'use client';
import { useState } from 'react';

interface Category {
  id: string;
  name: string;
}

interface CategoryNavProps {
  categories: Category[];
  onSelectCategory: (categoryId: string) => void;
}

export default function CategoryNav({ categories, onSelectCategory }: CategoryNavProps) {
  const [activeCategory, setActiveCategory] = useState('all');

  const handleClick = (categoryId: string) => {
    setActiveCategory(categoryId);
    onSelectCategory(categoryId);
  };

  return (
    <div className="flex flex-wrap gap-2 justify-center">
      {categories.map((category) => (
        <button
          key={category.id}
          onClick={() => handleClick(category.id)}
          className={`px-4 py-2 rounded-full transition-all ${
            activeCategory === category.id
              ? 'font-bold scale-105 shadow-lg bg-orange-600 text-white'
              : 'opacity-80 hover:opacity-100 bg-gray-100 dark:bg-gray-800'
          }`}
        >
          {category.name}
        </button>
      ))}
    </div>
  );
}
