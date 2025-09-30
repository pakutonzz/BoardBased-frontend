import { Outlet, Link } from 'react-router-dom'

export default function Shell() {
  return (
    <div className="min-h-dvh bg-gray-50 text-gray-900">
      {/* NAVBAR PLACEHOLDER — add your navbar here later */}
      <header className="border-b bg-white">
        <nav className="mx-auto max-w-6xl flex items-center gap-6 p-4">
          <Link to="/" className="font-semibold">BoardBased</Link>
          <span className="text-gray-400">/* Navbar goes here */</span>
        </nav>
      </header>
      <main className="mx-auto max-w-6xl p-6">
        <Outlet />
      </main>
    </div>
  )
}
