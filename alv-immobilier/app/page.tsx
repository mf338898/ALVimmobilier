"use client"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import Link from "next/link"
import Image from "next/image"

export default function HomePage() {
  return (
    <div className="min-h-screen bg-white">
      <div className="container mx-auto px-4 py-8 max-w-2xl">
        {/* Header avec logo ALV */}
        <div className="text-center mb-12">
          <div className="mb-6 flex justify-center">
            <Image
              src="/images/logo.png"
              alt="ALV Immobilier Pleyben"
              width={300}
              height={120}
              className="h-auto"
              priority
            />
          </div>
        </div>

        {/* Carte principale */}
        <Card className="border-0 shadow-lg">
          <CardHeader className="text-center pb-6">
            <CardTitle className="text-2xl text-alv-blue">Fiche de renseignement location</CardTitle>
            <CardDescription className="text-base text-slate-600 leading-relaxed">
              Merci de compléter cette fiche pour organiser la visite de votre futur logement. Le processus prend
              environ 5 minutes.
            </CardDescription>
          </CardHeader>
          <CardContent className="pt-0">
            <div className="space-y-6">
              <div className="bg-slate-50 p-4 rounded-lg">
                <h3 className="font-semibold text-alv-blue mb-2">Ce formulaire permet de :</h3>
                <ul className="text-sm text-slate-600 space-y-1">
                  <li>• Renseigner vos informations personnelles</li>
                  <li>• Ajouter des co-locataires si nécessaire</li>
                  <li>• Générer automatiquement votre dossier PDF</li>
                  <li>• L'envoyer directement à notre agence</li>
                </ul>
              </div>

              <Link href="/formulaire" className="block">
                <Button className="w-full h-12 text-lg bg-alv-blue hover:bg-alv-blue/90">Commencer la fiche</Button>
              </Link>
            </div>
          </CardContent>
        </Card>

        {/* Footer */}
        <div className="text-center mt-12 text-xs text-slate-400">
          <p>Vos données sont traitées de manière confidentielle</p>
        </div>
      </div>
    </div>
  )
}
