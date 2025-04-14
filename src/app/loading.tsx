import Nav from '@/components/nav'

export default function Loading() {
  return (
    <div style={{ backgroundColor: "#1f1f1f" }} className="min-h-screen">
      <Nav />
      <div className="container mx-auto px-4 py-12 flex flex-col items-center justify-center">
        <div className="flex flex-col items-center space-y-4">
          <div className="relative w-16 h-16">
            <div className="absolute top-0 left-0 w-full h-full rounded-full border-4 border-t-[#9333ea] border-r-[#00e5ff] border-b-[#9333ea] border-l-[#00e5ff] animate-spin"></div>
          </div>
          <p className="text-[#f0f0f0] text-lg">Loading...</p>
        </div>
      </div>
    </div>
  )
}
