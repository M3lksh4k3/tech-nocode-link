import React from 'react';
import { useParams, Link } from 'react-router-dom';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { useAuth } from '@/contexts/AuthContext';
import { mockOpportunities } from '@/data/mockData';
import { 
  MapPin, Building, ArrowLeft, ExternalLink, Phone, Mail, 
  Globe, DollarSign, Shield, Eye, Clock 
} from 'lucide-react';

const OpportunityDetail = () => {
  const { id } = useParams<{ id: string }>();
  const { isAuthenticated, user } = useAuth();
  const opportunity = mockOpportunities.find(o => o.id === id);

  if (!opportunity) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-foreground mb-4">
            Oportunidade não encontrada
          </h1>
          <Link to="/oportunidades">
            <Button>
              <ArrowLeft className="h-4 w-4 mr-2" />
              Voltar às Oportunidades
            </Button>
          </Link>
        </div>
      </div>
    );
  }

  const canViewFullDetails = isAuthenticated && user?.type === 'professional';

  const contractTypeColor = {
    'PJ': 'bg-primary text-primary-foreground',
    'CLT': 'bg-success text-success-foreground',
    'Freelancer': 'bg-tech-accent text-tech-accent-foreground'
  };

  const levelColor = {
    'Júnior': 'bg-muted text-muted-foreground',
    'Pleno': 'bg-tech-accent text-tech-accent-foreground',
    'Sênior': 'bg-primary text-primary-foreground'
  };

  const workTypeColor = {
    'Presencial': 'bg-warning text-warning-foreground',
    'Remoto': 'bg-success text-success-foreground',
    'Híbrido': 'bg-tech-accent text-tech-accent-foreground'
  };

  return (
    <div className="min-h-screen bg-background py-8">
      <div className="container mx-auto px-4 max-w-4xl">
        {/* Header */}
        <div className="mb-8">
          <Link to="/oportunidades">
            <Button variant="outline" className="mb-4">
              <ArrowLeft className="h-4 w-4 mr-2" />
              Voltar às Oportunidades
            </Button>
          </Link>
        </div>

        {/* Main Opportunity Card */}
        <Card className="shadow-card mb-8">
          <CardHeader className="pb-6">
            <div className="flex flex-col md:flex-row items-start gap-6">
              <div className="w-24 h-24 bg-gradient-primary rounded-full flex items-center justify-center flex-shrink-0">
                <Building className="h-12 w-12 text-white" />
              </div>
              <div className="flex-1">
                <h1 className="text-3xl font-bold text-foreground mb-2">
                  {opportunity.title}
                </h1>
                <p className="text-xl text-muted-foreground mb-4">
                  {opportunity.companyName}
                </p>
                <div className="flex flex-wrap gap-3 mb-4">
                  <Badge className={contractTypeColor[opportunity.contractType]}>
                    {opportunity.contractType}
                  </Badge>
                  <Badge className={levelColor[opportunity.level]}>
                    {opportunity.level}
                  </Badge>
                  <Badge className={workTypeColor[opportunity.workType]}>
                    {opportunity.workType}
                  </Badge>
                </div>
                <div className="flex items-center text-muted-foreground mb-2">
                  <MapPin className="h-4 w-4 mr-2" />
                  {opportunity.location}
                </div>
                {opportunity.budgetRange && (
                  <div className="flex items-center text-muted-foreground mb-2">
                    <DollarSign className="h-4 w-4 mr-2" />
                    {opportunity.budgetRange}
                  </div>
                )}
                <div className="flex items-center text-sm text-muted-foreground">
                  <Clock className="h-4 w-4 mr-2" />
                  Publicado em {new Date(opportunity.createdAt).toLocaleDateString('pt-BR')}
                </div>
              </div>
            </div>
          </CardHeader>

          <CardContent className="space-y-6">
            {/* Description */}
            <div>
              <h2 className="text-lg font-semibold text-foreground mb-3">Descrição da Oportunidade</h2>
              {canViewFullDetails ? (
                <p className="text-muted-foreground leading-relaxed">
                  {opportunity.description}
                </p>
              ) : (
                <div className="space-y-3">
                  <p className="text-muted-foreground leading-relaxed">
                    {opportunity.description.substring(0, 200)}...
                  </p>
                  <div className="bg-muted rounded-lg p-4 text-center">
                    <Shield className="h-8 w-8 text-muted-foreground mx-auto mb-2" />
                    <p className="text-sm font-medium text-foreground mb-2">
                      Descrição completa disponível apenas para profissionais cadastrados
                    </p>
                    <Link to="/signup">
                      <Button size="sm">
                        <Eye className="h-4 w-4 mr-2" />
                        Cadastrar como Profissional
                      </Button>
                    </Link>
                  </div>
                </div>
              )}
            </div>

            {/* Required Skills */}
            <div>
              <h2 className="text-lg font-semibold text-foreground mb-3">
                Tecnologias Desejadas
              </h2>
              <div className="flex flex-wrap gap-2">
                {opportunity.requiredSkills.map((skill, index) => (
                  <Badge key={index} variant="secondary">
                    {skill}
                  </Badge>
                ))}
              </div>
            </div>

            {/* Company Contact - Only for authenticated professionals */}
            {canViewFullDetails && (
              <div className="space-y-4 pt-4 border-t">
                <h2 className="text-lg font-semibold text-foreground">
                  Informações de Contato
                </h2>
                <div className="grid md:grid-cols-2 gap-4">
                  {opportunity.contactEmail && (
                    <div className="flex items-center space-x-3 p-3 bg-muted rounded-lg">
                      <Mail className="h-5 w-5 text-primary" />
                      <div>
                        <p className="text-sm font-medium">Email</p>
                        <a 
                          href={`mailto:${opportunity.contactEmail}`}
                          className="text-primary hover:underline"
                        >
                          {opportunity.contactEmail}
                        </a>
                      </div>
                    </div>
                  )}
                  {opportunity.contactPhone && (
                    <div className="flex items-center space-x-3 p-3 bg-muted rounded-lg">
                      <Phone className="h-5 w-5 text-primary" />
                      <div>
                        <p className="text-sm font-medium">Telefone</p>
                        <a 
                          href={`tel:${opportunity.contactPhone}`}
                          className="text-primary hover:underline"
                        >
                          {opportunity.contactPhone}
                        </a>
                      </div>
                    </div>
                  )}
                  {opportunity.companyWebsite && (
                    <div className="flex items-center space-x-3 p-3 bg-muted rounded-lg">
                      <Globe className="h-5 w-5 text-primary" />
                      <div>
                        <p className="text-sm font-medium">Website da Empresa</p>
                        <a 
                          href={opportunity.companyWebsite}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-primary hover:underline flex items-center"
                        >
                          Visitar site
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
                  Interessado nesta oportunidade?
                </h3>
                <p className="text-white/90 mb-4">
                  Cadastre-se como profissional para acessar informações completas de contato
                </p>
                <div className="flex flex-col sm:flex-row gap-3 justify-center">
                  <Link to="/signup">
                    <Button className="bg-white text-primary hover:bg-white/90">
                      Cadastrar como Profissional
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

        {/* Similar Opportunities */}
        <Card className="shadow-card">
          <CardHeader>
            <h2 className="text-xl font-semibold text-foreground">
              Outras Oportunidades da {opportunity.companyName}
            </h2>
          </CardHeader>
          <CardContent>
            <p className="text-muted-foreground text-center py-8">
              Nenhuma outra oportunidade disponível no momento.
            </p>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default OpportunityDetail;