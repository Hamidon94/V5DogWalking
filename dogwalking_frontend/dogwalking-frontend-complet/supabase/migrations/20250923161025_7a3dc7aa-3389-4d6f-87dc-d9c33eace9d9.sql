-- Créer un utilisateur admin par défaut pour les tests
-- Mot de passe: admin (sera hashé)
INSERT INTO public.admin_users (username, password_hash, full_name) 
VALUES (
  'admin', 
  '$2a$10$K7L/lQrQl.6w5LByEr4LTOnK.vMZ.Zx6LxHwrq6YeE1YlBxY6XZSm', -- hash bcrypt de "admin"
  'Administrateur'
) ON CONFLICT (username) DO NOTHING;