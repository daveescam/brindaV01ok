"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Heart, MessageCircle, Bookmark, Send, ImageIcon, User, MoreHorizontal } from "lucide-react"

interface InstagramDespechadoProps {
  prompt?: string
  demoMode?: boolean
}

export function InstagramDespechado({
  prompt = "Comparte tu historia de despecho",
  demoMode = false,
}: InstagramDespechadoProps) {
  const [caption, setCaption] = useState("")
  const [username, setUsername] = useState("usuario_despechado")
  const [likes, setLikes] = useState(0)
  const [isLiked, setIsLiked] = useState(false)
  const [isSaved, setIsSaved] = useState(false)
  const [imageSelected, setImageSelected] = useState(false)
  const [isPublished, setIsPublished] = useState(false)

  const handleLike = () => {
    if (isLiked) {
      setLikes(likes - 1)
    } else {
      setLikes(likes + 1)
    }
    setIsLiked(!isLiked)
  }

  const handleSave = () => {
    setIsSaved(!isSaved)
  }

  const handleSelectImage = () => {
    setImageSelected(true)
  }

  const handlePublish = () => {
    if (demoMode) {
      // En modo demo, simular likes aleatorios
      setLikes(Math.floor(Math.random() * 50) + 10)
    }
    setIsPublished(true)
  }

  return (
    <div className="flex flex-col bg-black rounded-lg overflow-hidden border border-gray-800">
      {/* Header */}
      <div className="flex items-center justify-between p-3 border-b border-gray-800">
        <div className="flex items-center">
          <div className="w-8 h-8 rounded-full bg-gradient-to-tr from-yellow-500 to-pink-600 flex items-center justify-center">
            <User className="h-4 w-4 text-white" />
          </div>
          <div className="ml-2">
            <span className="text-white text-sm font-medium">{username}</span>
          </div>
        </div>
        <MoreHorizontal className="h-5 w-5 text-white/70" />
      </div>

      {/* Image Area */}
      <div className="aspect-square bg-gray-900 flex items-center justify-center">
        {!imageSelected ? (
          <div className="text-center">
            <ImageIcon className="h-12 w-12 text-gray-600 mx-auto mb-2" />
            <Button onClick={handleSelectImage} variant="outline" className="border-gray-700 text-white">
              Seleccionar Imagen
            </Button>
          </div>
        ) : (
          <div className="w-full h-full bg-gradient-to-b from-gray-800 to-gray-900 flex items-center justify-center">
            {isPublished ? (
              <div className="text-center p-6">
                <p className="text-white/90 text-lg italic">"{caption}"</p>
                <p className="text-white/50 text-sm mt-2">- {username}</p>
              </div>
            ) : (
              <div className="text-white/50 text-sm">Vista previa de imagen</div>
            )}
          </div>
        )}
      </div>

      {/* Action Bar */}
      {isPublished ? (
        <div className="p-3 border-t border-gray-800">
          <div className="flex justify-between mb-2">
            <div className="flex space-x-4">
              <button onClick={handleLike} className="focus:outline-none">
                <Heart className={`h-6 w-6 ${isLiked ? "text-red-500 fill-red-500" : "text-white"}`} />
              </button>
              <button className="focus:outline-none">
                <MessageCircle className="h-6 w-6 text-white" />
              </button>
              <button className="focus:outline-none">
                <Send className="h-6 w-6 text-white" />
              </button>
            </div>
            <button onClick={handleSave} className="focus:outline-none">
              <Bookmark className={`h-6 w-6 ${isSaved ? "text-white fill-white" : "text-white"}`} />
            </button>
          </div>
          <div className="text-white text-sm font-medium">{likes} Me gusta</div>
          <div className="mt-1">
            <span className="text-white text-sm font-medium">{username}</span>
            <span className="text-white/90 text-sm ml-2">{caption}</span>
          </div>
          <div className="mt-1 text-gray-500 text-xs">Hace 1 minuto</div>
        </div>
      ) : (
        <div className="p-3 border-t border-gray-800">
          <div className="mb-3">
            <p className="text-white/70 text-sm mb-2">{prompt}</p>
            <Textarea
              value={caption}
              onChange={(e) => setCaption(e.target.value)}
              placeholder="Escribe tu historia de despecho..."
              className="bg-gray-900 border-gray-700 text-white resize-none"
              rows={4}
            />
          </div>
          <div className="mb-3">
            <Input
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              placeholder="Nombre de usuario"
              className="bg-gray-900 border-gray-700 text-white"
            />
          </div>
          <Button
            onClick={handlePublish}
            className="w-full bg-gradient-to-r from-yellow-500 to-pink-600 hover:opacity-90"
            disabled={!caption.trim() || !imageSelected}
          >
            Publicar
          </Button>
        </div>
      )}
    </div>
  )
}
