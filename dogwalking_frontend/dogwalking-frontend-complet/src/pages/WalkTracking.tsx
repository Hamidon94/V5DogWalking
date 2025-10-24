import React from 'react';
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import TrackingMap from "@/components/TrackingMap";
import ChatSystem from "@/components/ChatSystem";
import { ArrowLeft } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';

const WalkTracking = () => {
  // Données simulées - dans un vrai projet, ces données viendraient de l'URL ou du store
  const bookingData = {
    id: "booking-123",
    walkerName: "Marie Dubois",
    walkerAvatar: "/placeholder-avatar.jpg",
    dogName: "Rex",
    walkDuration: 30,
    clientId: "client-456",
    walkerId: "walker-789"
  };

  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      <main className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="flex items-center gap-4 mb-8">
          <Link to="/dashboard">
            <Button variant="outline" size="icon">
              <ArrowLeft className="w-4 h-4" />
            </Button>
          </Link>
          <div>
            <h1 className="text-2xl font-bold text-foreground">
              Suivi de promenade - {bookingData.dogName}
            </h1>
            <p className="text-muted-foreground">
              Promeneur: {bookingData.walkerName}
            </p>
          </div>
        </div>

        {/* Tracking Components */}
        <TrackingMap
          bookingId={bookingData.id}
          walkerName={bookingData.walkerName}
          walkDuration={bookingData.walkDuration}
        />

        {/* Chat System */}
        <ChatSystem
          bookingId={bookingData.id}
          currentUserId={bookingData.clientId}
          currentUserType="client"
          otherUserName={bookingData.walkerName}
          otherUserAvatar={bookingData.walkerAvatar}
        />
      </main>

      <Footer />
    </div>
  );
};

export default WalkTracking;