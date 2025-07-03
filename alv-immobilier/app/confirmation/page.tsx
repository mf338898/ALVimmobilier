import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { CheckCircle } from "lucide-react"
import Link from "next/link"
import Image from "next/image"

export default function ConfirmationPage() {
  return (
    <div className="min-h-screen bg-white">
      <div className="container mx-auto px-4 py-8 max-w-2xl">
        <div className="text-center mb-8">
          <div className="mb-4 flex justify-center">
            <Image
              src="/images/logo.png"
              alt="ALV Immobilier Pleyben"
              width={240}
              height={100}
              className="h-auto"
              priority
            />
          </div>
        </div>

        <Card className="border-0 shadow-lg">
          <CardHeader className="text-center pb-6">
            <div className="mx-auto mb-4 w-16 h-16 bg-green-100 rounded-full flex items-center justify-center">
              <CheckCircle className="h-8 w-8 text-green-600" />
            </div>
            <CardTitle className="text-2xl text-alv-green">Fiche envoyée avec succès !</CardTitle>
          </CardHeader>
          <CardContent className="text-center space-y-6">
            <div className="bg-green-50 p-4 rounded-lg">
              <p className="text-green-800 font-medium mb-2">Votre dossier a bien été transmis à notre agence</p>
              <p className="text-sm text-green-700">
                Un PDF de votre fiche de renseignement a été automatiquement généré et envoyé à{" "}
                <strong>contact@alvimmobilier.bzh</strong>
              </p>
            </div>

            <div className="space-y-3 text-sm text-slate-600">
              <p>
                <strong>Prochaines étapes :</strong>
              </p>
              <ul className="text-left space-y-1 max-w-md mx-auto">
                <li>• Notre équipe va examiner votre dossier</li>
                <li>• Vous serez contacté sous 24-48h pour organiser la visite</li>
                <li>• En cas de questions, n'hésitez pas à nous appeler</li>
              </ul>
            </div>

            <div className="bg-slate-50 p-4 rounded-lg">
              <p className="text-sm text-slate-700">
                <strong>Contact :</strong>
                <br />📧 contact@alvimmobilier.bzh
                <br />📞 02 XX XX XX XX
              </p>
            </div>

            <Link href="/">
              <Button
                variant="outline"
                className="mt-6 border-alv-blue text-alv-blue hover:bg-alv-blue/10 bg-transparent"
              >
                Retour à l'accueil
              </Button>
            </Link>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
