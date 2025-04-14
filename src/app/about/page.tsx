import Link from "next/link"
import Nav from "@/components/nav"
import SocialLinks from "@/components/social-links"

export const metadata = {
  title: "About | Lana Zumbrunn - AI Journal",
  description: "Learn more about Lana Zumbrunn, her background, and her work with startups and AI tech.",
}

export default function AboutPage() {
  return (
    <div style={{ backgroundColor: "#1f1f1f" }} className="min-h-screen">
      <Nav />
      <div className="container mx-auto px-4 py-12">
        <div className="flex items-center justify-center">
          <h1 className="text-3xl font-bold mb-12 text-[#f0f0f0]">About Me</h1>
        </div>

        <div className="max-w-2xl mx-auto">
          <div className="flex flex-col space-y-6">
            <div>
              <p className="text-lg mb-4 text-[#f0f0f0]">
              Hi!
              </p>
              <p className="text-lg mb-4 text-[#f0f0f0]">
              Thanks for stopping by.
              </p>
              <p className="text-lg mb-4 text-[#f0f0f0]">
                I&apos;m Lana Zumbrunn, CEO of{" "}
                <Link href="#" className="text-[#00e5ff] hover:text-[#9333ea] transition-colors">
                  LevelUp Economy
                </Link>
                , a consultancy for startups, accelerators and studios.
              </p>

              <p className="text-lg mb-4 text-[#f0f0f0]">
                I&apos;m also the founder of{" "}
                <span className="text-[#9333ea] hover:text-[#00e5ff] transition-colors">Rooftop Global</span>
                , an emerging tech learning community for women.
              </p>

              <p className="text-lg mb-4 text-[#f0f0f0]">
                I&apos;ve been fortunate to work with over 250 startups and founders across the world in trad and web3 markets in multiple verticals.
              </p>

              <p className="text-lg mb-4 text-[#f0f0f0]">
                My technical chops came from tinkering in blockchain since 2017 and then pivoting my career by joining a six-month, immersive full stack software development bootcamp.
              </p>

              <p className="text-lg mb-4 text-[#f0f0f0]">
                And I&apos;ve gotten to serve some incredibly good purposes like founding {" "}
                <Link href="#" className="text-[#00e5ff] hover:text-[#9333ea] transition-colors">
                  Girls Code Lincoln {" "}
                </Link>
                <span className="text-lg">
                  and contributing at {" "}
                </span>
                <Link href="#" className="text-[#00e5ff] hover:text-[#9333ea] transition-colors">
                  Global Entrepreneurship Congress
                </Link>
                <span className="text-lg">
                  .
                </span>
              </p>
              <p className="text-lg mb-4 text-[#f0f0f0]">
              I believe in supporting founders holistically and making every effort to do work that innovates for good. I especially love working with women and minority founders to close the gender gap in tech adoption and VC funding.
              </p>
              <p className="text-lg mb-4 text-[#f0f0f0]">
              In this phase of my life, I am building with every new tech I can get my hands on. I am looking for curious minds to collaborate with and projects with audacious goals to take on.
              </p>
              <Link href="/" className="inline-block text-lg font-medium bg-gradient-to-r from-[#9333ea] to-[#00e5ff] bg-clip-text text-transparent hover:opacity-80 transition-opacity">
              –{" "}Lana 
            </Link>
            <SocialLinks />
            </div>
          </div>

          <div className="prose max-w-none bg-[#2a2a2a] p-8 rounded-xl border-gradient shadow-md mt-8">
            <h2 className="text-2xl font-bold mb-4 text-[#00e5ff]">Let&apos;s Partner to make an Impact</h2>
            <p className="text-[#b3b3b3] text-lg mb-6">
              View my resume {" "}
              <Link href="/resume" className="text-[#00e5ff] hover:text-[#9333ea] transition-colors">
                here, 
              </Link>
              <span> and reach out at </span>
              <Link href="mailto:lanazumbrunn@gmail.com" className="text-[#00e5ff] hover:text-[#9333ea] transition-colors">
                lana@levelupeconomy.com
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}
