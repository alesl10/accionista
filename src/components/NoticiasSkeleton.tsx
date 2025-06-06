// components/NoticiasSkeleton.tsx
export default function NoticiasSkeleton() {
    return (
      <div className="animate-pulse space-y-6">
        {[...Array(3)].map((_, idx) => (
          <div key={idx} className="space-y-3">
            <div className="h-6 bg-gray-300 rounded w-2/3" />
            <div className="h-4 bg-gray-200 rounded w-full" />
            <div className="h-4 bg-gray-200 rounded w-5/6" />
            <div className="h-4 bg-gray-200 rounded w-3/4" />
            <div className="h-4 bg-gray-100 rounded w-4/5" />
          </div>
        ))}
      </div>
    );
  }