"use client"

import { useState } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Heart, MessageCircle, BookmarkPlus, Share2, Pause, RefreshCw, Music } from "lucide-react"
import { motion } from "framer-motion"

interface TikTokDespechoProps {
  caption?: string
  username?: string
  songName?: string
  userAvatar?: string
  videoUrl?: string
  onGenerate?: (caption: string, songName: string) => void
  onShare?: () => void
  prompt?: string
  onComplete?: (result: any) => void
  onCancel?: () => void
}

export function TikTokDespecho({
  caption = "POV: Tu ex viendo tus historias a las 3 AM después de ghostearte por 6 meses 🤡 #DespechoBrindaX",
  username = "@corazon_despechado",
  songName = "Amorfoda - Bad Bunny",
  userAvatar = "/placeholder.svg?height=40&width=40&text=CD",
  videoUrl = "/placeholder.svg?height=600&width=400&text=TikTok+Video",
  onGenerate,
  onShare,
  prompt,
  onComplete,
  onCancel,
}: TikTokDespechoProps) {
  const [tiktokCaption, setTiktokCaption] = useState(caption || prompt || "")
  const [tiktokSong, setTiktokSong] = useState(songName)
  const [isGenerating, setIsGenerating] = useState(false)
  const [likes, setLikes] = useState(15642)
  const [comments, setComments] = useState(342)
  const [isPlaying, setIsPlaying] = useState(true)
  const [hasLiked, setHasLiked] = useState(false)
  const [hasSaved, setHasSaved] = useState(false)

  const handleGenerate = () => {
    setIsGenerating(true)

    // Simulate generation delay
    setTimeout(() => {
      setIsGenerating(false)
      if (onGenerate) {
        onGenerate(tiktokCaption, tiktokSong)
      }

      // Si existe onComplete (para la integración con el sistema de desafíos)
      if (onComplete) {
        onComplete({
          caption: tiktokCaption,
          songName: tiktokSong,
          generated: true,
        })
      }
    }, 1000)
  }

  const handleShare = () => {
    if (onShare) {
      onShare()
    }

    // Si existe onComplete (para la integración con el sistema de desafíos)
    if (onComplete) {
      onComplete({
        caption: tiktokCaption,
        songName: tiktokSong,
        shared: true,
      })
    }
  }

  const handleLike = () => {
    setHasLiked(!hasLiked)
    setLikes(hasLiked ? likes - 1 : likes + 1)
  }

  const togglePlayback = () => {
    setIsPlaying(!isPlaying)
  }

  const handleCancel = () => {
    if (onCancel) {
      onCancel()
    }
  }

  return (
    <Card className="w-full max-w-md mx-auto overflow-hidden bg-black">
      <CardContent className="p-0">
        <div className="relative aspect-[9/16] bg-black">
          {/* Video simulation */}
          <div className="absolute inset-0">
            <img src={videoUrl || "/placeholder.svg"} alt="TikTok Video" className="w-full h-full object-cover" />
            {!isPlaying && (
              <div className="absolute inset-0 flex items-center justify-center bg-black/20">
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={togglePlayback}
                  className="h-16 w-16 rounded-full bg-white/30 text-white"
                >
                  <Pause className="h-8 w-8" />
                </Button>
              </div>
            )}
          </div>

          {/* Right side icons */}
          <div className="absolute right-3 bottom-24 flex flex-col items-center gap-4">
            <div className="flex flex-col items-center">
              <Button variant="ghost" size="icon" onClick={handleLike} className="h-12 w-12 rounded-full text-white">
                <Heart className={`h-7 w-7 ${hasLiked ? "fill-red-500 text-red-500" : ""}`} />
              </Button>
              <span className="text-xs text-white">{likes.toLocaleString()}</span>
            </div>

            <div className="flex flex-col items-center">
              <Button variant="ghost" size="icon" className="h-12 w-12 rounded-full text-white">
                <MessageCircle className="h-7 w-7" />
              </Button>
              <span className="text-xs text-white">{comments.toLocaleString()}</span>
            </div>

            <div className="flex flex-col items-center">
              <Button
                variant="ghost"
                size="icon"
                className="h-12 w-12 rounded-full text-white"
                onClick={() => setHasSaved(!hasSaved)}
              >
                <BookmarkPlus className={`h-7 w-7 ${hasSaved ? "fill-white" : ""}`} />
              </Button>
              <span className="text-xs text-white">Guardar</span>
            </div>

            <div className="flex flex-col items-center">
              <Button variant="ghost" size="icon" className="h-12 w-12 rounded-full text-white" onClick={handleShare}>
                <Share2 className="h-7 w-7" />
              </Button>
              <span className="text-xs text-white">Compartir</span>
            </div>
          </div>

          {/* Bottom Info */}
          <div className="absolute bottom-0 left-0 right-12 p-3 bg-gradient-to-t from-black/80 to-transparent">
            <div className="flex items-center gap-2 mb-2">
              <Avatar className="h-9 w-9 border-2 border-white">
                <AvatarImage src={userAvatar || "/placeholder.svg"} alt={username} />
                <AvatarFallback>{username?.[1] || "U"}</AvatarFallback>
              </Avatar>
              <span className="text-sm font-semibold text-white">{username}</span>
              <Button
                variant="outline"
                size="sm"
                className="ml-auto h-7 text-xs border-white text-white hover:bg-white/20"
              >
                Seguir
              </Button>
            </div>

            <p className="text-sm text-white mb-2">{tiktokCaption}</p>

            <div className="flex items-center gap-2 bg-black/40 rounded-full py-1 px-2 w-fit">
              <Music className="h-3 w-3 text-white" />
              <div className="text-xs text-white overflow-hidden whitespace-nowrap max-w-[150px]">
                <motion.span
                  animate={tiktokSong.length > 15 ? { x: [0, -100, 0] } : {}}
                  transition={{ repeat: Number.POSITIVE_INFINITY, duration: 5 }}
                  className="inline-block"
                >
                  {tiktokSong}
                </motion.span>
              </div>
            </div>
          </div>
        </div>

        {/* Form para editar */}
        <div className="p-4 bg-white border-t">
          <div className="space-y-3">
            <div>
              <label htmlFor="caption" className="block text-sm font-medium text-gray-700 mb-1">
                Texto del TikTok
              </label>
              <Input
                id="caption"
                value={tiktokCaption}
                onChange={(e) => setTiktokCaption(e.target.value)}
                placeholder="Caption del TikTok"
              />
            </div>

            <div>
              <label htmlFor="song" className="block text-sm font-medium text-gray-700 mb-1">
                Canción
              </label>
              <Input
                id="song"
                value={tiktokSong}
                onChange={(e) => setTiktokSong(e.target.value)}
                placeholder="Nombre de la canción"
              />
            </div>

            <div className="flex gap-2">
              <Button
                onClick={handleGenerate}
                className="flex-1 bg-gradient-to-r from-pink-500 to-purple-500 text-white"
                disabled={isGenerating}
              >
                {isGenerating ? (
                  <>
                    <RefreshCw className="mr-2 h-4 w-4 animate-spin" />
                    Generando...
                  </>
                ) : (
                  "Generar TikTok"
                )}
              </Button>

              {onCancel && (
                <Button variant="outline" onClick={handleCancel}>
                  Cancelar
                </Button>
              )}
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
