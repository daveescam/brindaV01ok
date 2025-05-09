import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { type UnifiedCard, getCategoryDisplayName } from "@/lib/types/unified-card"
import { Wine, Heart, Briefcase, Mic, Camera, MessageSquare, Award, ThumbsUp } from "lucide-react"

interface CardDisplayProps {
  card: UnifiedCard
}

export default function CardDisplay({ card }: CardDisplayProps) {
  // Get the appropriate icon based on the challenge category
  const getCategoryIcon = () => {
    switch (card.challenge_category) {
      case "karaoke":
        return <Mic className="h-6 w-6 text-pink-500" />
      case "confesion":
        return <Heart className="h-6 w-6 text-red-500" />
      case "social":
        return <ThumbsUp className="h-6 w-6 text-blue-500" />
      case "visual":
        return <Camera className="h-6 w-6 text-purple-500" />
      case "roleplay":
        return <Briefcase className="h-6 w-6 text-amber-500" />
      default:
        return <Wine className="h-6 w-6 text-pink-500" />
    }
  }

  // Get the appropriate background gradient based on emotional tier
  const getEmotionalTierGradient = () => {
    switch (card.emotional_tier) {
      case "mild":
        return "from-purple-500/20 to-blue-500/20 border-purple-500/30"
      case "intense":
        return "from-pink-500/20 to-purple-500/20 border-pink-500/30"
      case "chaotic":
        return "from-red-500/20 to-orange-500/20 border-red-500/30"
      default:
        return "from-purple-500/20 to-blue-500/20 border-purple-500/30"
    }
  }

  // Get the appropriate reward icon
  const getRewardIcon = () => {
    switch (card.reward_type) {
      case "shot":
        return <Wine className="h-5 w-5 text-pink-500" />
      case "sticker":
        return <MessageSquare className="h-5 w-5 text-purple-500" />
      case "product":
        return <Award className="h-5 w-5 text-amber-500" />
      default:
        return <Award className="h-5 w-5 text-pink-500" />
    }
  }

  return (
    <Card className={`bg-gradient-to-br ${getEmotionalTierGradient()} backdrop-blur-sm border h-full flex flex-col`}>
      <CardContent className="p-6 flex-grow flex flex-col">
        <div className="flex items-center gap-3 mb-4">
          {getCategoryIcon()}
          <div>
            <h3 className="text-xl font-bold text-white">{card.card_title}</h3>
            <div className="flex gap-2 mt-1">
              <Badge variant="outline" className="bg-black/30 text-white border-white/20 text-xs">
                {getCategoryDisplayName(card.challenge_category)}
              </Badge>
              <Badge variant="outline" className="bg-black/30 text-white border-white/20 text-xs">
                {card.tone_subtype}
              </Badge>
            </div>
          </div>
        </div>

        <div className="bg-black/40 rounded-lg p-4 mb-6 flex-grow">
          <p className="text-white/90 text-lg">{card.challenge}</p>
        </div>

        <div className="mt-auto">
          <div className="flex items-center gap-2 mb-4">
            <Badge variant="outline" className="bg-pink-500/20 text-pink-300 border-pink-500/30">
              {card.emotional_tier === "mild" ? "Suave" : card.emotional_tier === "intense" ? "Intenso" : "Caótico"}
            </Badge>
            <Badge variant="outline" className="bg-purple-500/20 text-purple-300 border-purple-500/30">
              {card.interaction_format.replace("_", " ")}
            </Badge>
          </div>

          <div className="flex justify-between items-center">
            <div className="flex items-center gap-2">
              <div className="bg-black/40 p-2 rounded-full">{getRewardIcon()}</div>
              <div>
                <p className="text-xs text-white/60">Recompensa</p>
                <p className="text-sm text-white/90">
                  {typeof card.reward === "string" ? card.reward : card.reward.descripcion}
                </p>
              </div>
            </div>
            <div>
              <p className="text-xs text-white/60">Social Trigger</p>
              <p className="text-sm text-white/90">{card.social_trigger}</p>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
