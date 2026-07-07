export default function Loading() {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-background">
      <img
        src="/brand/op_01.svg"
        alt="Outdoor Patagonia"
        className="h-20 w-20 animate-pulse opacity-80"
      />
    </div>
  );
}
