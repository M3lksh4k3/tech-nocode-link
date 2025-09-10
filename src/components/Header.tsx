import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { useAuth } from '@/contexts/AuthContext';
import { Code2, LogOut, User, Building } from 'lucide-react';

const Header = () => {
  const { user, logout, isAuthenticated } = useAuth();
  const location = useLocation();

  const isActive = (path: string) => location.pathname === path;

  return (
    <header className="bg-gradient-primary border-b shadow-card sticky top-0 z-50">
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <Link to="/" className="flex items-center space-x-2 group">
            <div className="p-2 bg-white/10 rounded-lg group-hover:bg-white/20 transition-smooth">
              <Code2 className="h-6 w-6 text-white" />
            </div>
            <div>
              <h1 className="text-xl font-bold text-white">TechConnect</h1>
              <p className="text-xs text-white/80">SEBRAE × SERRATEC</p>
            </div>
          </Link>

          {/* Navigation */}
          <nav className="hidden md:flex items-center space-x-6">
            <Link 
              to="/profissionais" 
              className={`px-3 py-2 rounded-lg transition-smooth ${
                isActive('/profissionais') 
                  ? 'bg-white/20 text-white' 
                  : 'text-white/90 hover:bg-white/10 hover:text-white'
              }`}
            >
              Profissionais
            </Link>
            <Link 
              to="/oportunidades" 
              className={`px-3 py-2 rounded-lg transition-smooth ${
                isActive('/oportunidades') 
                  ? 'bg-white/20 text-white' 
                  : 'text-white/90 hover:bg-white/10 hover:text-white'
              }`}
            >
              Oportunidades
            </Link>
            {isAuthenticated && (
              <Link 
                to="/dashboard" 
                className={`px-3 py-2 rounded-lg transition-smooth ${
                  isActive('/dashboard') 
                    ? 'bg-white/20 text-white' 
                    : 'text-white/90 hover:bg-white/10 hover:text-white'
                }`}
              >
                Dashboard
              </Link>
            )}
          </nav>

          {/* Auth Buttons */}
          <div className="flex items-center space-x-3">
            {isAuthenticated ? (
              <div className="flex items-center space-x-3">
                <div className="hidden md:flex items-center space-x-2 text-white/90">
                  {user?.type === 'professional' ? (
                    <User className="h-4 w-4" />
                  ) : (
                    <Building className="h-4 w-4" />
                  )}
                  <span className="text-sm">{user?.email}</span>
                </div>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={logout}
                  className="bg-white/10 border-white/20 text-white hover:bg-white/20"
                >
                  <LogOut className="h-4 w-4 mr-2" />
                  Sair
                </Button>
              </div>
            ) : (
              <div className="flex items-center space-x-2">
                <Link to="/login">
                  <Button 
                    variant="outline" 
                    size="sm"
                    className="bg-white/10 border-white/20 text-white hover:bg-white/20"
                  >
                    Entrar
                  </Button>
                </Link>
                <Link to="/signup">
                  <Button 
                    size="sm"
                    className="bg-white text-primary hover:bg-white/90"
                  >
                    Cadastrar
                  </Button>
                </Link>
              </div>
            )}
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;