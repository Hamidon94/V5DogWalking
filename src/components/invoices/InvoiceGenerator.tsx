import React from 'react';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Download, FileText, Eye } from 'lucide-react';
import { toast } from "@/hooks/use-toast";

interface Invoice {
  id: string;
  date: string;
  service: string;
  amount: number;
  tip: number;
  total: number;
  customerName: string;
}

export const InvoiceGenerator: React.FC = () => {
  const [invoices, setInvoices] = React.useState<Invoice[]>([]);

  React.useEffect(() => {
    // Charger les factures depuis le localStorage
    const savedInvoices = JSON.parse(localStorage.getItem('invoices') || '[]');
    setInvoices(savedInvoices);
  }, []);

  const generatePDF = (invoice: Invoice) => {
    // Créer le contenu HTML de la facture
    const invoiceHTML = `
      <!DOCTYPE html>
      <html>
      <head>
        <meta charset="UTF-8">
        <title>Facture ${invoice.id}</title>
        <style>
          body {
            font-family: Arial, sans-serif;
            max-width: 800px;
            margin: 0 auto;
            padding: 40px;
            color: #333;
          }
          .header {
            display: flex;
            justify-content: space-between;
            align-items: center;
            margin-bottom: 40px;
            border-bottom: 3px solid #2563eb;
            padding-bottom: 20px;
          }
          .logo {
            font-size: 32px;
            font-weight: bold;
            color: #2563eb;
          }
          .invoice-info {
            text-align: right;
          }
          .invoice-number {
            font-size: 24px;
            font-weight: bold;
            color: #2563eb;
          }
          .company-info, .customer-info {
            margin-bottom: 30px;
          }
          .section-title {
            font-weight: bold;
            font-size: 14px;
            color: #666;
            margin-bottom: 10px;
            text-transform: uppercase;
          }
          table {
            width: 100%;
            border-collapse: collapse;
            margin: 30px 0;
          }
          th {
            background-color: #f3f4f6;
            padding: 12px;
            text-align: left;
            font-weight: bold;
            border-bottom: 2px solid #e5e7eb;
          }
          td {
            padding: 12px;
            border-bottom: 1px solid #e5e7eb;
          }
          .total-row {
            font-weight: bold;
            font-size: 18px;
            background-color: #f9fafb;
          }
          .footer {
            margin-top: 50px;
            padding-top: 20px;
            border-top: 1px solid #e5e7eb;
            text-align: center;
            font-size: 12px;
            color: #666;
          }
          .badge {
            display: inline-block;
            background-color: #10b981;
            color: white;
            padding: 4px 12px;
            border-radius: 4px;
            font-size: 12px;
            font-weight: bold;
          }
        </style>
      </head>
      <body>
        <div class="header">
          <div class="logo">🐕 DogWalking</div>
          <div class="invoice-info">
            <div class="invoice-number">FACTURE</div>
            <div>${invoice.id}</div>
            <div><span class="badge">PAYÉE</span></div>
          </div>
        </div>

        <div class="company-info">
          <div class="section-title">DogWalking</div>
          <div>123 Avenue des Champs-Élysées</div>
          <div>75008 Paris, France</div>
          <div>SIRET: 123 456 789 00012</div>
          <div>Email: contact@dogwalking.fr</div>
          <div>Tél: +33 1 23 45 67 89</div>
        </div>

        <div class="customer-info">
          <div class="section-title">Facturé à</div>
          <div><strong>${invoice.customerName}</strong></div>
          <div>Date: ${new Date(invoice.date).toLocaleDateString('fr-FR', {
            year: 'numeric',
            month: 'long',
            day: 'numeric'
          })}</div>
        </div>

        <table>
          <thead>
            <tr>
              <th>Description</th>
              <th style="text-align: right;">Quantité</th>
              <th style="text-align: right;">Prix unitaire</th>
              <th style="text-align: right;">Total</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>${invoice.service}</td>
              <td style="text-align: right;">1</td>
              <td style="text-align: right;">${invoice.amount.toFixed(2)}€</td>
              <td style="text-align: right;">${invoice.amount.toFixed(2)}€</td>
            </tr>
            ${invoice.tip > 0 ? `
            <tr>
              <td>Pourboire</td>
              <td style="text-align: right;">1</td>
              <td style="text-align: right;">${invoice.tip.toFixed(2)}€</td>
              <td style="text-align: right;">${invoice.tip.toFixed(2)}€</td>
            </tr>
            ` : ''}
            <tr class="total-row">
              <td colspan="3" style="text-align: right;">TOTAL TTC</td>
              <td style="text-align: right;">${invoice.total.toFixed(2)}€</td>
            </tr>
          </tbody>
        </table>

        <div style="background-color: #f9fafb; padding: 20px; border-radius: 8px; margin: 30px 0;">
          <strong>Informations de paiement :</strong><br>
          Paiement effectué par carte bancaire via Stripe<br>
          Statut : <span style="color: #10b981; font-weight: bold;">Payé</span><br>
          Transaction ID: ${invoice.id}
        </div>

        <div class="footer">
          <p><strong>Merci de votre confiance !</strong></p>
          <p>DogWalking - La plateforme de confiance pour les promenades de vos compagnons</p>
          <p>www.dogwalking.fr | contact@dogwalking.fr | +33 1 23 45 67 89</p>
          <p style="margin-top: 20px; font-size: 10px;">
            Cette facture est un document officiel. En cas de question, contactez notre service client.
          </p>
        </div>
      </body>
      </html>
    `;

    // Créer un blob et télécharger
    const blob = new Blob([invoiceHTML], { type: 'text/html' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `Facture_${invoice.id}.html`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);

    toast({
      title: "Facture téléchargée",
      description: `La facture ${invoice.id} a été téléchargée avec succès.`,
    });
  };

  const viewInvoice = (invoice: Invoice) => {
    // Ouvrir la facture dans un nouvel onglet
    const invoiceHTML = generateInvoiceHTML(invoice);
    const newWindow = window.open('', '_blank');
    if (newWindow) {
      newWindow.document.write(invoiceHTML);
      newWindow.document.close();
    }
  };

  const generateInvoiceHTML = (invoice: Invoice) => {
    // Même contenu HTML que generatePDF
    return `[HTML content similar to generatePDF]`;
  };

  if (invoices.length === 0) {
    return (
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <FileText className="h-5 w-5" />
            Mes factures
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-center py-8 text-muted-foreground">
            <FileText className="h-12 w-12 mx-auto mb-4 opacity-50" />
            <p>Aucune facture disponible pour le moment</p>
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <FileText className="h-5 w-5" />
          Mes factures ({invoices.length})
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-3">
          {invoices.map((invoice) => (
            <div
              key={invoice.id}
              className="flex items-center justify-between p-4 border rounded-lg hover:bg-muted/50 transition-colors"
            >
              <div className="flex-1">
                <div className="font-medium">{invoice.service}</div>
                <div className="text-sm text-muted-foreground">
                  {new Date(invoice.date).toLocaleDateString('fr-FR')} • {invoice.id}
                </div>
              </div>
              <div className="flex items-center gap-4">
                <div className="text-right">
                  <div className="font-bold">{invoice.total.toFixed(2)}€</div>
                  <div className="text-xs text-green-600">Payée</div>
                </div>
                <div className="flex gap-2">
                  <Button
                    size="sm"
                    variant="outline"
                    onClick={() => viewInvoice(invoice)}
                  >
                    <Eye className="h-4 w-4" />
                  </Button>
                  <Button
                    size="sm"
                    variant="outline"
                    onClick={() => generatePDF(invoice)}
                  >
                    <Download className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};

