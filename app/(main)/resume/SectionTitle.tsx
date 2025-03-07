// 標題
export function SectionTitle({ label }: { label: string }) {
  return (
    <div className="mb-10 flex justify-center">
      <span className="bg-black px-4 py-1 text-center text-3xl font-bold text-white">
        {label}
      </span>
    </div>
  );
}
