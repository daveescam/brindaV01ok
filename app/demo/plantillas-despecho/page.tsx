"use client"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { ChatToxico } from "@/components/ai-templates/chat-toxico"
import { InstagramDespechado } from "@/components/ai-templates/instagram-despechado"
import { MemeDespecho } from "@/components/ai-templates/meme-despecho"
import { RevistaDrama } from "@/components/ai-templates/revista-drama"
import { TikTokDespecho } from "@/components/ai-templates/tiktok-despecho"
import { PerfilCitas } from "@/components/ai-templates/perfil-citas"
import { NotificacionRedFlag } from "@/components/ai-templates/notificacion-redflag"
import { useToast } from "@/hooks/use-toast"

export default function PlantillasDespechoDemo() {
  const { toast } = useToast()

  const handleAction = (action: string, template: string) => {
    toast({
      title: "Acción realizada",
      description: `${action} exitosamente en la plantilla ${template}`,
    })
  }

  return (
    <div className="container mx-auto py-8">
      <h1 className="text-4xl font-bold mb-2 text-center">Demo Plantillas Despecho</h1>
      <p className="text-center text-gray-500 mb-8">Explora las diferentes plantillas para la Lotería del Despecho</p>

      <Tabs defaultValue="chat">
        <TabsList className="grid grid-cols-3 md:grid-cols-7 mb-8">
          <TabsTrigger value="chat">Chat</TabsTrigger>
          <TabsTrigger value="instagram">Instagram</TabsTrigger>
          <TabsTrigger value="meme">Meme</TabsTrigger>
          <TabsTrigger value="revista">Revista</TabsTrigger>
          <TabsTrigger value="tiktok">TikTok</TabsTrigger>
          <TabsTrigger value="citas">App Citas</TabsTrigger>
          <TabsTrigger value="redflag">Red Flag</TabsTrigger>
        </TabsList>

        <TabsContent value="chat" className="flex justify-center">
          <ChatToxico onSendMessage={(msg) => handleAction("Mensaje enviado", "Chat Tóxico")} />
        </TabsContent>

        <TabsContent value="instagram" className="flex justify-center">
          <InstagramDespechado onAddComment={(comment) => handleAction("Comentario añadido", "Instagram Despechado")} />
        </TabsContent>

        <TabsContent value="meme" className="flex justify-center">
          <MemeDespecho
            onGenerate={(top, bottom) => handleAction("Meme generado", "Meme Despecho")}
            onShare={() => handleAction("Meme compartido", "Meme Despecho")}
          />
        </TabsContent>

        <TabsContent value="revista" className="flex justify-center">
          <RevistaDrama
            onGenerate={(headline, subheadline) => handleAction("Revista generada", "Revista Drama")}
            onShare={() => handleAction("Revista compartida", "Revista Drama")}
          />
        </TabsContent>

        <TabsContent value="tiktok" className="flex justify-center">
          <TikTokDespecho
            onGenerate={(caption, song) => handleAction("TikTok generado", "TikTok Despecho")}
            onShare={() => handleAction("TikTok compartido", "TikTok Despecho")}
          />
        </TabsContent>

        <TabsContent value="citas" className="flex justify-center">
          <PerfilCitas
            onGenerate={(bio) => handleAction("Bio generada", "Perfil Citas")}
            onShare={() => handleAction("Perfil compartido", "Perfil Citas")}
          />
        </TabsContent>

        <TabsContent value="redflag" className="flex justify-center">
          <NotificacionRedFlag
            onGenerate={(title, message) => handleAction("Alerta generada", "Red Flag")}
            onShare={() => handleAction("Alerta compartida", "Red Flag")}
          />
        </TabsContent>
      </Tabs>
    </div>
  )
}
