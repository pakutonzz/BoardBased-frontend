import React from 'react'
import { useParams, Link } from 'react-router-dom'
import { CONFIG } from '@/lib/config'

type Game = {
  id: number
  name: string
  imageUrl?: string
  averageRating?: string | number
}

function StarIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true" {...props}>
      <path d="M12 17.27 18.18 21l-1.64-7.03L22 9.24l-7.19-.62L12 2 9.19 8.62 2 9.24l5.46 4.73L5.82 21 12 17.27z" fill="currentColor" />
    </svg>
  )
}

export default function CategoryResultsPage() {
  const { category = '' } = useParams<{ category: string }>()
  // Double decode: once for React Router, once for our encoding
  const decoded = decodeURIComponent(decodeURIComponent(category))

  const [items, setItems] = React.useState<Game[]>([])
  const [total, setTotal] = React.useState<number | null>(null)
  const [loading, setLoading] = React.useState(false)
  const [error, setError] = React.useState<string | null>(null)

  React.useEffect(() => {
    let abort = false
    async function run() {
      try {
        setLoading(true)
        setError(null)
        // pageSize=20, sort by id asc (stable), filtered by category
        const url = `${CONFIG.API_BASE}/board-games?pageSize=20&category=${encodeURIComponent(decoded)}&sort=id:asc`
        const res = await fetch(url)
        if (!res.ok) throw new Error(`HTTP ${res.status}`)
        const data = await res.json()
        if (!abort) {
          setItems(data?.rows ?? data ?? [])
          if (typeof data?.total === 'number') setTotal(data.total)
        }
      } catch (e: any) {
        if (!abort) setError(e?.message ?? 'Failed to load')
      } finally {
        if (!abort) setLoading(false)
      }
    }
    run()
    return () => { abort = true }
  }, [decoded])

  return (
    <section className="space-y-4">
      <div className="flex items-end justify-between">
        <div>
          <h2 className="h-section">{decoded || 'Category'}</h2>
          {total != null && (
            <p className="text-sm text-gray-400 mt-1">Showing {items.length} of {total} games</p>
          )}
        </div>
      </div>

      {error && <div className="card p-4 text-red-300">Error: {error}</div>}
      {loading && !items.length && <div className="card p-4 text-gray-300">Loading…</div>}

      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-5">
        {items.map((g, idx) => (
          <Link
            key={`${g.id}-${idx}`}
            to={`/detail/${g.id}`}
            className="card p-0 overflow-hidden relative bg-black/40"
          >
            <div className="relative mb-20">
              <img src={g.imageUrl} alt={g.name} className="aspect-[3/4] w-full object-cover" />
            </div>
            <div className="absolute top-[calc(90%-20px)] left-1 px-1">
              <div className="text-lg font-semibold line-clamp-2">{g.name}</div>
            </div>
            <div className="absolute bottom-1 right-1 flex items-center gap-1 flex-shrink-0">
              <StarIcon className="w-5 h-5 text-bb-orange" />
              <span className="text-base text-gray-300 font-medium">
                {(Number(g.averageRating) || 0).toFixed(1)}
              </span>
            </div>
          </Link>
        ))}
      </div>

      {!loading && !items.length && (
        <div className="card p-4 text-gray-300">No games found in “{decoded}”.</div>
      )}
    </section>
  )
}
