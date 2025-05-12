// components/service-integration.tsx
"use client"

import { useState } from "react"
import challengeService from "@/lib/services/challenge-service"
import rewardService from "@/lib/services/reward-service"
import vaultService from "@/lib/services/vault-service"
import analyticsService from "@/lib/services/analytics-service"
import copyService from "@/lib/services/copy-service"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

const ServiceIntegration = () => {
  const [challenge, setChallenge] = useState<any | null>(null)
  const [reward, setReward] = useState<any | null>(null)
  const [generatedCopy, setGeneratedCopy] = useState<string | null>(null)

  const handleChallenge = () => {
    const newChallenge = challengeService.generateChallenge()
    setChallenge(newChallenge)
  }

  const handleReward = () => {
    const newReward = rewardService.getRewardById("1")
    setReward(newReward)
  }

  const handleCopy = () => {
    const newCopy = copyService.generateCopy("template", { name: "Test" })
    setGeneratedCopy(newCopy)
  }

  const trackEvent = () => {
    analyticsService.trackEvent({ type: "test", data: {} })
  }

  const vaultItem = vaultService.getItemById("1")

  return (
    <Card>
      <CardHeader>
        <CardTitle>Service Integration</CardTitle>
      </CardHeader>
      <CardContent>
        <Button onClick={handleChallenge}>Generate Challenge</Button>
        {challenge && (
          <div className="mt-4">
            <p>Challenge: {challenge.name}</p>
          </div>
        )}

        <Button onClick={handleReward}>Get Reward</Button>
        {reward && (
          <div className="mt-4">
            <p>Reward: {reward.name}</p>
          </div>
        )}

        <Button onClick={handleCopy}>Generate Copy</Button>
        {generatedCopy && (
          <div className="mt-4">
            <p>Generated Copy: {generatedCopy}</p>
          </div>
        )}

        <Button onClick={trackEvent}>Track Event</Button>
        <div className="mt-4">
          <p>Vault Item: {vaultItem ? vaultItem.name : "No item"}</p>
        </div>
      </CardContent>
    </Card>
  )
}

export default ServiceIntegration
