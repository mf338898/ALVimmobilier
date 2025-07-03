import { type NextRequest, NextResponse } from "next/server"
import { generatePDF } from "@/lib/pdf-generator"
import nodemailer from "nodemailer"

export async function POST(request: NextRequest) {
  try {
    const data = await request.json()
    const { bienConcerne, dateEmmenagement, locataires } = data

    // Générer le PDF
    const pdfBuffer = generatePDF({
      bienConcerne,
      dateEmmenagement,
      locataires,
    })

    // Configuration de l'email (à remplacer par vos identifiants réels)
    const transporter = nodemailer.createTransport({
      // Remplacer par votre configuration SMTP
      host: process.env.SMTP_HOST || "smtp.example.com",
      port: Number.parseInt(process.env.SMTP_PORT || "587"),
      secure: false,
      auth: {
        user: process.env.SMTP_USER || "user@example.com",
        pass: process.env.SMTP_PASS || "password",
      },
    })

    // Construire le nom du fichier
    const nomLocataires = locataires.map((l) => `${l.nom}`).join("-")
    const nomFichier = `Fiche_${nomLocataires}_${new Date().toISOString().split("T")[0]}.pdf`

    // Construire l'objet de l'email
    const objetEmail = `Fiche de renseignement – Location ${bienConcerne} – ${nomLocataires}`

    // Envoyer l'email (commenté pour l'exemple)
    /*
    await transporter.sendMail({
      from: process.env.EMAIL_FROM || 'formulaire@alvimmobilier.bzh',
      to: process.env.EMAIL_TO || 'contact@alvimmobilier.bzh',
      subject: objetEmail,
      text: `Nouvelle fiche de renseignement pour le bien: ${bienConcerne}\n\nLocataire(s): ${locataires.map(l => `${l.prenom} ${l.nom}`).join(', ')}\n\nDate d'emménagement souhaitée: ${dateEmmenagement}`,
      attachments: [
        {
          filename: nomFichier,
          content: Buffer.from(pdfBuffer)
        }
      ]
    })
    */

    // Simulation d'un délai de traitement
    await new Promise((resolve) => setTimeout(resolve, 2000))

    return NextResponse.json({
      success: true,
      message: "PDF généré et envoyé avec succès",
    })
  } catch (error) {
    console.error("Erreur lors de la génération PDF:", error)
    return NextResponse.json({ success: false, message: "Erreur lors du traitement" }, { status: 500 })
  }
}
