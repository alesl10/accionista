import NavBarAdmin from '../../components/Admin/NavBarAdmin'

export default function AdminLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="grow flex gap-2 ">
      <NavBarAdmin />
      <div className="  grow">
        {children}
      </div>
    </div>
  );
}
