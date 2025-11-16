# 📚 Guide de Configuration Supabase - DogWalking (Corrigé)

Ce guide vous explique comment configurer Supabase pour le projet DogWalking, avec la terminologie mise à jour pour correspondre au frontend.

---

## 🚀 Étape 1 : Créer un Projet Supabase

1. Allez sur [supabase.com](https://supabase.com)
2. Créez un compte ou connectez-vous
3. Cliquez sur "New Project"
4. Remplissez les détails du projet :
   - **Project Name** : DogWalking
   - **Database Password** : Choisissez un mot de passe sécurisé
   - **Region** : Sélectionnez votre région
5. Cliquez sur "Create new project"

---

## 🗄️ Étape 2 : Créer les Tables (Terminologie PROMENEUR)

Accédez à **SQL Editor** dans Supabase Studio et exécutez le script SQL suivant :

```sql
-- Create users table
CREATE TABLE users (
  id UUID PRIMARY KEY DEFAULT auth.uid(),
  email TEXT NOT NULL UNIQUE,
  first_name TEXT NOT NULL,
  last_name TEXT NOT NULL,
  role TEXT NOT NULL CHECK (role IN ('OWNER', 'PROMENEUR', 'ADMIN')),
  phone TEXT,
  avatar_url TEXT,
  bio TEXT,
  location TEXT,
  is_verified BOOLEAN DEFAULT FALSE,
  background_checked BOOLEAN DEFAULT FALSE,
  average_rating DECIMAL(3,1) DEFAULT 0,
  created_at TIMESTAMP DEFAULT NOW(),
  updated_at TIMESTAMP DEFAULT NOW()
);

-- Create pets table
CREATE TABLE pets (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  owner_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  name TEXT NOT NULL,
  type TEXT NOT NULL,
  breed TEXT,
  age INTEGER,
  weight DECIMAL(5,2),
  photo_url TEXT,
  bio TEXT,
  vaccinations TEXT[] DEFAULT ARRAY[]::TEXT[],
  allergies TEXT[] DEFAULT ARRAY[]::TEXT[],
  medical_history TEXT,
  last_vet_visit TIMESTAMP,
  vet_name TEXT,
  vet_phone TEXT,
  dietary_needs TEXT,
  exercise_level TEXT,
  temperament TEXT,
  special_needs TEXT,
  created_at TIMESTAMP DEFAULT NOW(),
  updated_at TIMESTAMP DEFAULT NOW()
);

-- Create bookings table
CREATE TABLE bookings (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  booking_number TEXT NOT NULL UNIQUE,
  owner_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  promeneur_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  pet_id UUID NOT NULL REFERENCES pets(id) ON DELETE CASCADE,
  service_type TEXT NOT NULL,
  start_date TIMESTAMP NOT NULL,
  end_date TIMESTAMP NOT NULL,
  duration INTEGER NOT NULL,
  base_price DECIMAL(10,2) NOT NULL,
  additional_services TEXT[] DEFAULT ARRAY[]::TEXT[],
  additional_price DECIMAL(10,2) DEFAULT 0,
  total_price DECIMAL(10,2) NOT NULL,
  notes TEXT,
  status TEXT NOT NULL DEFAULT 'PENDING' CHECK (status IN ('PENDING', 'ACCEPTED', 'REJECTED', 'COMPLETED', 'CANCELLED')),
  payment_status TEXT NOT NULL DEFAULT 'PENDING' CHECK (payment_status IN ('PENDING', 'COMPLETED', 'FAILED', 'REFUNDED')),
  created_at TIMESTAMP DEFAULT NOW(),
  updated_at TIMESTAMP DEFAULT NOW()
);

-- Create payments table
CREATE TABLE payments (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  booking_id UUID NOT NULL REFERENCES bookings(id) ON DELETE CASCADE,
  amount DECIMAL(10,2) NOT NULL,
  payment_method TEXT NOT NULL CHECK (payment_method IN ('CARD', 'PAYPAL', 'BANK_TRANSFER')),
  transaction_id TEXT,
  status TEXT NOT NULL DEFAULT 'PENDING' CHECK (status IN ('PENDING', 'COMPLETED', 'FAILED', 'REFUNDED')),
  paid_at TIMESTAMP,
  created_at TIMESTAMP DEFAULT NOW(),
  updated_at TIMESTAMP DEFAULT NOW()
);

-- Create messages table
CREATE TABLE messages (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  sender_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  recipient_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  content TEXT NOT NULL,
  attachment_url TEXT,
  is_read BOOLEAN DEFAULT FALSE,
  created_at TIMESTAMP DEFAULT NOW()
);

-- Create notifications table
CREATE TABLE notifications (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  type TEXT NOT NULL CHECK (type IN ('BOOKING', 'MESSAGE', 'REVIEW', 'PAYMENT', 'SYSTEM')),
  title TEXT NOT NULL,
  description TEXT NOT NULL,
  link TEXT,
  is_read BOOLEAN DEFAULT FALSE,
  created_at TIMESTAMP DEFAULT NOW()
);

-- Create reviews table
CREATE TABLE reviews (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  booking_id UUID NOT NULL REFERENCES bookings(id) ON DELETE CASCADE,
  author_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  promeneur_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  rating INTEGER NOT NULL CHECK (rating >= 1 AND rating <= 5),
  comment TEXT NOT NULL,
  photo_urls TEXT[] DEFAULT ARRAY[]::TEXT[],
  is_verified BOOLEAN DEFAULT FALSE,
  created_at TIMESTAMP DEFAULT NOW(),
  updated_at TIMESTAMP DEFAULT NOW()
);

-- Create earnings table
CREATE TABLE earnings (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  promeneur_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  booking_id UUID REFERENCES bookings(id) ON DELETE SET NULL,
  amount DECIMAL(10,2) NOT NULL,
  type TEXT NOT NULL CHECK (type IN ('SERVICE', 'TIP', 'REFUND', 'WITHDRAWAL')),
  description TEXT,
  status TEXT NOT NULL DEFAULT 'PENDING' CHECK (status IN ('PENDING', 'AVAILABLE', 'WITHDRAWN')),
  created_at TIMESTAMP DEFAULT NOW(),
  updated_at TIMESTAMP DEFAULT NOW()
);

-- Create service_photos table
CREATE TABLE service_photos (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  booking_id UUID NOT NULL REFERENCES bookings(id) ON DELETE CASCADE,
  url TEXT NOT NULL,
  caption TEXT,
  sent BOOLEAN DEFAULT FALSE,
  created_at TIMESTAMP DEFAULT NOW()
);

-- Create documents table
CREATE TABLE documents (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  type TEXT NOT NULL CHECK (type IN ('ID_CARD', 'PASSPORT', 'BACKGROUND_CHECK', 'ADDRESS_PROOF')),
  url TEXT NOT NULL,
  status TEXT NOT NULL DEFAULT 'PENDING' CHECK (status IN ('PENDING', 'VERIFIED', 'REJECTED')),
  verified_at TIMESTAMP,
  created_at TIMESTAMP DEFAULT NOW(),
  updated_at TIMESTAMP DEFAULT NOW()
);

-- Create availability table
CREATE TABLE availability (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  promeneur_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  day_of_week INTEGER NOT NULL CHECK (day_of_week >= 0 AND day_of_week <= 6),
  start_time TIME NOT NULL,
  end_time TIME NOT NULL,
  created_at TIMESTAMP DEFAULT NOW(),
  updated_at TIMESTAMP DEFAULT NOW()
);

-- Create indexes for better performance
CREATE INDEX idx_pets_owner_id ON pets(owner_id);
CREATE INDEX idx_bookings_owner_id ON bookings(owner_id);
CREATE INDEX idx_bookings_promeneur_id ON bookings(promeneur_id);
CREATE INDEX idx_bookings_pet_id ON bookings(pet_id);
CREATE INDEX idx_messages_sender_id ON messages(sender_id);
CREATE INDEX idx_messages_recipient_id ON messages(recipient_id);
CREATE INDEX idx_notifications_user_id ON notifications(user_id);
CREATE INDEX idx_reviews_promeneur_id ON reviews(promeneur_id);
CREATE INDEX idx_earnings_promeneur_id ON earnings(promeneur_id);
CREATE INDEX idx_documents_user_id ON documents(user_id);
CREATE INDEX idx_availability_promeneur_id ON availability(promeneur_id);
```

---

## 🔐 Étape 3 : Configurer les Règles Row Level Security (RLS)

Activez RLS pour chaque table dans **Authentication** → **Policies**.

### Exemple pour la table `users` :

```sql
-- Utilisateurs peuvent voir leur propre profil
CREATE POLICY "Users can view their own profile"
ON users FOR SELECT
USING (auth.uid() = id);

-- Utilisateurs peuvent mettre à jour leur propre profil
CREATE POLICY "Users can update their own profile"
ON users FOR UPDATE
USING (auth.uid() = id);

-- Admins peuvent voir tous les profils
CREATE POLICY "Admins can view all profiles"
ON users FOR SELECT
USING (auth.jwt() ->> 'role' = 'ADMIN');
```

Répétez ce processus pour les autres tables selon vos besoins de sécurité.

---

## 🔑 Étape 4 : Obtenir vos Clés API

1. Allez dans **Settings** → **API**
2. Copiez :
   - **Project URL** (exemple : `https://your-project.supabase.co`)
   - **anon public** (clé publique pour le frontend)
   - **service_role secret** (clé secrète pour le backend - à garder privée)

---

## 📝 Étape 5 : Configurer le Frontend

1. Créez un fichier `.env.local` à la racine du projet frontend
2. Ajoutez les variables :

```env
REACT_APP_SUPABASE_URL=https://your-project.supabase.co
REACT_APP_SUPABASE_ANON_KEY=your-anon-key
```

3. Remplacez les valeurs par celles obtenues à l'étape 4

---

## 🪣 Étape 6 : Configurer le Stockage (Buckets)

1. Allez dans **Storage** dans Supabase Studio
2. Créez les buckets suivants :
   - `avatars` - Pour les photos de profil
   - `pet-photos` - Pour les photos d'animaux
   - `service-photos` - Pour les photos de service
   - `documents` - Pour les documents de vérification

3. Configurez les politiques d'accès pour chaque bucket

---

## 🧪 Étape 7 : Tester la Connexion

Dans le frontend, testez la connexion à Supabase :

```typescript
import { supabase } from './lib/supabase';

const testConnection = async () => {
  const { data, error } = await supabase.from('users').select('*').limit(1);
  if (error) console.error('Error:', error);
  else console.log('Connection successful:', data);
};

testConnection();
```

---

## 📚 Ressources Utiles

- [Documentation Supabase](https://supabase.com/docs)
- [Supabase JavaScript Client](https://supabase.com/docs/reference/javascript)
- [Row Level Security](https://supabase.com/docs/guides/auth/row-level-security)
- [Storage](https://supabase.com/docs/guides/storage)

---

**Créé par** : Manus AI  
**Date** : 22 Octobre 2024  
**Version** : 1.0.0
