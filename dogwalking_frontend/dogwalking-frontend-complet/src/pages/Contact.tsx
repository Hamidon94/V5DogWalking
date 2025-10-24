import { useState } from "react";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { 
  Mail, 
  Phone, 
  MapPin, 
  Clock, 
  MessageCircle,
  Send,
  CheckCircle
} from "lucide-react";

const Contact = () => {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "", 
    email: "",
    subject: "",
    message: "",
    category: "general"
  });
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    // Simulate form submission
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    setLoading(false);
    setSuccess(true);
    
    // Reset form after 3 seconds
    setTimeout(() => {
      setSuccess(false);
      setFormData({
        firstName: "",
        lastName: "",
        email: "",
        subject: "",
        message: "",
        category: "general"
      });
    }, 3000);
  };

  const contactMethods = [
    {
      icon: <MessageCircle className="w-6 h-6" />,
      title: "Chat en direct",
      description: "Disponible 9h-18h, du lundi au vendredi",
      value: "Démarrer une conversation",
      action: "chat"
    },
    {
      icon: <Phone className="w-6 h-6" />,
      title: "Téléphone", 
      description: "Support téléphonique 7j/7",
      value: "01 23 45 67 89",
      action: "phone"
    },
    {
      icon: <Mail className="w-6 h-6" />,
      title: "Email",
      description: "Réponse sous 24h",
      value: "support@dogwalking.fr", 
      action: "email"
    }
  ];

  const officeInfo = [
    {
      icon: <MapPin className="w-5 h-5" />,
      label: "Adresse",
      value: "123 Avenue des Champs-Élysées\n75008 Paris, France"
    },
    {
      icon: <Clock className="w-5 h-5" />,
      label: "Horaires",
      value: "Lun-Ven: 9h00 - 18h00\nSam-Dim: 10h00 - 16h00"
    },
    {
      icon: <Phone className="w-5 h-5" />,
      label: "Urgences",
      value: "24h/24 et 7j/7\n01 23 45 67 89"
    }
  ];

  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      <main>
        {/* Hero Section */}
        <section className="py-20 bg-gradient-to-br from-dogwalking-green/10 to-dogwalking-blue/10">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
              Contactez-nous
            </h1>
            
            <p className="text-xl text-gray-600 mb-8">
              Notre équipe est là pour vous aider. Choisissez la méthode de contact qui vous convient le mieux.
            </p>
          </div>
        </section>

        {/* Contact Methods */}
        <section className="py-20 bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-16">
              <h2 className="text-3xl font-bold text-gray-900 mb-4">
                Comment nous contacter
              </h2>
              <p className="text-lg text-gray-600">
                Plusieurs options s'offrent à vous pour obtenir de l'aide
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
              {contactMethods.map((method, index) => (
                <div key={index} className="dogwalking-card p-8 text-center">
                  <div className="w-16 h-16 mx-auto mb-6 bg-dogwalking-green/10 rounded-full flex items-center justify-center">
                    <div className="text-dogwalking-green">
                      {method.icon}
                    </div>
                  </div>
                  
                  <h3 className="text-xl font-semibold text-gray-900 mb-4">
                    {method.title}
                  </h3>
                  
                  <p className="text-gray-600 mb-6">
                    {method.description}
                  </p>

                  <div className="font-medium text-dogwalking-green mb-6">
                    {method.value}
                  </div>

                  <Button className="dogwalking-button-secondary w-full">
                    {method.action === 'chat' && 'Démarrer le chat'}
                    {method.action === 'phone' && 'Appeler maintenant'}
                    {method.action === 'email' && 'Envoyer un email'}
                  </Button>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Contact Form */}
        <section className="py-20 bg-dogwalking-gray-light">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
              {/* Form */}
              <div>
                <h2 className="text-3xl font-bold text-gray-900 mb-6">
                  Envoyez-nous un message
                </h2>
                
                <div className="dogwalking-card p-8">
                  {success ? (
                    <div className="text-center py-8">
                      <div className="w-16 h-16 mx-auto mb-4 bg-green-100 rounded-full flex items-center justify-center">
                        <CheckCircle className="w-8 h-8 text-green-600" />
                      </div>
                      <h3 className="text-xl font-semibold text-gray-900 mb-2">
                        Message envoyé !
                      </h3>
                      <p className="text-gray-600">
                        Nous vous répondrons dans les plus brefs délais.
                      </p>
                    </div>
                  ) : (
                    <form onSubmit={handleSubmit} className="space-y-6">
                      {/* Category */}
                      <div>
                        <Label htmlFor="category">Sujet de votre demande</Label>
                        <select
                          id="category"
                          value={formData.category}
                          onChange={(e) => setFormData(prev => ({ ...prev, category: e.target.value }))}
                          className="dogwalking-input w-full mt-2"
                        >
                          <option value="general">Question générale</option>
                          <option value="booking">Problème de réservation</option>
                          <option value="payment">Question de paiement</option>
                          <option value="safety">Sécurité et DogWalking Guarantee</option>
                          <option value="sitter">Devenir promeneur certifié</option>
                          <option value="technical">Problème technique</option>
                        </select>
                      </div>

                      {/* Name Fields */}
                      <div className="grid grid-cols-2 gap-4">
                        <div>
                          <Label htmlFor="firstName">Prénom</Label>
                          <Input
                            id="firstName"
                            type="text"
                            required
                            value={formData.firstName}
                            onChange={(e) => setFormData(prev => ({ ...prev, firstName: e.target.value }))}
                            className="dogwalking-input mt-2"
                            placeholder="Jean"
                          />
                        </div>
                        <div>
                          <Label htmlFor="lastName">Nom</Label>
                          <Input
                            id="lastName" 
                            type="text"
                            required
                            value={formData.lastName}
                            onChange={(e) => setFormData(prev => ({ ...prev, lastName: e.target.value }))}
                            className="dogwalking-input mt-2"
                            placeholder="Dupont"
                          />
                        </div>
                      </div>

                      {/* Email */}
                      <div>
                        <Label htmlFor="email">Email</Label>
                        <Input
                          id="email"
                          type="email"
                          required
                          value={formData.email}
                          onChange={(e) => setFormData(prev => ({ ...prev, email: e.target.value }))}
                          className="dogwalking-input mt-2"
                          placeholder="jean.dupont@email.com"
                        />
                      </div>

                      {/* Subject */}
                      <div>
                        <Label htmlFor="subject">Objet</Label>
                        <Input
                          id="subject"
                          type="text"
                          required
                          value={formData.subject}
                          onChange={(e) => setFormData(prev => ({ ...prev, subject: e.target.value }))}
                          className="dogwalking-input mt-2"
                          placeholder="Résumé de votre demande"
                        />
                      </div>

                      {/* Message */}
                      <div>
                        <Label htmlFor="message">Message</Label>
                        <Textarea
                          id="message"
                          required
                          value={formData.message}
                          onChange={(e) => setFormData(prev => ({ ...prev, message: e.target.value }))}
                          className="dogwalking-input mt-2"
                          rows={6}
                          placeholder="Décrivez votre demande en détail..."
                        />
                      </div>

                      {/* Submit Button */}
                      <Button
                        type="submit"
                        disabled={loading}
                        className="dogwalking-button-secondary w-full"
                      >
                        {loading ? (
                          "Envoi en cours..."
                        ) : (
                          <>
                            <Send className="w-4 h-4 mr-2" />
                            Envoyer le message
                          </>
                        )}
                      </Button>
                    </form>
                  )}
                </div>
              </div>

              {/* Office Info */}
              <div>
                <h2 className="text-3xl font-bold text-gray-900 mb-6">
                  Nos bureaux
                </h2>
                
                <div className="dogwalking-card p-8 mb-8">
                  <div className="space-y-6">
                    {officeInfo.map((info, index) => (
                      <div key={index} className="flex items-start space-x-4">
                        <div className="w-10 h-10 bg-dogwalking-green/10 rounded-full flex items-center justify-center flex-shrink-0">
                          <div className="text-dogwalking-green">
                            {info.icon}
                          </div>
                        </div>
                        <div>
                          <h4 className="font-semibold text-gray-900 mb-1">
                            {info.label}
                          </h4>
                          <p className="text-gray-600 whitespace-pre-line">
                            {info.value}
                          </p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Emergency Notice */}
                <Alert>
                  <AlertDescription>
                    <strong>Urgences 24h/24 :</strong> Pour toute urgence concernant un animal en garde, 
                    contactez immédiatement notre ligne d'urgence au 01 23 45 67 89.
                  </AlertDescription>
                </Alert>
              </div>
            </div>
          </div>
        </section>

        {/* FAQ Link */}
        <section className="py-16 bg-white">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <h3 className="text-2xl font-bold text-gray-900 mb-4">
              Vous ne trouvez pas la réponse ?
            </h3>
            <p className="text-gray-600 mb-6">
              Consultez notre centre d'aide pour les questions fréquentes
            </p>
            <Button className="dogwalking-button-primary">
              Visiter le centre d'aide
            </Button>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
};

export default Contact;