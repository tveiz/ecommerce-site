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
          className={`px-4 py-2 rounded-full transition-all duration-200 ${
            activeCategory === category.id
              ? 'font-bold scale-105 shadow-lg'
              : 'opacity-80 hover:opacity-100'
          }`}
          style={{
            backgroundColor: activeCategory === category.id 
              ? 'var(--color-destaque)' 
              : 'var(--color-secundario)',
            color: activeCategory === category.id ? 'white' : 'var(--color-texto)',
            border: `2px solid ${activeCategory === category.id ? 'transparent' : 'var(--color-destaque)'}`,
          }}
        >
          {category.name}
        </button>
      ))}
    </div>
  );
}
