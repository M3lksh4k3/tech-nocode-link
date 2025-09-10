import React from 'react';
import { Link } from 'react-router-dom';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { useAuth } from '@/contexts/AuthContext';
import { mockProfessionals, mockOpportunities } from '@/data/mockData';
import { 
  Plus, Edit, Eye, User, Building, Target, 
  Zap, TrendingUp, Users, Briefcase 
} from 'lucide-react';

const Dashboard = () => {
  const { user } = useAuth();

  if (!user) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-foreground mb-4">
            Acesso negado
          </h1>
          <p className="text-muted-foreground mb-4">
            Você precisa estar logado para acessar o dashboard.
          </p>
          <Link to="/login">
            <Button>Fazer Login</Button>
          </Link>
        </div>
      </div>
    );
  }

  // Get user's content
  const userProfessional = mockProfessionals.find(p => p.userId === user.id);
  const userOpportunities = mockOpportunities.filter(o => o.userId === user.id);

  return (
    <div className="min-h-screen bg-background py-8">
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center mb-4">
            {user.type === 'professional' ? (
              <User className="h-8 w-8 text-primary mr-3" />
            ) : (
              <Building className="h-8 w-8 text-primary mr-3" />
            )}
            <div>
              <h1 className="text-3xl font-bold text-foreground">Dashboard</h1>
              <p className="text-muted-foreground">
                Bem-vindo(a), {user.email}
              </p>
            </div>
          </div>
          
          {/* Account Type Badge */}
          <Badge className="mb-4">
            {user.type === 'professional' ? 'Conta Profissional' : 'Conta Empresa'}
          </Badge>
        </div>

        {/* Stats Cards */}
        <div className="grid md:grid-cols-3 gap-6 mb-8">
          <Card className="shadow-card">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">Total de Visualizações</p>
                  <p className="text-2xl font-bold text-foreground">247</p>
                </div>
                <Eye className="h-8 w-8 text-primary" />
              </div>
              <p className="text-xs text-success mt-2">+12% esta semana</p>
            </CardContent>
          </Card>

          <Card className="shadow-card">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">Interações</p>
                  <p className="text-2xl font-bold text-foreground">18</p>
                </div>
                <Target className="h-8 w-8 text-primary" />
              </div>
              <p className="text-xs text-success mt-2">+5% esta semana</p>
            </CardContent>
          </Card>

          <Card className="shadow-card">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">Taxa de Resposta</p>
                  <p className="text-2xl font-bold text-foreground">85%</p>
                </div>
                <TrendingUp className="h-8 w-8 text-primary" />
              </div>
              <p className="text-xs text-muted-foreground mt-2">Média da plataforma: 78%</p>
            </CardContent>
          </Card>
        </div>

        {/* Main Content */}
        <div className="grid lg:grid-cols-2 gap-8">
          {/* Professional Content */}
          {user.type === 'professional' && (
            <Card className="shadow-card">
              <CardHeader>
                <CardTitle className="flex items-center">
                  <User className="h-5 w-5 mr-2" />
                  Meu Perfil Profissional
                </CardTitle>
              </CardHeader>
              <CardContent>
                {userProfessional ? (
                  <div className="space-y-4">
                    <div>
                      <h3 className="font-semibold text-foreground">{userProfessional.name}</h3>
                      <p className="text-sm text-muted-foreground">{userProfessional.headline}</p>
                    </div>
                    
                    <div className="flex flex-wrap gap-2">
                      {userProfessional.skills.slice(0, 4).map((skill, index) => (
                        <Badge key={index} variant="secondary" className="text-xs">
                          {skill}
                        </Badge>
                      ))}
                      {userProfessional.skills.length > 4 && (
                        <Badge variant="outline" className="text-xs">
                          +{userProfessional.skills.length - 4}
                        </Badge>
                      )}
                    </div>

                    <div className="flex gap-2">
                      <Button size="sm" variant="outline">
                        <Edit className="h-4 w-4 mr-2" />
                        Editar Perfil
                      </Button>
                      <Link to={`/profissional/${userProfessional.id}`}>
                        <Button size="sm" variant="outline">
                          <Eye className="h-4 w-4 mr-2" />
                          Ver Como Público
                        </Button>
                      </Link>
                    </div>
                  </div>
                ) : (
                  <div className="text-center py-8">
                    <User className="h-16 w-16 text-muted-foreground mx-auto mb-4" />
                    <h3 className="text-lg font-semibold text-foreground mb-2">
                      Complete seu perfil
                    </h3>
                    <p className="text-muted-foreground mb-4">
                      Crie seu perfil profissional para ser encontrado por empresas.
                    </p>
                    <Link to="/publicar/perfil">
                      <Button>
                        <Plus className="h-4 w-4 mr-2" />
                        Criar Perfil
                      </Button>
                    </Link>
                  </div>
                )}
              </CardContent>
            </Card>
          )}

          {/* Company Content */}
          {user.type === 'company' && (
            <Card className="shadow-card">
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Briefcase className="h-5 w-5 mr-2" />
                  Minhas Oportunidades
                </CardTitle>
              </CardHeader>
              <CardContent>
                {userOpportunities.length > 0 ? (
                  <div className="space-y-4">
                    {userOpportunities.slice(0, 3).map((opportunity) => (
                      <div key={opportunity.id} className="border-b pb-3 last:border-b-0">
                        <h3 className="font-semibold text-foreground">{opportunity.title}</h3>
                        <p className="text-sm text-muted-foreground">{opportunity.companyName}</p>
                        <div className="flex gap-2 mt-2">
                          <Badge variant="secondary" className="text-xs">
                            {opportunity.contractType}
                          </Badge>
                          <Badge variant="outline" className="text-xs">
                            {opportunity.level}
                          </Badge>
                        </div>
                      </div>
                    ))}
                    <div className="flex gap-2 pt-2">
                      <Link to="/publicar/oportunidade">
                        <Button size="sm">
                          <Plus className="h-4 w-4 mr-2" />
                          Nova Oportunidade
                        </Button>
                      </Link>
                      <Button size="sm" variant="outline">
                        <Edit className="h-4 w-4 mr-2" />
                        Gerenciar Todas
                      </Button>
                    </div>
                  </div>
                ) : (
                  <div className="text-center py-8">
                    <Briefcase className="h-16 w-16 text-muted-foreground mx-auto mb-4" />
                    <h3 className="text-lg font-semibold text-foreground mb-2">
                      Publique sua primeira oportunidade
                    </h3>
                    <p className="text-muted-foreground mb-4">
                      Encontre os melhores profissionais tech para sua empresa.
                    </p>
                    <Link to="/publicar/oportunidade">
                      <Button>
                        <Plus className="h-4 w-4 mr-2" />
                        Publicar Oportunidade
                      </Button>
                    </Link>
                  </div>
                )}
              </CardContent>
            </Card>
          )}

          {/* Future Features */}
          <Card className="shadow-card">
            <CardHeader>
              <CardTitle className="flex items-center">
                <Zap className="h-5 w-5 mr-2" />
                Próximas Funcionalidades
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                <div className="flex items-center space-x-3 p-3 bg-muted rounded-lg">
                  <Target className="h-5 w-5 text-primary" />
                  <div>
                    <p className="font-medium text-foreground">Match Inteligente</p>
                    <p className="text-sm text-muted-foreground">
                      Sistema que conecta automaticamente profissionais com oportunidades compatíveis
                    </p>
                  </div>
                </div>
                
                <div className="flex items-center space-x-3 p-3 bg-muted rounded-lg">
                  <Users className="h-5 w-5 text-primary" />
                  <div>
                    <p className="font-medium text-foreground">Chat Integrado</p>
                    <p className="text-sm text-muted-foreground">
                      Converse diretamente com empresas e profissionais na plataforma
                    </p>
                  </div>
                </div>

                <div className="flex items-center space-x-3 p-3 bg-muted rounded-lg">
                  <TrendingUp className="h-5 w-5 text-primary" />
                  <div>
                    <p className="font-medium text-foreground">Analytics Avançado</p>
                    <p className="text-sm text-muted-foreground">
                      Insights detalhados sobre performance e engajamento
                    </p>
                  </div>
                </div>
              </div>
              
              <div className="mt-4 p-4 bg-gradient-primary rounded-lg text-center">
                <p className="text-white font-medium mb-2">
                  Fique atento às novidades!
                </p>
                <p className="text-white/90 text-sm">
                  Essas funcionalidades serão lançadas em breve para tornar sua experiência ainda melhor.
                </p>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;