export default function Centered({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex items-center justify-center flex-1 h-full -mt-16">
      {children}
    </div>
  );
}