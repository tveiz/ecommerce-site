'use client';
import { useState } from 'react';

interface AdminTabsProps {
  tabs: Array<{
    id: string;
    label: string;
    content: React.ReactNode;
  }>;
}

export default function AdminTabs({ tabs }: AdminTabsProps) {
  const [activeTab, setActiveTab] = useState(tabs[0]?.id || '');

  const activeTabContent = tabs.find(tab => tab.id === activeTab)?.content;

  return (
    <div>
      {/* Tabs Header */}
      <div className="flex border-b overflow-x-auto">
        {tabs.map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            className={`px-6 py-3 font-medium whitespace-nowrap transition-colors ${
              activeTab === tab.id
                ? 'border-b-2 font-bold'
                : 'hover:bg-gray-100 dark:hover:bg-gray-800 opacity-80'
            }`}
            style={{
              borderBottomColor: activeTab === tab.id ? 'var(--color-destaque)' : 'transparent',
              color: activeTab === tab.id ? 'var(--color-destaque)' : 'var(--color-texto)',
            }}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {/* Tab Content */}
      <div className="p-6">
        {activeTabContent || (
          <div className="text-center py-12">
            <p className="opacity-70">Selecione uma aba para ver o conteúdo</p>
          </div>
        )}
      </div>
    </div>
  );
}
