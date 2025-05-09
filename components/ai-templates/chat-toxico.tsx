"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Send, User, Bot } from "lucide-react"

interface ChatToxicoProps {
  initialMessage?: string
  demoMode?: boolean
}

export function ChatToxico({ initialMessage = "Hola, ¿qué pasa?", demoMode = false }: ChatToxicoProps) {
  const [messages, setMessages] = useState([
    {
      role: "bot",
      content: initialMessage,
    },
  ])
  const [input, setInput] = useState("")
  const [isTyping, setIsTyping] = useState(false)

  const handleSendMessage = () => {
    if (!input.trim()) return

    // Añadir mensaje del usuario
    const newMessages = [...messages, { role: "user", content: input }]
    setMessages(newMessages)
    setInput("")
    setIsTyping(true)

    // Simular respuesta en modo demo
    if (demoMode) {
      setTimeout(() => {
        let response = ""

        // Respuestas predefinidas para el modo demo
        if (newMessages.length === 2) {
          response = "Jajaja, ¿en serio? Cuéntame más detalles, esto se pone interesante... 🍿"
        } else if (newMessages.length === 4) {
          response = "Nooooo, ¡qué vergüenza! 😂 Pero tranqui, a todos nos ha pasado algo así. ¿Y qué hiciste después?"
        } else {
          response =
            "Wow, esa historia merece entrar al salón de la fama de las borracheras épicas. ¡Tienes que contarla en el bar!"
        }

        setMessages([...newMessages, { role: "bot", content: response }])
        setIsTyping(false)
      }, 1500)
    }
  }

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") {
      handleSendMessage()
    }
  }

  return (
    <div className="flex flex-col h-[400px] bg-gray-900 rounded-lg overflow-hidden">
      <div className="bg-gray-800 p-3 border-b border-gray-700">
        <div className="flex items-center">
          <div className="w-3 h-3 rounded-full bg-red-500 mr-2"></div>
          <div className="w-3 h-3 rounded-full bg-yellow-500 mr-2"></div>
          <div className="w-3 h-3 rounded-full bg-green-500 mr-2"></div>
          <span className="text-white/80 text-sm ml-2">Chat Tóxico™</span>
        </div>
      </div>

      <div className="flex-1 overflow-y-auto p-4 space-y-4">
        {messages.map((message, index) => (
          <div key={index} className={`flex ${message.role === "user" ? "justify-end" : "justify-start"}`}>
            <div
              className={`max-w-[80%] rounded-lg p-3 ${
                message.role === "user" ? "bg-pink-500/80 text-white" : "bg-gray-700 text-white/90"
              }`}
            >
              <div className="flex items-center mb-1">
                {message.role === "user" ? (
                  <>
                    <span className="text-xs font-medium">Tú</span>
                    <User className="h-3 w-3 ml-1" />
                  </>
                ) : (
                  <>
                    <Bot className="h-3 w-3 mr-1" />
                    <span className="text-xs font-medium">Chat Tóxico</span>
                  </>
                )}
              </div>
              <p className="text-sm">{message.content}</p>
            </div>
          </div>
        ))}

        {isTyping && (
          <div className="flex justify-start">
            <div className="bg-gray-700 rounded-lg p-3 max-w-[80%]">
              <div className="flex items-center mb-1">
                <Bot className="h-3 w-3 mr-1" />
                <span className="text-xs font-medium text-white/90">Chat Tóxico</span>
              </div>
              <div className="flex space-x-1">
                <div className="w-2 h-2 bg-gray-500 rounded-full animate-bounce"></div>
                <div
                  className="w-2 h-2 bg-gray-500 rounded-full animate-bounce"
                  style={{ animationDelay: "0.2s" }}
                ></div>
                <div
                  className="w-2 h-2 bg-gray-500 rounded-full animate-bounce"
                  style={{ animationDelay: "0.4s" }}
                ></div>
              </div>
            </div>
          </div>
        )}
      </div>

      <div className="p-3 border-t border-gray-700">
        <div className="flex">
          <Input
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder="Escribe tu mensaje..."
            className="bg-gray-800 border-gray-700 text-white"
          />
          <Button
            onClick={handleSendMessage}
            className="ml-2 bg-pink-500 hover:bg-pink-600"
            disabled={!input.trim() || isTyping}
          >
            <Send className="h-4 w-4" />
          </Button>
        </div>
      </div>
    </div>
  )
}
