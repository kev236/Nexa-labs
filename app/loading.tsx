export default function Loading() {
  return (
    <div className="max-w-6xl mx-auto px-6 py-20 space-y-12 animate-pulse">
      {/* HEADER SKELETON */}
      <div className="space-y-4 max-w-xl">
        <div className="h-6 w-32 bg-white/5 rounded-full border border-white/10" />
        <div className="h-12 w-3/4 bg-white/10 rounded-xl" />
        <div className="h-5 w-full bg-white/5 rounded-lg" />
      </div>

      {/* GRID CARDS SKELETON */}
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 pt-6">
        {[1, 2, 3].map((i) => (
          <div
            key={i}
            className="h-72 rounded-2xl border border-white/10 bg-white/3 p-6 flex flex-col justify-between"
          >
            <div className="space-y-3">
              <div className="h-4 w-20 bg-white/10 rounded" />
              <div className="h-6 w-3/4 bg-white/10 rounded-lg" />
              <div className="h-4 w-full bg-white/5 rounded" />
              <div className="h-4 w-2/3 bg-white/5 rounded" />
            </div>
            <div className="h-8 w-28 bg-purple-500/20 rounded-lg" />
          </div>
        ))}
      </div>
    </div>
  )
}