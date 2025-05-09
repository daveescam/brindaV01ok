import { Skeleton } from "@/components/ui/skeleton"
import { Sparkles } from "lucide-react"

export default function VenueAdminLoading() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-black to-purple-950 text-white">
      <header className="container mx-auto py-6 flex justify-between items-center">
        <div className="flex items-center gap-2">
          <Sparkles className="h-8 w-8 text-pink-500" />
          <h1 className="text-2xl font-bold bg-gradient-to-r from-pink-500 to-yellow-500 text-transparent bg-clip-text">
            Brinda X
          </h1>
        </div>
        <div className="flex items-center gap-4">
          <Skeleton className="h-10 w-32 bg-purple-500/20" />
          <Skeleton className="h-10 w-32 bg-purple-500/20" />
        </div>
      </header>

      <main className="container mx-auto py-12">
        <div className="max-w-6xl mx-auto">
          <div className="flex items-center justify-between mb-8">
            <Skeleton className="h-8 w-64 bg-purple-500/20" />
            <Skeleton className="h-8 w-40 bg-purple-500/20" />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
            <Skeleton className="h-32 w-full bg-purple-500/20 rounded-lg" />
            <Skeleton className="h-32 w-full bg-purple-500/20 rounded-lg" />
            <Skeleton className="h-32 w-full bg-purple-500/20 rounded-lg" />
          </div>

          <div className="mb-8">
            <Skeleton className="h-8 w-48 bg-purple-500/20 mb-4" />
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <Skeleton className="h-64 w-full bg-purple-500/20 rounded-lg" />
              <Skeleton className="h-64 w-full bg-purple-500/20 rounded-lg" />
            </div>
          </div>

          <div>
            <Skeleton className="h-8 w-48 bg-purple-500/20 mb-4" />
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <Skeleton className="h-48 w-full bg-purple-500/20 rounded-lg" />
              <Skeleton className="h-48 w-full bg-purple-500/20 rounded-lg" />
              <Skeleton className="h-48 w-full bg-purple-500/20 rounded-lg" />
            </div>
          </div>
        </div>
      </main>
    </div>
  )
}
