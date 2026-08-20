import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: 'Aadhi Bhairava Cow Farm - Smart Dairy. Smarter Farming.',
  description: 'Enterprise Dairy Farm Management System',
  keywords: 'dairy farm, smart dairy, cattle health, milk collection, agronomy AI',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <head>
        <link rel="icon" href="/favicon.png" />
      </head>
      <body>{children}</body>
    </html>
  );
}
