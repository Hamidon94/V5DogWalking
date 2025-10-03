import { Header } from "@/components/ui/header";
import { Footer } from "@/components/ui/footer";
import { FloatingActionButton } from "@/components/ui/floating-action-button";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { 
  Search, 
  Phone, 
  Mail, 
  MessageCircle, 
  HelpCircle,
  Book,
  Users,
  Shield,
  CreditCard,
  Dog,
  MapPin,
  Clock,
  ChevronRight
} from "lucide-react";

export default function Help() {
  const faqCategories = [
    {
      icon: <Dog className="h-6 w-6" />,
      title: "Services et Promenades",
      count: 12,
      questions: [
        {
          q: "Quels types de services proposez-vous ?",
          a: "Nous proposons des promenades (30min, 1h), des visites simples, des visites sanitaires, de la garde à domicile, de la pension canine et de l'accompagnement vétérinaire."
        },
        {
          q: "Comment se déroule une promenade ?",
          a: "Le promeneur vient chercher votre chien à l'heure convenue, effectue la promenade selon vos instructions, et vous envoie un rapport avec photos à la fin."
        },
        {
          q: "Puis-je donner des instructions spéciales ?",
          a: "Oui, vous pouvez communiquer toutes vos instructions via notre messagerie intégrée ou lors de la réservation."
        }
      ]
    },
    {
      icon: <CreditCard className="h-6 w-6" />,
      title: "Paiements et Tarifs",
      count: 8,
      questions: [
        {
          q: "Comment fonctionne le paiement ?",
          a: "Le paiement se fait en ligne de manière sécurisée via Stripe. Vous recevez automatiquement une facture par email."
        },
        {
          q: "Puis-je annuler une réservation ?",
          a: "Oui, vous pouvez annuler jusqu'à 2h avant le service. Au-delà, des frais peuvent s'appliquer."
        },
        {
          q: "Y a-t-il des frais cachés ?",
          a: "Non, tous nos tarifs sont transparents et affichés clairement. Aucun frais supplémentaire n'est ajouté."
        }
      ]
    },
    {
      icon: <Users className="h-6 w-6" />,
      title: "Promeneurs",
      count: 10,
      questions: [
        {
          q: "Comment sont sélectionnés les promeneurs ?",
          a: "Tous nos promeneurs sont vérifiés : pièce d'identité, casier judiciaire vierge, et assurance responsabilité civile obligatoires."
        },
        {
          q: "Puis-je choisir mon promeneur ?",
          a: "Oui, vous pouvez consulter les profils et choisir le promeneur qui vous convient le mieux."
        },
        {
          q: "Comment devenir promeneur ?",
          a: "Inscrivez-vous via notre formulaire, fournissez les documents requis, et notre équipe validera votre profil."
        }
      ]
    },
    {
      icon: <Shield className="h-6 w-6" />,
      title: "Sécurité et Assurance",
      count: 6,
      questions: [
        {
          q: "Mon chien est-il assuré pendant la promenade ?",
          a: "Oui, tous nos services sont couverts par une assurance responsabilité civile professionnelle."
        },
        {
          q: "Que se passe-t-il en cas d'urgence ?",
          a: "Nos promeneurs sont formés aux premiers secours et peuvent contacter immédiatement un vétérinaire si nécessaire."
        },
        {
          q: "Comment puis-je suivre la promenade ?",
          a: "Vous recevez des notifications en temps réel et pouvez suivre la promenade sur une carte GPS."
        }
      ]
    }
  ];

  const contactMethods = [
    {
      icon: <Phone className="h-8 w-8" />,
      title: "Téléphone",
      description: "Appelez-nous pour une assistance immédiate",
      contact: "01 23 45 67 89",
      availability: "Lun-Ven 9h-18h, Sam 9h-12h"
    },
    {
      icon: <Mail className="h-8 w-8" />,
      title: "Email",
      description: "Envoyez-nous un message détaillé",
      contact: "support@dogwalking.fr",
      availability: "Réponse sous 24h"
    },
    {
      icon: <MessageCircle className="h-8 w-8" />,
      title: "Chat en direct",
      description: "Discutez avec notre équipe en temps réel",
      contact: "Chat disponible",
      availability: "Lun-Ven 9h-18h"
    }
  ];

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-grow bg-gradient-to-br from-blue-50 to-indigo-50 pt-8">
        <div className="container mx-auto px-4 py-12">
          {/* Header */}
          <div className="text-center mb-12">
            <h1 className="text-4xl font-bold text-gray-900 mb-4">
              Centre d'Aide
            </h1>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Trouvez rapidement les réponses à vos questions ou contactez notre équipe d'assistance. 
              Nous sommes là pour vous aider à profiter pleinement de nos services.
            </p>
          </div>

          {/* Barre de recherche */}
          <div className="max-w-2xl mx-auto mb-12">
            <div className="relative">
              <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
              <Input 
                placeholder="Rechercher dans l'aide..." 
                className="pl-12 py-4 text-lg"
              />
            </div>
          </div>

          {/* Liens rapides */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-12">
            <Card className="text-center hover:shadow-md transition-shadow cursor-pointer">
              <CardContent className="p-6">
                <Book className="h-8 w-8 text-primary mx-auto mb-2" />
                <h3 className="font-semibold">Guide de démarrage</h3>
              </CardContent>
            </Card>
            <Card className="text-center hover:shadow-md transition-shadow cursor-pointer">
              <CardContent className="p-6">
                <MapPin className="h-8 w-8 text-primary mx-auto mb-2" />
                <h3 className="font-semibold">Comment réserver</h3>
              </CardContent>
            </Card>
            <Card className="text-center hover:shadow-md transition-shadow cursor-pointer">
              <CardContent className="p-6">
                <Clock className="h-8 w-8 text-primary mx-auto mb-2" />
                <h3 className="font-semibold">Gérer mes réservations</h3>
              </CardContent>
            </Card>
            <Card className="text-center hover:shadow-md transition-shadow cursor-pointer">
              <CardContent className="p-6">
                <Shield className="h-8 w-8 text-primary mx-auto mb-2" />
                <h3 className="font-semibold">Sécurité et assurance</h3>
              </CardContent>
            </Card>
          </div>

          {/* FAQ par catégories */}
          <div className="mb-12">
            <h2 className="text-2xl font-bold text-center mb-8">Questions Fréquentes</h2>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {faqCategories.map((category, index) => (
                <Card key={index} className="hover:shadow-lg transition-shadow">
                  <CardHeader>
                    <div className="flex items-center gap-3">
                      <div className="text-primary">
                        {category.icon}
                      </div>
                      <div>
                        <CardTitle className="text-lg">{category.title}</CardTitle>
                        <CardDescription>{category.count} questions</CardDescription>
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      {category.questions.map((faq, faqIndex) => (
                        <div key={faqIndex} className="border-l-2 border-primary/20 pl-4">
                          <h4 className="font-medium text-sm mb-1">{faq.q}</h4>
                          <p className="text-sm text-gray-600">{faq.a}</p>
                        </div>
                      ))}
                    </div>
                    <Button variant="ghost" className="w-full mt-4 justify-between">
                      Voir toutes les questions
                      <ChevronRight className="h-4 w-4" />
                    </Button>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>

          {/* Méthodes de contact */}
          <div className="mb-12">
            <h2 className="text-2xl font-bold text-center mb-8">Nous Contacter</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {contactMethods.map((method, index) => (
                <Card key={index} className="text-center hover:shadow-lg transition-shadow">
                  <CardHeader>
                    <div className="text-primary mx-auto mb-2">
                      {method.icon}
                    </div>
                    <CardTitle className="text-xl">{method.title}</CardTitle>
                    <CardDescription>{method.description}</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-2">
                      <p className="font-semibold text-primary">{method.contact}</p>
                      <p className="text-sm text-gray-600">{method.availability}</p>
                    </div>
                    <Button className="w-full mt-4">
                      {method.title === "Téléphone" && "Appeler"}
                      {method.title === "Email" && "Envoyer un email"}
                      {method.title === "Chat en direct" && "Démarrer le chat"}
                    </Button>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>

          {/* Formulaire de contact */}
          <Card className="max-w-2xl mx-auto">
            <CardHeader className="text-center">
              <CardTitle className="text-2xl">Envoyez-nous un Message</CardTitle>
              <CardDescription>
                Vous n'avez pas trouvé la réponse à votre question ? Contactez-nous directement.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="text-sm font-medium mb-2 block">Prénom</label>
                  <Input placeholder="Votre prénom" />
                </div>
                <div>
                  <label className="text-sm font-medium mb-2 block">Nom</label>
                  <Input placeholder="Votre nom" />
                </div>
              </div>
              <div>
                <label className="text-sm font-medium mb-2 block">Email</label>
                <Input type="email" placeholder="votre@email.com" />
              </div>
              <div>
                <label className="text-sm font-medium mb-2 block">Sujet</label>
                <Input placeholder="Objet de votre message" />
              </div>
              <div>
                <label className="text-sm font-medium mb-2 block">Message</label>
                <Textarea 
                  placeholder="Décrivez votre question ou problème en détail..."
                  rows={5}
                />
              </div>
              <Button className="w-full">
                Envoyer le message
              </Button>
            </CardContent>
          </Card>

          {/* Ressources supplémentaires */}
          <div className="text-center mt-12">
            <h2 className="text-2xl font-bold mb-4">Ressources Utiles</h2>
            <div className="flex flex-wrap justify-center gap-4">
              <Button variant="outline" onClick={() => window.location.href = '/blog'}>
                Consulter le blog
              </Button>
              <Button variant="outline" onClick={() => window.location.href = '/legal'}>
                Mentions légales
              </Button>
              <Button variant="outline" onClick={() => window.location.href = '/privacy'}>
                Politique de confidentialité
              </Button>
              <Button variant="outline" onClick={() => window.location.href = '/terms'}>
                Conditions d'utilisation
              </Button>
            </div>
          </div>
        </div>
      </main>
      <Footer />
      <FloatingActionButton />
    </div>
  );
}
