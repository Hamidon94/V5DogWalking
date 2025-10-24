import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { TrendingUp, DollarSign, Wallet, Download, Filter, Calendar } from "lucide-react";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";

interface Transaction {
  id: string;
  type: "service" | "tip" | "refund" | "withdrawal";
  description: string;
  amount: number;
  date: string;
  status: "completed" | "pending" | "failed";
}

interface EarningStats {
  totalEarnings: number;
  monthlyEarnings: number;
  weeklyEarnings: number;
  pendingAmount: number;
  totalServices: number;
  averageRating: number;
}

const EarningsManagement = () => {
  const [selectedPeriod, setSelectedPeriod] = useState("month");
  const [transactions] = useState<Transaction[]>([
    {
      id: "TXN001",
      type: "service",
      description: "Promenade de chien - Max (45 min)",
      amount: 25.0,
      date: "2024-10-22",
      status: "completed",
    },
    {
      id: "TXN002",
      type: "tip",
      description: "Pourboire - Jean Dupont",
      amount: 5.0,
      date: "2024-10-22",
      status: "completed",
    },
    {
      id: "TXN003",
      type: "service",
      description: "Hébergement - Luna (2 jours)",
      amount: 80.0,
      date: "2024-10-21",
      status: "completed",
    },
    {
      id: "TXN004",
      type: "service",
      description: "Promenade de chien - Bella (30 min)",
      amount: 20.0,
      date: "2024-10-20",
      status: "completed",
    },
    {
      id: "TXN005",
      type: "refund",
      description: "Remboursement - Annulation",
      amount: -15.0,
      date: "2024-10-19",
      status: "completed",
    },
    {
      id: "TXN006",
      type: "withdrawal",
      description: "Retrait vers compte bancaire",
      amount: -100.0,
      date: "2024-10-18",
      status: "completed",
    },
  ]);

  const stats: EarningStats = {
    totalEarnings: 2850.5,
    monthlyEarnings: 1250.0,
    weeklyEarnings: 330.0,
    pendingAmount: 85.5,
    totalServices: 142,
    averageRating: 4.8,
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "completed":
        return "bg-green-100 text-green-800";
      case "pending":
        return "bg-yellow-100 text-yellow-800";
      case "failed":
        return "bg-red-100 text-red-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  const getTransactionIcon = (type: string) => {
    switch (type) {
      case "service":
        return "💼";
      case "tip":
        return "💝";
      case "refund":
        return "↩️";
      case "withdrawal":
        return "🏦";
      default:
        return "💰";
    }
  };

  const getTransactionColor = (type: string) => {
    switch (type) {
      case "service":
        return "text-green-600";
      case "tip":
        return "text-blue-600";
      case "refund":
        return "text-orange-600";
      case "withdrawal":
        return "text-purple-600";
      default:
        return "text-gray-600";
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <Header />

      <main className="container mx-auto px-4 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold mb-2">Gestion de Mes Revenus</h1>
          <p className="text-muted-foreground">
            Suivez vos gains et gérez vos retraits
          </p>
        </div>

        {/* Statistiques principales */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
          {/* Total des revenus */}
          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="text-sm font-medium">Revenus Totaux</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stats.totalEarnings.toFixed(2)}€</div>
              <p className="text-xs text-muted-foreground mt-1">Depuis le début</p>
            </CardContent>
          </Card>

          {/* Revenus du mois */}
          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="text-sm font-medium">Ce Mois</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stats.monthlyEarnings.toFixed(2)}€</div>
              <p className="text-xs text-muted-foreground mt-1">Octobre 2024</p>
            </CardContent>
          </Card>

          {/* Revenus de la semaine */}
          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="text-sm font-medium">Cette Semaine</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stats.weeklyEarnings.toFixed(2)}€</div>
              <p className="text-xs text-muted-foreground mt-1">16-22 Oct 2024</p>
            </CardContent>
          </Card>

          {/* Montant en attente */}
          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="text-sm font-medium">En Attente</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-yellow-600">
                {stats.pendingAmount.toFixed(2)}€
              </div>
              <p className="text-xs text-muted-foreground mt-1">À confirmer</p>
            </CardContent>
          </Card>
        </div>

        {/* Graphique et statistiques */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
          {/* Graphique des revenus */}
          <Card className="lg:col-span-2">
            <CardHeader>
              <CardTitle>Revenus par Période</CardTitle>
              <CardDescription>Évolution de vos gains</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="h-64 flex items-end justify-between gap-2 px-4">
                {[45, 52, 48, 61, 55, 67, 72].map((value, idx) => (
                  <div
                    key={idx}
                    className="flex-1 bg-green-500 rounded-t-lg relative group"
                    style={{ height: `${(value / 80) * 100}%` }}
                  >
                    <div className="absolute -top-8 left-0 right-0 text-center text-xs font-semibold opacity-0 group-hover:opacity-100">
                      {value}€
                    </div>
                  </div>
                ))}
              </div>
              <div className="flex justify-between text-xs text-muted-foreground mt-4">
                <span>Lun</span>
                <span>Mar</span>
                <span>Mer</span>
                <span>Jeu</span>
                <span>Ven</span>
                <span>Sam</span>
                <span>Dim</span>
              </div>
            </CardContent>
          </Card>

          {/* Statistiques */}
          <Card>
            <CardHeader>
              <CardTitle>Statistiques</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm">Services Complétés</span>
                  <span className="font-semibold">{stats.totalServices}</span>
                </div>
                <div className="w-full h-2 bg-gray-200 rounded-full overflow-hidden">
                  <div className="h-full bg-green-500" style={{ width: "85%" }} />
                </div>
              </div>

              <div>
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm">Note Moyenne</span>
                  <span className="font-semibold">{stats.averageRating}/5</span>
                </div>
                <div className="flex gap-1">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <span
                      key={star}
                      className={star <= Math.round(stats.averageRating) ? "text-yellow-400" : "text-gray-300"}
                    >
                      ⭐
                    </span>
                  ))}
                </div>
              </div>

              <Button className="w-full mt-4">
                <Download className="w-4 h-4 mr-2" />
                Télécharger Relevé
              </Button>
            </CardContent>
          </Card>
        </div>

        {/* Historique des transactions */}
        <Card>
          <CardHeader>
            <div className="flex items-center justify-between">
              <div>
                <CardTitle>Historique des Transactions</CardTitle>
                <CardDescription>Toutes vos opérations financières</CardDescription>
              </div>
              <div className="flex gap-2">
                <Button variant="outline" size="sm">
                  <Filter className="w-4 h-4 mr-2" />
                  Filtrer
                </Button>
                <Button variant="outline" size="sm">
                  <Calendar className="w-4 h-4 mr-2" />
                  Période
                </Button>
              </div>
            </div>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {transactions.map((transaction) => (
                <div
                  key={transaction.id}
                  className="flex items-center justify-between p-4 border rounded-lg hover:bg-muted transition-colors"
                >
                  <div className="flex items-center gap-4 flex-1">
                    <div className="text-2xl">{getTransactionIcon(transaction.type)}</div>
                    <div className="flex-1">
                      <p className="font-semibold">{transaction.description}</p>
                      <p className="text-sm text-muted-foreground">{transaction.date}</p>
                    </div>
                  </div>

                  <div className="flex items-center gap-4">
                    <div className="text-right">
                      <p className={`font-semibold ${getTransactionColor(transaction.type)}`}>
                        {transaction.amount > 0 ? "+" : ""}{transaction.amount.toFixed(2)}€
                      </p>
                      <Badge
                        variant="secondary"
                        className={`text-xs ${getStatusColor(transaction.status)}`}
                      >
                        {transaction.status === "completed"
                          ? "Complété"
                          : transaction.status === "pending"
                          ? "En attente"
                          : "Échoué"}
                      </Badge>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Section Retrait */}
        <Card className="mt-8">
          <CardHeader>
            <CardTitle>Effectuer un Retrait</CardTitle>
            <CardDescription>
              Transférez vos gains vers votre compte bancaire
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="bg-green-50 border border-green-200 rounded-lg p-4">
              <p className="text-sm text-green-700">
                Montant disponible pour retrait : <span className="font-bold">200.50€</span>
              </p>
            </div>

            <div>
              <label className="block text-sm font-medium mb-2">Montant à retirer</label>
              <div className="flex gap-2">
                <input
                  type="number"
                  placeholder="100.00"
                  className="flex-1 px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
                />
                <span className="flex items-center">€</span>
              </div>
              <p className="text-xs text-muted-foreground mt-1">
                Minimum : 10€ | Maximum : 200.50€
              </p>
            </div>

            <div>
              <label className="block text-sm font-medium mb-2">Compte bancaire</label>
              <select className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500">
                <option>Compte Courant - IBAN: FR76 XXXX XXXX XXXX XXXX</option>
                <option>Ajouter un nouveau compte</option>
              </select>
            </div>

            <div className="bg-blue-50 border border-blue-200 rounded-lg p-3">
              <p className="text-xs text-blue-700">
                Les retraits sont traités sous 2-3 jours ouvrables. Des frais de 1% s'appliquent.
              </p>
            </div>

            <Button className="w-full">
              <Wallet className="w-4 h-4 mr-2" />
              Demander le Retrait
            </Button>
          </CardContent>
        </Card>
      </main>

      <Footer />
    </div>
  );
};

export default EarningsManagement;

