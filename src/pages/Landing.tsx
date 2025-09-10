import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Building, User, Code2, Zap, Users, Target } from 'lucide-react';

const Landing = () => {
  return (
    <div className="min-h-screen bg-background">
      {/* Hero Section */}
      <section className="bg-gradient-hero py-20 px-4">
        <div className="container mx-auto text-center">
          <div className="max-w-4xl mx-auto">
            <h1 className="text-5xl md:text-6xl font-bold text-white mb-6">
              Conectamos
              <span className="bg-white text-primary px-4 py-2 rounded-lg inline-block mx-2">
                Talentos Tech
              </span>
              com Oportunidades
            </h1>
            <p className="text-xl text-white/90 mb-8 max-w-2xl mx-auto">
              A primeira plataforma brasileira focada em profissionais e empresas do ecossistema 
              <strong> low-code/no-code</strong>. Conecte-se com as melhores oportunidades do mercado.
            </p>
            
            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-12">
              <Link to="/signup">
                <Button size="lg" className="bg-white text-primary hover:bg-white/90 px-8 py-4 text-lg">
                  <Building className="h-5 w-5 mr-2" />
                  Sou Empresa
                </Button>
              </Link>
              <Link to="/signup">
                <Button 
                  size="lg" 
                  variant="outline" 
                  className="bg-white/10 border-white/20 text-white hover:bg-white/20 px-8 py-4 text-lg"
                >
                  <User className="h-5 w-5 mr-2" />
                  Sou Profissional
                </Button>
              </Link>
            </div>

            {/* Partnership Badge */}
            <div className="bg-white/10 backdrop-blur-sm rounded-lg p-4 inline-block">
              <p className="text-white/90 text-sm">
                Uma parceria entre <span className="font-bold">SEBRAE</span> e <span className="font-bold">SERRATEC</span>
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 px-4">
        <div className="container mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-foreground mb-4">
              Como Funciona o TechConnect
            </h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Plataforma simples e intuitiva para conectar o melhor do ecossistema tech brasileiro
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8 mb-16">
            <Card className="shadow-card hover:shadow-hover transition-smooth">
              <CardContent className="p-8 text-center">
                <div className="w-16 h-16 bg-gradient-primary rounded-full flex items-center justify-center mx-auto mb-6">
                  <Code2 className="h-8 w-8 text-white" />
                </div>
                <h3 className="text-xl font-semibold mb-4">Navegação Pública</h3>
                <p className="text-muted-foreground">
                  Explore perfis de profissionais e oportunidades sem necessidade de cadastro. 
                  Veja as competências e projetos disponíveis.
                </p>
              </CardContent>
            </Card>

            <Card className="shadow-card hover:shadow-hover transition-smooth">
              <CardContent className="p-8 text-center">
                <div className="w-16 h-16 bg-gradient-primary rounded-full flex items-center justify-center mx-auto mb-6">
                  <Zap className="h-8 w-8 text-white" />
                </div>
                <h3 className="text-xl font-semibold mb-4">Acesso Completo</h3>
                <p className="text-muted-foreground">
                  Cadastre-se para ver informações completas, dados de contato e 
                  interagir diretamente com profissionais e empresas.
                </p>
              </CardContent>
            </Card>

            <Card className="shadow-card hover:shadow-hover transition-smooth">
              <CardContent className="p-8 text-center">
                <div className="w-16 h-16 bg-gradient-primary rounded-full flex items-center justify-center mx-auto mb-6">
                  <Target className="h-8 w-8 text-white" />
                </div>
                <h3 className="text-xl font-semibold mb-4">Matches Inteligentes</h3>
                <p className="text-muted-foreground">
                  Em breve: sistema de compatibilidade inteligente que conecta 
                  automaticamente profissionais com as oportunidades ideais.
                </p>
              </CardContent>
            </Card>
          </div>

          {/* Stats Section */}
          <div className="bg-gradient-card rounded-2xl p-8 shadow-card">
            <div className="grid md:grid-cols-4 gap-8 text-center">
              <div>
                <div className="text-3xl font-bold text-primary mb-2">200+</div>
                <div className="text-muted-foreground">Profissionais Cadastrados</div>
              </div>
              <div>
                <div className="text-3xl font-bold text-primary mb-2">150+</div>
                <div className="text-muted-foreground">Empresas Ativas</div>
              </div>
              <div>
                <div className="text-3xl font-bold text-primary mb-2">500+</div>
                <div className="text-muted-foreground">Oportunidades Publicadas</div>
              </div>
              <div>
                <div className="text-3xl font-bold text-primary mb-2">95%</div>
                <div className="text-muted-foreground">Taxa de Satisfação</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Technologies Section */}
      <section className="py-20 px-4 bg-muted">
        <div className="container mx-auto text-center">
          <h2 className="text-4xl font-bold text-foreground mb-8">
            Tecnologias em Destaque
          </h2>
          <p className="text-xl text-muted-foreground mb-12 max-w-2xl mx-auto">
            Conectamos profissionais especialistas nas principais ferramentas do mercado low-code/no-code
          </p>
          
          <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-6">
            {[
              'Bubble', 'FlutterFlow', 'Make', 'Webflow', 'Zapier', 
              'Airtable', 'Notion', 'AppSheet', 'Power Apps', 'Shopify',
              'ActivePieces', 'N8N'
            ].map((tech, index) => (
              <div 
                key={index}
                className="bg-white rounded-lg p-4 shadow-card hover:shadow-hover transition-smooth"
              >
                <div className="text-sm font-medium text-foreground">{tech}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-4 bg-gradient-primary">
        <div className="container mx-auto text-center">
          <h2 className="text-4xl font-bold text-white mb-6">
            Pronto para Começar?
          </h2>
          <p className="text-xl text-white/90 mb-8 max-w-2xl mx-auto">
            Junte-se à maior comunidade de profissionais e empresas tech do Brasil. 
            Comece sua jornada hoje mesmo.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link to="/profissionais">
              <Button size="lg" className="bg-white text-primary hover:bg-white/90">
                <Users className="h-5 w-5 mr-2" />
                Explorar Profissionais
              </Button>
            </Link>
            <Link to="/oportunidades">
              <Button 
                size="lg" 
                variant="outline"
                className="bg-white/10 border-white/20 text-white hover:bg-white/20"
              >
                <Target className="h-5 w-5 mr-2" />
                Ver Oportunidades
              </Button>
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Landing;