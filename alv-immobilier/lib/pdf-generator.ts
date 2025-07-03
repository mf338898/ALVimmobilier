import jsPDF from "jspdf"
import { format } from "date-fns"
import { fr } from "date-fns/locale"

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

interface FormData {
  bienConcerne: string
  dateEmmenagement: string
  locataires: Locataire[]
}

export function generatePDF(data: FormData): Uint8Array {
  const doc = new jsPDF()

  // Ajout du logo
  // Note: Dans une implémentation réelle, vous devriez charger le logo depuis une URL ou un fichier
  // doc.addImage(logoBase64, 'PNG', 10, 10, 60, 25)

  // Titre
  doc.setFontSize(20)
  doc.setTextColor(0, 68, 148) // Bleu ALV
  doc.text("FICHE DE RENSEIGNEMENT LOCATION", 105, 20, { align: "center" })

  // Date de création
  const dateCreation = format(new Date(), "dd MMMM yyyy", { locale: fr })
  doc.setFontSize(10)
  doc.setTextColor(100, 100, 100)
  doc.text(`Créé le ${dateCreation}`, 105, 30, { align: "center" })

  // Informations sur le bien
  doc.setFontSize(12)
  doc.setTextColor(0, 68, 148) // Bleu ALV
  doc.text("BIEN CONCERNÉ", 20, 45)

  doc.setTextColor(0, 0, 0)
  doc.setFontSize(11)
  doc.text(data.bienConcerne, 20, 55)

  doc.setFontSize(10)
  doc.text(`Date d'emménagement souhaitée: ${data.dateEmmenagement}`, 20, 65)

  // Ligne de séparation
  doc.setDrawColor(0, 166, 81) // Vert ALV
  doc.line(20, 70, 190, 70)

  // Informations sur les locataires
  let yPosition = 80

  data.locataires.forEach((locataire, index) => {
    // Vérifier si on a besoin d'une nouvelle page
    if (yPosition > 250) {
      doc.addPage()
      yPosition = 20
    }

    doc.setFontSize(12)
    doc.setTextColor(0, 68, 148) // Bleu ALV
    doc.text(`LOCATAIRE ${index + 1}`, 20, yPosition)
    yPosition += 10

    doc.setTextColor(0, 0, 0)
    doc.setFontSize(11)
    doc.text(`${locataire.prenom} ${locataire.nom}`, 20, yPosition)
    yPosition += 8

    // Informations personnelles
    doc.setFontSize(10)
    if (locataire.dateNaissance) {
      doc.text(`Né(e) le ${locataire.dateNaissance} à ${locataire.lieuNaissance || "Non précisé"}`, 20, yPosition)
      yPosition += 6
    }

    if (locataire.situationConjugale) {
      doc.text(`Situation: ${locataire.situationConjugale}`, 20, yPosition)
      yPosition += 6
    }

    if (locataire.adresseActuelle) {
      doc.text(`Adresse actuelle: ${locataire.adresseActuelle}`, 20, yPosition)
      yPosition += 6
    }

    doc.text(`Tél: ${locataire.telephone}`, 20, yPosition)
    yPosition += 6

    doc.text(`Email: ${locataire.email}`, 20, yPosition)
    yPosition += 10

    // Informations professionnelles
    doc.setFontSize(11)
    doc.setTextColor(0, 166, 81) // Vert ALV
    doc.text("Situation professionnelle", 25, yPosition)
    yPosition += 8

    doc.setTextColor(0, 0, 0)
    doc.setFontSize(10)
    doc.text(`Profession: ${locataire.profession}`, 25, yPosition)
    yPosition += 6

    if (locataire.employeurNom) {
      doc.text(`Employeur: ${locataire.employeurNom}`, 25, yPosition)
      yPosition += 6
    }

    if (locataire.typeContrat) {
      doc.text(`Type de contrat: ${locataire.typeContrat}`, 25, yPosition)
      yPosition += 6
    }

    if (locataire.dateEmbauche) {
      doc.text(`Date d'embauche: ${locataire.dateEmbauche}`, 25, yPosition)
      yPosition += 6
    }

    // Informations financières
    doc.setFontSize(11)
    doc.setTextColor(0, 166, 81) // Vert ALV
    doc.text("Ressources mensuelles", 25, yPosition)
    yPosition += 8

    doc.setTextColor(0, 0, 0)
    doc.setFontSize(10)
    if (locataire.salaire) {
      doc.text(`Salaire net: ${locataire.salaire} €`, 25, yPosition)
      yPosition += 6
    }

    if (locataire.autresRevenus) {
      doc.text(`Autres revenus: ${locataire.autresRevenus} €`, 25, yPosition)
      yPosition += 6
    }

    // Ligne de séparation entre locataires
    yPosition += 5
    doc.setDrawColor(200, 200, 200)
    doc.line(20, yPosition, 190, yPosition)
    yPosition += 15
  })

  // Pied de page
  const totalPages = doc.getNumberOfPages()
  for (let i = 1; i <= totalPages; i++) {
    doc.setPage(i)
    doc.setFontSize(8)
    doc.setTextColor(100, 100, 100)
    doc.text("ALV Immobilier Pleyben - 02 98 26 71 47", 105, 285, { align: "center" })
    doc.text(`Page ${i}/${totalPages}`, 190, 285, { align: "right" })
  }

  return doc.output("arraybuffer")
}
