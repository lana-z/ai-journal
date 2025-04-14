import Nav from '@/components/nav'

export default function AboutLoading() {
  return (
    <div style={{ backgroundColor: "#1f1f1f" }} className="min-h-screen">
      <Nav />
      <div className="container mx-auto px-4 py-12">
        <div className="flex items-center justify-center">
          <h1 className="text-3xl font-bold mb-12 text-[#f0f0f0]">About Me</h1>
        </div>

        <div className="max-w-2xl mx-auto flex flex-col items-center">
          <div className="relative w-12 h-12 mb-4">
            <div className="absolute top-0 left-0 w-full h-full rounded-full border-4 border-t-[#9333ea] border-r-[#00e5ff] border-b-[#9333ea] border-l-[#00e5ff] animate-spin"></div>
          </div>
          <p className="text-[#b3b3b3]">Loading...</p>
        </div>
      </div>
    </div>
  )
}
