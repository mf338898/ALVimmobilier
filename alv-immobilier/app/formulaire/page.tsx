"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Textarea } from "@/components/ui/textarea"
import { Progress } from "@/components/ui/progress"
import { ArrowLeft, ArrowRight, Plus, Trash2 } from "lucide-react"
import { useRouter } from "next/navigation"
import Image from "next/image"

interface Locataire {
  nom: string
  prenom: string
  situationConjugale: string
  adresseActuelle: string
  telephone: string
  email: string
  dateNaissance: string
  lieuNaissance: string
  nombreEnfants: string
  profession: string
  employeurNom: string
  employeurAdresse: string
  employeurTelephone: string
  dateEmbauche: string
  typeContrat: string
  salaire: string
  autresRevenus: string
  totalRevenus: string
}

const locataireVide: Locataire = {
  nom: "",
  prenom: "",
  situationConjugale: "",
  adresseActuelle: "",
  telephone: "",
  email: "",
  dateNaissance: "",
  lieuNaissance: "",
  nombreEnfants: "",
  profession: "",
  employeurNom: "",
  employeurAdresse: "",
  employeurTelephone: "",
  dateEmbauche: "",
  typeContrat: "",
  salaire: "",
  autresRevenus: "",
  totalRevenus: "",
}

export default function FormulairePage() {
  const router = useRouter()
  const [etape, setEtape] = useState(1)
  const [bienConcerne, setBienConcerne] = useState("")
  const [dateEmmenagement, setDateEmmenagement] = useState("")
  const [locataires, setLocataires] = useState<Locataire[]>([{ ...locataireVide }])
  const [isSubmitting, setIsSubmitting] = useState(false)

  const ajouterLocataire = () => {
    if (locataires.length < 4) {
      setLocataires([...locataires, { ...locataireVide }])
    }
  }

  const supprimerLocataire = (index: number) => {
    if (locataires.length > 1) {
      setLocataires(locataires.filter((_, i) => i !== index))
    }
  }

  const updateLocataire = (index: number, field: keyof Locataire, value: string) => {
    const nouveauxLocataires = [...locataires]
    nouveauxLocataires[index][field] = value
    setLocataires(nouveauxLocataires)
  }

  const soumettreFormulaire = async () => {
    setIsSubmitting(true)
    try {
      const response = await fetch("/api/generer-pdf", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          bienConcerne,
          dateEmmenagement,
          locataires,
        }),
      })

      if (response.ok) {
        router.push("/confirmation")
      } else {
        alert("Erreur lors de l'envoi. Veuillez réessayer.")
      }
    } catch (error) {
      alert("Erreur lors de l'envoi. Veuillez réessayer.")
    } finally {
      setIsSubmitting(false)
    }
  }

  const progressValue = (etape / 4) * 100

  return (
    <div className="min-h-screen bg-white">
      <div className="container mx-auto px-4 py-8 max-w-4xl">
        {/* Header */}
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
          <Progress value={progressValue} className="w-full max-w-md mx-auto bg-gray-200" />
          <p className="text-sm text-slate-600 mt-2">Étape {etape} sur 4</p>
        </div>

        <Card className="border-0 shadow-lg">
          <CardHeader>
            <CardTitle className="text-xl">
              {etape === 1 && "Informations générales"}
              {etape === 2 && "Informations personnelles"}
              {etape === 3 && "Informations professionnelles"}
              {etape === 4 && "Récapitulatif"}
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            {/* Étape 1: Informations générales */}
            {etape === 1 && (
              <div className="space-y-6">
                <div>
                  <Label htmlFor="bien">Bien concerné</Label>
                  <Input
                    id="bien"
                    value={bienConcerne}
                    onChange={(e) => setBienConcerne(e.target.value)}
                    placeholder="Ex: Appartement T3 - 15 rue de la Paix, Brest"
                    className="mt-1"
                  />
                </div>

                <div>
                  <Label htmlFor="date-emmenagement">Date souhaitée d'emménagement</Label>
                  <Input
                    id="date-emmenagement"
                    type="date"
                    value={dateEmmenagement}
                    onChange={(e) => setDateEmmenagement(e.target.value)}
                    className="mt-1"
                  />
                </div>

                <div>
                  <Label>Nombre de locataires</Label>
                  <div className="flex items-center gap-4 mt-2">
                    <span className="text-sm text-slate-600">
                      {locataires.length} locataire{locataires.length > 1 ? "s" : ""}
                    </span>
                    {locataires.length < 4 && (
                      <Button
                        type="button"
                        variant="outline"
                        size="sm"
                        onClick={ajouterLocataire}
                        className="flex items-center gap-2 bg-transparent"
                      >
                        <Plus className="h-4 w-4" />
                        Ajouter un co-locataire
                      </Button>
                    )}
                  </div>
                </div>
              </div>
            )}

            {/* Étape 2: Informations personnelles */}
            {etape === 2 && (
              <div className="space-y-8">
                {locataires.map((locataire, index) => (
                  <div key={index} className="border rounded-lg p-6 relative">
                    <div className="flex items-center justify-between mb-4">
                      <h3 className="text-lg font-semibold">Locataire {index + 1}</h3>
                      {locataires.length > 1 && (
                        <Button
                          type="button"
                          variant="ghost"
                          size="sm"
                          onClick={() => supprimerLocataire(index)}
                          className="text-red-600 hover:text-red-700"
                        >
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      )}
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <Label>Nom *</Label>
                        <Input
                          value={locataire.nom}
                          onChange={(e) => updateLocataire(index, "nom", e.target.value)}
                          className="mt-1"
                        />
                      </div>
                      <div>
                        <Label>Prénom *</Label>
                        <Input
                          value={locataire.prenom}
                          onChange={(e) => updateLocataire(index, "prenom", e.target.value)}
                          className="mt-1"
                        />
                      </div>
                      <div>
                        <Label>Situation conjugale</Label>
                        <Select
                          value={locataire.situationConjugale}
                          onValueChange={(value) => updateLocataire(index, "situationConjugale", value)}
                        >
                          <SelectTrigger className="mt-1">
                            <SelectValue placeholder="Sélectionner" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="celibataire">Célibataire</SelectItem>
                            <SelectItem value="marie">Marié(e)</SelectItem>
                            <SelectItem value="pacs">Pacsé(e)</SelectItem>
                            <SelectItem value="concubinage">Concubinage</SelectItem>
                            <SelectItem value="divorce">Divorcé(e)</SelectItem>
                            <SelectItem value="veuf">Veuf/Veuve</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                      <div>
                        <Label>Nombre d'enfants</Label>
                        <Input
                          type="number"
                          min="0"
                          value={locataire.nombreEnfants}
                          onChange={(e) => updateLocataire(index, "nombreEnfants", e.target.value)}
                          className="mt-1"
                        />
                      </div>
                      <div>
                        <Label>Téléphone *</Label>
                        <Input
                          type="tel"
                          value={locataire.telephone}
                          onChange={(e) => updateLocataire(index, "telephone", e.target.value)}
                          className="mt-1"
                        />
                      </div>
                      <div>
                        <Label>Email *</Label>
                        <Input
                          type="email"
                          value={locataire.email}
                          onChange={(e) => updateLocataire(index, "email", e.target.value)}
                          className="mt-1"
                        />
                      </div>
                      <div>
                        <Label>Date de naissance</Label>
                        <Input
                          type="date"
                          value={locataire.dateNaissance}
                          onChange={(e) => updateLocataire(index, "dateNaissance", e.target.value)}
                          className="mt-1"
                        />
                      </div>
                      <div>
                        <Label>Lieu de naissance</Label>
                        <Input
                          value={locataire.lieuNaissance}
                          onChange={(e) => updateLocataire(index, "lieuNaissance", e.target.value)}
                          className="mt-1"
                        />
                      </div>
                      <div className="md:col-span-2">
                        <Label>Adresse actuelle *</Label>
                        <Textarea
                          value={locataire.adresseActuelle}
                          onChange={(e) => updateLocataire(index, "adresseActuelle", e.target.value)}
                          className="mt-1"
                          rows={2}
                        />
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}

            {/* Étape 3: Informations professionnelles */}
            {etape === 3 && (
              <div className="space-y-8">
                {locataires.map((locataire, index) => (
                  <div key={index} className="border rounded-lg p-6">
                    <h3 className="text-lg font-semibold mb-4">
                      Informations professionnelles -{" "}
                      {locataire.prenom && locataire.nom
                        ? `${locataire.prenom} ${locataire.nom}`
                        : `Locataire ${index + 1}`}
                    </h3>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <Label>Profession *</Label>
                        <Input
                          value={locataire.profession}
                          onChange={(e) => updateLocataire(index, "profession", e.target.value)}
                          className="mt-1"
                        />
                      </div>
                      <div>
                        <Label>Type de contrat</Label>
                        <Select
                          value={locataire.typeContrat}
                          onValueChange={(value) => updateLocataire(index, "typeContrat", value)}
                        >
                          <SelectTrigger className="mt-1">
                            <SelectValue placeholder="Sélectionner" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="cdi">CDI</SelectItem>
                            <SelectItem value="cdd">CDD</SelectItem>
                            <SelectItem value="interim">Intérim</SelectItem>
                            <SelectItem value="freelance">Freelance</SelectItem>
                            <SelectItem value="fonctionnaire">Fonctionnaire</SelectItem>
                            <SelectItem value="retraite">Retraité</SelectItem>
                            <SelectItem value="etudiant">Étudiant</SelectItem>
                            <SelectItem value="chomage">Demandeur d'emploi</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                      <div>
                        <Label>Date d'embauche</Label>
                        <Input
                          type="date"
                          value={locataire.dateEmbauche}
                          onChange={(e) => updateLocataire(index, "dateEmbauche", e.target.value)}
                          className="mt-1"
                        />
                      </div>
                      <div>
                        <Label>Salaire net mensuel (€)</Label>
                        <Input
                          type="number"
                          value={locataire.salaire}
                          onChange={(e) => updateLocataire(index, "salaire", e.target.value)}
                          className="mt-1"
                        />
                      </div>
                      <div className="md:col-span-2">
                        <Label>Nom de l'employeur</Label>
                        <Input
                          value={locataire.employeurNom}
                          onChange={(e) => updateLocataire(index, "employeurNom", e.target.value)}
                          className="mt-1"
                        />
                      </div>
                      <div className="md:col-span-2">
                        <Label>Adresse de l'employeur</Label>
                        <Textarea
                          value={locataire.employeurAdresse}
                          onChange={(e) => updateLocataire(index, "employeurAdresse", e.target.value)}
                          className="mt-1"
                          rows={2}
                        />
                      </div>
                      <div>
                        <Label>Téléphone employeur</Label>
                        <Input
                          type="tel"
                          value={locataire.employeurTelephone}
                          onChange={(e) => updateLocataire(index, "employeurTelephone", e.target.value)}
                          className="mt-1"
                        />
                      </div>
                      <div>
                        <Label>Autres revenus (€)</Label>
                        <Input
                          type="number"
                          value={locataire.autresRevenus}
                          onChange={(e) => updateLocataire(index, "autresRevenus", e.target.value)}
                          placeholder="Pensions, allocations..."
                          className="mt-1"
                        />
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}

            {/* Étape 4: Récapitulatif */}
            {etape === 4 && (
              <div className="space-y-6">
                <div className="bg-slate-50 p-4 rounded-lg">
                  <h3 className="font-semibold mb-2">Bien concerné</h3>
                  <p className="text-slate-700">{bienConcerne}</p>
                  <p className="text-sm text-slate-600 mt-1">Date d'emménagement souhaitée : {dateEmmenagement}</p>
                </div>

                {locataires.map((locataire, index) => (
                  <div key={index} className="bg-slate-50 p-4 rounded-lg">
                    <h3 className="font-semibold mb-2">
                      Locataire {index + 1}: {locataire.prenom} {locataire.nom}
                    </h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-2 text-sm">
                      <p>
                        <span className="font-medium">Email:</span> {locataire.email}
                      </p>
                      <p>
                        <span className="font-medium">Téléphone:</span> {locataire.telephone}
                      </p>
                      <p>
                        <span className="font-medium">Profession:</span> {locataire.profession}
                      </p>
                      <p>
                        <span className="font-medium">Salaire:</span> {locataire.salaire}€
                      </p>
                    </div>
                  </div>
                ))}

                <div className="bg-blue-50 p-4 rounded-lg border border-blue-200">
                  <p className="text-sm text-blue-800">
                    <strong>Validation :</strong> En cliquant sur "Envoyer", un PDF sera automatiquement généré et
                    envoyé à l'agence ALV Immobilier. Vous recevrez une confirmation par email.
                  </p>
                </div>
              </div>
            )}

            {/* Navigation */}
            <div className="flex justify-between pt-6 border-t">
              <Button
                type="button"
                variant="outline"
                onClick={() => setEtape(Math.max(1, etape - 1))}
                disabled={etape === 1}
                className="flex items-center gap-2"
              >
                <ArrowLeft className="h-4 w-4" />
                Précédent
              </Button>

              {etape < 4 ? (
                <Button
                  type="button"
                  onClick={() => setEtape(Math.min(4, etape + 1))}
                  className="flex items-center gap-2 bg-alv-blue hover:bg-alv-blue/90"
                >
                  Suivant
                  <ArrowRight className="h-4 w-4" />
                </Button>
              ) : (
                <Button
                  type="button"
                  onClick={soumettreFormulaire}
                  disabled={isSubmitting}
                  className="bg-alv-green hover:bg-alv-green/90"
                >
                  {isSubmitting ? "Envoi en cours..." : "Envoyer la fiche"}
                </Button>
              )}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
