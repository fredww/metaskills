import Link from "next/link"
import { Button } from "@/components/ui/button"

export default function UnauthorizedPage() {
  return (
    <div className="min-h-screen bg-[#FDFBF7] py-12 px-4">
      <div className="max-w-2xl mx-auto text-center">
        <div className="text-6xl mb-6">🔒</div>
        <h1 className="text-4xl font-serif font-bold text-[#2D2D2D] mb-4">
          Access Denied
        </h1>
        <p className="text-xl text-gray-600 mb-2">
          You don't have permission to access this page.
        </p>
        <p className="text-gray-600 mb-8">
          This area is restricted to administrators only.
        </p>

        <div className="flex gap-4 justify-center">
          <Button
            asChild
            className="bg-[#8DA399] hover:bg-[#6B8379] text-white"
          >
            <Link href="/">Go Home</Link>
          </Button>
          <Button
            asChild
            variant="outline"
            className="border-[#8DA399] text-[#8DA399] hover:bg-[#F3EFE9]"
          >
            <Link href="/dashboard">Dashboard</Link>
          </Button>
        </div>

        <div className="mt-12 p-6 bg-[#F3EFE9] rounded-lg">
          <h2 className="text-lg font-semibold text-[#2D2D2D] mb-3">
            Why am I seeing this?
          </h2>
          <p className="text-sm text-gray-700 mb-2">
            This page requires administrator privileges. If you believe this is an error,
            please contact the site administrator.
          </p>
          <p className="text-sm text-gray-700">
            <strong>Admin users:</strong> You can manage user roles from the admin dashboard.
          </p>
        </div>
      </div>
    </div>
  )
}
