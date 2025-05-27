import NavBarAdmin from '../../components/Admin/NavBarAdmin'

export default function AdminLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="grow flex gap-2   ">
      <NavBarAdmin />
      <div className="p-2  grow">
        {children}
      </div>
    </div>
  );
}
