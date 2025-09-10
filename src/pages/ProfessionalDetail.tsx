import React from 'react';
import { useParams, Link } from 'react-router-dom';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { useAuth } from '@/contexts/AuthContext';
import { mockProfessionals } from '@/data/mockData';
import { 
  MapPin, User, ArrowLeft, ExternalLink, Phone, Mail, 
  Globe, Linkedin, Shield, Eye 
} from 'lucide-react';

const ProfessionalDetail = () => {
  const { id } = useParams<{ id: string }>();
  const { isAuthenticated, user } = useAuth();
  const professional = mockProfessionals.find(p => p.id === id);

  if (!professional) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-foreground mb-4">
            Profissional não encontrado
          </h1>
          <Link to="/profissionais">
            <Button>
              <ArrowLeft className="h-4 w-4 mr-2" />
              Voltar aos Profissionais
            </Button>
          </Link>
        </div>
      </div>
    );
  }

  const canViewFullDetails = isAuthenticated && user?.type === 'company';

  const availabilityColor = {
    'Disponível': 'bg-success text-success-foreground',
    'Ocupado': 'bg-warning text-warning-foreground',
    'Procurando Oportunidades': 'bg-primary text-primary-foreground'
  };

  const levelColor = {
    'Júnior': 'bg-muted text-muted-foreground',
    'Pleno': 'bg-tech-accent text-tech-accent-foreground',
    'Sênior': 'bg-primary text-primary-foreground'
  };

  return (
    <div className="min-h-screen bg-background py-8">
      <div className="container mx-auto px-4 max-w-4xl">
        {/* Header */}
        <div className="mb-8">
          <Link to="/profissionais">
            <Button variant="outline" className="mb-4">
              <ArrowLeft className="h-4 w-4 mr-2" />
              Voltar aos Profissionais
            </Button>
          </Link>
        </div>

        {/* Main Profile Card */}
        <Card className="shadow-card mb-8">
          <CardHeader className="pb-6">
            <div className="flex flex-col md:flex-row items-start gap-6">
              <div className="w-24 h-24 bg-gradient-primary rounded-full flex items-center justify-center flex-shrink-0">
                <User className="h-12 w-12 text-white" />
              </div>
              <div className="flex-1">
                <h1 className="text-3xl font-bold text-foreground mb-2">
                  {professional.name}
                </h1>
                <p className="text-xl text-muted-foreground mb-4">
                  {professional.headline}
                </p>
                <div className="flex flex-wrap gap-3 mb-4">
                  <Badge className={levelColor[professional.level]}>
                    {professional.level}
                  </Badge>
                  <Badge className={availabilityColor[professional.availability]}>
                    {professional.availability}
                  </Badge>
                </div>
                <div className="flex items-center text-muted-foreground">
                  <MapPin className="h-4 w-4 mr-2" />
                  {professional.location}
                </div>
              </div>
            </div>
          </CardHeader>

          <CardContent className="space-y-6">
            {/* Bio */}
            <div>
              <h2 className="text-lg font-semibold text-foreground mb-3">Sobre</h2>
              {canViewFullDetails ? (
                <p className="text-muted-foreground leading-relaxed">
                  {professional.bio}
                </p>
              ) : (
                <div className="space-y-3">
                  <p className="text-muted-foreground leading-relaxed">
                    {professional.bio.substring(0, 150)}...
                  </p>
                  <div className="bg-muted rounded-lg p-4 text-center">
                    <Shield className="h-8 w-8 text-muted-foreground mx-auto mb-2" />
                    <p className="text-sm font-medium text-foreground mb-2">
                      Informações completas disponíveis apenas para empresas cadastradas
                    </p>
                    <Link to="/signup">
                      <Button size="sm">
                        <Eye className="h-4 w-4 mr-2" />
                        Cadastrar como Empresa
                      </Button>
                    </Link>
                  </div>
                </div>
              )}
            </div>

            {/* Skills */}
            <div>
              <h2 className="text-lg font-semibold text-foreground mb-3">
                Skills & Tecnologias
              </h2>
              <div className="flex flex-wrap gap-2">
                {professional.skills.map((skill, index) => (
                  <Badge key={index} variant="secondary">
                    {skill}
                  </Badge>
                ))}
              </div>
            </div>

            {/* Contact & Links - Only for authenticated companies */}
            {canViewFullDetails && (
              <div className="space-y-4 pt-4 border-t">
                <h2 className="text-lg font-semibold text-foreground">
                  Informações de Contato
                </h2>
                <div className="grid md:grid-cols-2 gap-4">
                  {professional.email && (
                    <div className="flex items-center space-x-3 p-3 bg-muted rounded-lg">
                      <Mail className="h-5 w-5 text-primary" />
                      <div>
                        <p className="text-sm font-medium">Email</p>
                        <a 
                          href={`mailto:${professional.email}`}
                          className="text-primary hover:underline"
                        >
                          {professional.email}
                        </a>
                      </div>
                    </div>
                  )}
                  {professional.phone && (
                    <div className="flex items-center space-x-3 p-3 bg-muted rounded-lg">
                      <Phone className="h-5 w-5 text-primary" />
                      <div>
                        <p className="text-sm font-medium">Telefone</p>
                        <a 
                          href={`tel:${professional.phone}`}
                          className="text-primary hover:underline"
                        >
                          {professional.phone}
                        </a>
                      </div>
                    </div>
                  )}
                  {professional.portfolio && (
                    <div className="flex items-center space-x-3 p-3 bg-muted rounded-lg">
                      <Globe className="h-5 w-5 text-primary" />
                      <div>
                        <p className="text-sm font-medium">Portfolio</p>
                        <a 
                          href={professional.portfolio}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-primary hover:underline flex items-center"
                        >
                          Ver portfolio
                          <ExternalLink className="h-3 w-3 ml-1" />
                        </a>
                      </div>
                    </div>
                  )}
                  {professional.linkedin && (
                    <div className="flex items-center space-x-3 p-3 bg-muted rounded-lg">
                      <Linkedin className="h-5 w-5 text-primary" />
                      <div>
                        <p className="text-sm font-medium">LinkedIn</p>
                        <a 
                          href={professional.linkedin}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-primary hover:underline flex items-center"
                        >
                          Ver perfil
                          <ExternalLink className="h-3 w-3 ml-1" />
                        </a>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            )}

            {/* CTA for non-authenticated users */}
            {!isAuthenticated && (
              <div className="bg-gradient-primary rounded-lg p-6 text-center">
                <h3 className="text-xl font-semibold text-white mb-2">
                  Quer entrar em contato?
                </h3>
                <p className="text-white/90 mb-4">
                  Cadastre-se como empresa para acessar informações completas de contato
                </p>
                <div className="flex flex-col sm:flex-row gap-3 justify-center">
                  <Link to="/signup">
                    <Button className="bg-white text-primary hover:bg-white/90">
                      Cadastrar como Empresa
                    </Button>
                  </Link>
                  <Link to="/login">
                    <Button 
                      variant="outline" 
                      className="bg-white/10 border-white/20 text-white hover:bg-white/20"
                    >
                      Já tenho conta
                    </Button>
                  </Link>
                </div>
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default ProfessionalDetail;