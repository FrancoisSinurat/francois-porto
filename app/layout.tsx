import './styles/globals.css';

export const metadata = {
  title: 'Noval Sinurat - Portfolio',
  description: 'Welcome to my modern portfolio!',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="bg-gray-50 text-gray-900">
        {children}
      </body>
    </html>
  );
}
