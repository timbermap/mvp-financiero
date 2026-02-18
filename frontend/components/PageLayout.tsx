// components/PageLayout.tsx
import React from 'react';

type PageLayoutProps = {
  title: string;
  subtitle: string;
  children: React.ReactNode;
};

export function ContentSection({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div className="mb-12">
      <h2 className="text-2xl font-bold text-slate-700 mb-4 pb-2 border-b border-slate-200">{title}</h2>
      <div className="prose prose-slate max-w-none">
        {children}
      </div>
    </div>
  );
}

export default function PageLayout({ title, subtitle, children }: PageLayoutProps) {
  return (
    <main className="bg-white">
      <div className="max-w-4xl mx-auto px-6 py-16 md:py-24">
        <div className="text-center mb-16">
          <h1 className="text-4xl md:text-5xl font-bold text-slate-800 tracking-tight">{title}</h1>
          <p className="mt-4 text-lg text-slate-600 max-w-2xl mx-auto">{subtitle}</p>
        </div>
        <div>
          {children}
        </div>
      </div>
    </main>
  );
}