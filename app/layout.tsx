// app/layout.tsx
export const metadata = {
  title: 'My App',
  description: 'A demo of topics and questions',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
