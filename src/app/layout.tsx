// This is the root layout that renders the [locale] layout
// It doesn't need to contain HTML structure, just pass through children

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
