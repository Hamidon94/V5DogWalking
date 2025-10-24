import React, { useState, useEffect } from 'react';
import { supabase } from '../lib/supabase';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../components/ui/card';
import { Button } from '../components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../components/ui/tabs';
import { Alert, AlertDescription } from '../components/ui/alert';

export default function AdminDashboard() {
  const [users, setUsers] = useState<any[]>([]);
  const [bookings, setBookings] = useState<any[]>([]);
  const [documents, setDocuments] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      setLoading(true);
      setError(null);

      // Fetch users
      const { data: usersData, error: usersError } = await supabase
        .from('users')
        .select('*')
        .order('created_at', { ascending: false });

      if (usersError) throw usersError;
      setUsers(usersData || []);

      // Fetch bookings
      const { data: bookingsData, error: bookingsError } = await supabase
        .from('bookings')
        .select('*')
        .order('created_at', { ascending: false });

      if (bookingsError) throw bookingsError;
      setBookings(bookingsData || []);

      // Fetch documents
      const { data: documentsData, error: documentsError } = await supabase
        .from('documents')
        .select('*')
        .eq('status', 'PENDING')
        .order('created_at', { ascending: false });

      if (documentsError) throw documentsError;
      setDocuments(documentsData || []);
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleVerifyDocument = async (docId: string) => {
    try {
      const { error } = await supabase
        .from('documents')
        .update({ status: 'VERIFIED', verified_at: new Date().toISOString() })
        .eq('id', docId);

      if (error) throw error;
      fetchData();
    } catch (err: any) {
      setError(err.message);
    }
  };

  const handleRejectDocument = async (docId: string) => {
    try {
      const { error } = await supabase
        .from('documents')
        .update({ status: 'REJECTED' })
        .eq('id', docId);

      if (error) throw error;
      fetchData();
    } catch (err: any) {
      setError(err.message);
    }
  };

  const handleApproveBooking = async (bookingId: string) => {
    try {
      const { error } = await supabase
        .from('bookings')
        .update({ status: 'ACCEPTED' })
        .eq('id', bookingId);

      if (error) throw error;
      fetchData();
    } catch (err: any) {
      setError(err.message);
    }
  };

  const handleRejectBooking = async (bookingId: string) => {
    try {
      const { error } = await supabase
        .from('bookings')
        .update({ status: 'REJECTED' })
        .eq('id', bookingId);

      if (error) throw error;
      fetchData();
    } catch (err: any) {
      setError(err.message);
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <p className="text-lg text-gray-600">Chargement...</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 p-8">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-3xl font-bold text-gray-900 mb-8">Tableau de Bord Administrateur</h1>

        {error && (
          <Alert className="mb-6 border-red-200 bg-red-50">
            <AlertDescription className="text-red-800">{error}</AlertDescription>
          </Alert>
        )}

        <Tabs defaultValue="overview" className="w-full">
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="overview">Aperçu</TabsTrigger>
            <TabsTrigger value="users">Utilisateurs ({users.length})</TabsTrigger>
            <TabsTrigger value="bookings">Réservations ({bookings.length})</TabsTrigger>
            <TabsTrigger value="documents">Documents ({documents.length})</TabsTrigger>
          </TabsList>

          {/* Overview Tab */}
          <TabsContent value="overview" className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
              <Card>
                <CardHeader className="pb-2">
                  <CardTitle className="text-sm font-medium text-gray-600">Utilisateurs</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-2xl font-bold">{users.length}</p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader className="pb-2">
                  <CardTitle className="text-sm font-medium text-gray-600">Réservations</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-2xl font-bold">{bookings.length}</p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader className="pb-2">
                  <CardTitle className="text-sm font-medium text-gray-600">Documents en attente</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-2xl font-bold">{documents.length}</p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader className="pb-2">
                  <CardTitle className="text-sm font-medium text-gray-600">Promeneurs vérifiés</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-2xl font-bold">{users.filter(u => u.background_checked).length}</p>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          {/* Users Tab */}
          <TabsContent value="users">
            <Card>
              <CardHeader>
                <CardTitle>Utilisateurs</CardTitle>
                <CardDescription>Liste de tous les utilisateurs du système</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="overflow-x-auto">
                  <table className="w-full text-sm">
                    <thead>
                      <tr className="border-b">
                        <th className="text-left py-2 px-4">Email</th>
                        <th className="text-left py-2 px-4">Nom</th>
                        <th className="text-left py-2 px-4">Rôle</th>
                        <th className="text-left py-2 px-4">Vérifié</th>
                        <th className="text-left py-2 px-4">Casier judiciaire</th>
                      </tr>
                    </thead>
                    <tbody>
                      {users.map(user => (
                        <tr key={user.id} className="border-b hover:bg-gray-50">
                          <td className="py-2 px-4">{user.email}</td>
                          <td className="py-2 px-4">{user.first_name} {user.last_name}</td>
                          <td className="py-2 px-4">{user.role}</td>
                          <td className="py-2 px-4">{user.is_verified ? '✅' : '❌'}</td>
                          <td className="py-2 px-4">{user.background_checked ? '✅' : '❌'}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Bookings Tab */}
          <TabsContent value="bookings">
            <Card>
              <CardHeader>
                <CardTitle>Réservations</CardTitle>
                <CardDescription>Gestion des réservations en attente</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {bookings.filter(b => b.status === 'PENDING').length === 0 ? (
                    <p className="text-gray-600">Aucune réservation en attente</p>
                  ) : (
                    bookings.filter(b => b.status === 'PENDING').map(booking => (
                      <div key={booking.id} className="border rounded-lg p-4">
                        <div className="flex justify-between items-start mb-3">
                          <div>
                            <p className="font-semibold">{booking.booking_number}</p>
                            <p className="text-sm text-gray-600">{booking.service_type}</p>
                          </div>
                          <p className="font-bold">{booking.total_price}€</p>
                        </div>
                        <div className="flex gap-2">
                          <Button
                            size="sm"
                            onClick={() => handleApproveBooking(booking.id)}
                            className="bg-green-600 hover:bg-green-700"
                          >
                            Approuver
                          </Button>
                          <Button
                            size="sm"
                            onClick={() => handleRejectBooking(booking.id)}
                            className="bg-red-600 hover:bg-red-700"
                          >
                            Refuser
                          </Button>
                        </div>
                      </div>
                    ))
                  )}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Documents Tab */}
          <TabsContent value="documents">
            <Card>
              <CardHeader>
                <CardTitle>Documents de Vérification</CardTitle>
                <CardDescription>Vérification des documents d'identité et du casier judiciaire</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {documents.length === 0 ? (
                    <p className="text-gray-600">Aucun document en attente</p>
                  ) : (
                    documents.map(doc => (
                      <div key={doc.id} className="border rounded-lg p-4">
                        <div className="flex justify-between items-start mb-3">
                          <div>
                            <p className="font-semibold">Document : {doc.type}</p>
                            <p className="text-sm text-gray-600">Utilisateur ID : {doc.user_id}</p>
                          </div>
                          <span className="bg-yellow-100 text-yellow-800 px-2 py-1 rounded text-sm">
                            {doc.status}
                          </span>
                        </div>
                        <div className="mb-3">
                          <a
                            href={doc.url}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-blue-600 hover:underline text-sm"
                          >
                            Voir le document
                          </a>
                        </div>
                        <div className="flex gap-2">
                          <Button
                            size="sm"
                            onClick={() => handleVerifyDocument(doc.id)}
                            className="bg-green-600 hover:bg-green-700"
                          >
                            Vérifier
                          </Button>
                          <Button
                            size="sm"
                            onClick={() => handleRejectDocument(doc.id)}
                            className="bg-red-600 hover:bg-red-700"
                          >
                            Rejeter
                          </Button>
                        </div>
                      </div>
                    ))
                  )}
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}

