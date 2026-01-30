import Link from "next/link"

export function Footer() {
  return (
    <footer className="w-full border-t border-border/40 bg-background">
      <div className="container max-w-7xl mx-auto px-6 lg:px-8 py-12 md:py-16">
        <div className="grid grid-cols-1 gap-8 md:grid-cols-4">
          {/* Brand */}
          <div className="space-y-4">
            <div className="flex items-center space-x-3">
              {/* Logo Icon */}
              <svg
                width="48"
                height="48"
                viewBox="0 0 48 48"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                className="w-10 h-10"
              >
                <defs>
                  <linearGradient id="footerIconGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                    <stop offset="0%" style={{stopColor: "#8DA399", stopOpacity: 1}} />
                    <stop offset="100%" style={{stopColor: "#C7826B", stopOpacity: 1}} />
                  </linearGradient>
                </defs>

                {/* Outer hexagon */}
                <path
                  d="M24 4.8 L41.57 14.4 L41.57 33.6 L24 43.2 L6.43 33.6 L6.43 14.4 Z"
                  stroke="url(#footerIconGrad)"
                  strokeWidth="1.5"
                  fill="none"
                  opacity="0.3"
                />
                {/* Middle hexagon */}
                <path
                  d="M24 9.6 L36.85 17.2 L36.85 31.8 L24 39.4 L11.15 31.8 L11.15 17.2 Z"
                  stroke="url(#footerIconGrad)"
                  strokeWidth="1.5"
                  fill="none"
                  opacity="0.6"
                />
                {/* Inner hexagon - solid */}
                <path
                  d="M24 14.4 L32.12 19.2 L32.12 28.8 L24 33.6 L15.88 28.8 L15.88 19.2 Z"
                  fill="url(#footerIconGrad)"
                />
                {/* Center dot */}
                <circle cx="24" cy="24" r="2" fill="#FDFBF7" />
              </svg>

              {/* Brand Name */}
              <span className="text-xl font-bold font-serif tracking-tight text-[#2D2D2D]">
                MetaSkills<span className="text-[#C7826B]">.ai</span>
              </span>
            </div>
            <p className="text-sm text-muted-foreground">
              Learn abilities that never expire. Build a foundation for lifelong growth.
            </p>
          </div>

          {/* Product */}
          <div className="space-y-4">
            <h3 className="text-sm font-semibold">Product</h3>
            <ul className="space-y-2 text-sm">
              <li>
                <Link
                  href="/assessment"
                  className="text-muted-foreground transition-colors hover:text-foreground"
                >
                  Assessment
                </Link>
              </li>
              <li>
                <Link
                  href="/skills"
                  className="text-muted-foreground transition-colors hover:text-foreground"
                >
                  Meta-Skills
                </Link>
              </li>
              <li>
                <Link
                  href="/practices"
                  className="text-muted-foreground transition-colors hover:text-foreground"
                >
                  Practices
                </Link>
              </li>
              <li>
                <Link
                  href="/pricing"
                  className="text-muted-foreground transition-colors hover:text-foreground"
                >
                  Pricing
                </Link>
              </li>
            </ul>
          </div>

          {/* Company */}
          <div className="space-y-4">
            <h3 className="text-sm font-semibold">Company</h3>
            <ul className="space-y-2 text-sm">
              <li>
                <Link
                  href="/about"
                  className="text-muted-foreground transition-colors hover:text-foreground"
                >
                  About
                </Link>
              </li>
              <li>
                <Link
                  href="/blog"
                  className="text-muted-foreground transition-colors hover:text-foreground"
                >
                  Blog
                </Link>
              </li>
              <li>
                <Link
                  href="/contact"
                  className="text-muted-foreground transition-colors hover:text-foreground"
                >
                  Contact
                </Link>
              </li>
            </ul>
          </div>

          {/* Legal */}
          <div className="space-y-4">
            <h3 className="text-sm font-semibold">Legal</h3>
            <ul className="space-y-2 text-sm">
              <li>
                <Link
                  href="/privacy"
                  className="text-muted-foreground transition-colors hover:text-foreground"
                >
                  Privacy
                </Link>
              </li>
              <li>
                <Link
                  href="/terms"
                  className="text-muted-foreground transition-colors hover:text-foreground"
                >
                  Terms
                </Link>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-12 border-t border-border/40 pt-8 text-center text-sm text-muted-foreground">
          <p>© {new Date().getFullYear()} MetaSkills.ai. All rights reserved.</p>
        </div>
      </div>
    </footer>
  )
}
