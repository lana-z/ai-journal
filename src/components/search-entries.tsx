import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"

export default function SearchEntries({ isMobile = false }: { isMobile?: boolean }) {
  return (
    <div className="space-y-4">
      <p className={`${isMobile ? "text-base" : "text-base md:text-lg"} mb-2 text-[#b3b3b3]`}>
        Search for journal entries that relate to specific topics or technologies such as{" "}
        <strong className="text-[#9333ea]">opensource</strong>,{" "}
        <strong className="text-[#00e5ff]">automation</strong>,{" "}
        <strong className="text-[#9333ea]">python</strong>,{" "}
        <strong className="text-[#00e5ff]">OpenAI</strong>,{" "}
        <strong className="text-[#9333ea]">Llama</strong>, etc.
      </p>
      <div className={`flex items-center ${isMobile ? "w-full" : "max-w-md"}`}>
        <Input
          type="text"
          placeholder="Search entries..."
          className={`rounded-none border-[#444444] bg-[#333333] ${
            isMobile ? "py-4 px-3" : "py-6 px-4"
          } text-[#f0f0f0] focus:border-[#9333ea]`}
        />
        <Button 
          className={`rounded-none bg-gradient-to-r from-[#9333ea] to-[#00e5ff] hover:from-[#8429d8] hover:to-[#00c4e0] text-[#f0f0f0] md:py-5 ${
            isMobile ? "px-4" : "px-6"
          }`}
        >
          Search
        </Button>
      </div>
    </div>
  )
}
