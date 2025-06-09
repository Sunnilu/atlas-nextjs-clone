// app/layout.tsx
import '../styles/global.css';


export const metadata = {
  title: 'My App',
  description: 'A demo of topics and questions',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className="min-h-screen bg-white text-black antialiased dark:bg-gray-900 dark:text-white">
        {children}
      </body>
    </html>
  );
}
