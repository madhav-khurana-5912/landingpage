import { memo, ReactNode } from 'react';
import { Navbar } from './Navbar';
import { Footer } from './Footer';
import { CustomCursor } from './CustomCursor';

interface LayoutProps {
  children: ReactNode;
  tier: 'high' | 'low';
}

export const Layout = memo(({ children, tier }: LayoutProps) => {
  return (
    <div className="bg-background-dark min-h-screen text-white relative">
      {/* Custom Cursor is now always rendered for the premium experience */}
      <CustomCursor />
      <div className="fixed inset-0 pointer-events-none z-50 opacity-20 bg-noise mix-blend-overlay"></div>
      
      <Navbar />
      
      <main>
        {children}
      </main>

      <Footer />
    </div>
  );
});
