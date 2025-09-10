import React, { useState } from 'react';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import OpportunityCard from '@/components/OpportunityCard';
import { mockOpportunities } from '@/data/mockData';
import { Search, Filter, Briefcase } from 'lucide-react';

const Opportunities = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedSkills, setSelectedSkills] = useState<string[]>([]);
  const [selectedLevel, setSelectedLevel] = useState<string>('');
  const [selectedContractType, setSelectedContractType] = useState<string>('');
  const [selectedWorkType, setSelectedWorkType] = useState<string>('');

  // Get all unique values for filters
  const allSkills = [...new Set(mockOpportunities.flatMap(o => o.requiredSkills))].sort();
  const levels = ['Júnior', 'Pleno', 'Sênior'];
  const contractTypes = ['PJ', 'CLT', 'Freelancer'];
  const workTypes = ['Presencial', 'Remoto', 'Híbrido'];

  // Filter opportunities
  const filteredOpportunities = mockOpportunities.filter(opportunity => {
    const matchesSearch = opportunity.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         opportunity.companyName.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         opportunity.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         opportunity.requiredSkills.some(skill => skill.toLowerCase().includes(searchTerm.toLowerCase()));
    
    const matchesSkills = selectedSkills.length === 0 || 
                         selectedSkills.some(skill => opportunity.requiredSkills.includes(skill));
    
    const matchesLevel = !selectedLevel || opportunity.level === selectedLevel;
    const matchesContractType = !selectedContractType || opportunity.contractType === selectedContractType;
    const matchesWorkType = !selectedWorkType || opportunity.workType === selectedWorkType;

    return matchesSearch && matchesSkills && matchesLevel && matchesContractType && matchesWorkType;
  });

  const toggleSkill = (skill: string) => {
    setSelectedSkills(prev => 
      prev.includes(skill) 
        ? prev.filter(s => s !== skill)
        : [...prev, skill]
    );
  };

  const clearFilters = () => {
    setSelectedSkills([]);
    setSelectedLevel('');
    setSelectedContractType('');
    setSelectedWorkType('');
    setSearchTerm('');
  };

  return (
    <div className="min-h-screen bg-background py-8">
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="text-center mb-12">
          <div className="flex items-center justify-center mb-4">
            <Briefcase className="h-8 w-8 text-primary mr-3" />
            <h1 className="text-4xl font-bold text-foreground">Oportunidades</h1>
          </div>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Encontre as melhores oportunidades em tecnologia low-code/no-code. 
            Cadastre-se para ver informações completas e entrar em contato com as empresas.
          </p>
        </div>

        {/* Search and Filters */}
        <div className="bg-card shadow-card rounded-lg p-6 mb-8">
          {/* Search Bar */}
          <div className="relative mb-6">
            <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Buscar por título, empresa ou tecnologia..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10"
            />
          </div>

          {/* Filters */}
          <div className="space-y-4">
            {/* Level Filter */}
            <div>
              <label className="text-sm font-medium text-foreground mb-2 block">
                Nível da Vaga
              </label>
              <div className="flex flex-wrap gap-2">
                {levels.map(level => (
                  <Badge
                    key={level}
                    variant={selectedLevel === level ? "default" : "outline"}
                    className="cursor-pointer"
                    onClick={() => setSelectedLevel(selectedLevel === level ? '' : level)}
                  >
                    {level}
                  </Badge>
                ))}
              </div>
            </div>

            {/* Contract Type Filter */}
            <div>
              <label className="text-sm font-medium text-foreground mb-2 block">
                Tipo de Contrato
              </label>
              <div className="flex flex-wrap gap-2">
                {contractTypes.map(type => (
                  <Badge
                    key={type}
                    variant={selectedContractType === type ? "default" : "outline"}
                    className="cursor-pointer"
                    onClick={() => setSelectedContractType(selectedContractType === type ? '' : type)}
                  >
                    {type}
                  </Badge>
                ))}
              </div>
            </div>

            {/* Work Type Filter */}
            <div>
              <label className="text-sm font-medium text-foreground mb-2 block">
                Formato de Trabalho
              </label>
              <div className="flex flex-wrap gap-2">
                {workTypes.map(type => (
                  <Badge
                    key={type}
                    variant={selectedWorkType === type ? "default" : "outline"}
                    className="cursor-pointer"
                    onClick={() => setSelectedWorkType(selectedWorkType === type ? '' : type)}
                  >
                    {type}
                  </Badge>
                ))}
              </div>
            </div>

            {/* Skills Filter */}
            <div>
              <label className="text-sm font-medium text-foreground mb-2 block">
                Tecnologias Desejadas
              </label>
              <div className="flex flex-wrap gap-2 max-h-32 overflow-y-auto">
                {allSkills.map(skill => (
                  <Badge
                    key={skill}
                    variant={selectedSkills.includes(skill) ? "default" : "outline"}
                    className="cursor-pointer"
                    onClick={() => toggleSkill(skill)}
                  >
                    {skill}
                  </Badge>
                ))}
              </div>
            </div>

            {/* Clear Filters */}
            {(selectedSkills.length > 0 || selectedLevel || selectedContractType || selectedWorkType || searchTerm) && (
              <div className="flex justify-between items-center pt-2 border-t">
                <span className="text-sm text-muted-foreground">
                  {filteredOpportunities.length} de {mockOpportunities.length} oportunidades
                </span>
                <Button variant="outline" size="sm" onClick={clearFilters}>
                  <Filter className="h-4 w-4 mr-2" />
                  Limpar Filtros
                </Button>
              </div>
            )}
          </div>
        </div>

        {/* Results */}
        <div className="grid lg:grid-cols-2 xl:grid-cols-3 gap-6">
          {filteredOpportunities.map(opportunity => (
            <OpportunityCard 
              key={opportunity.id} 
              opportunity={opportunity} 
            />
          ))}
        </div>

        {/* No Results */}
        {filteredOpportunities.length === 0 && (
          <div className="text-center py-12">
            <Briefcase className="h-16 w-16 text-muted-foreground mx-auto mb-4" />
            <h3 className="text-xl font-semibold text-foreground mb-2">
              Nenhuma oportunidade encontrada
            </h3>
            <p className="text-muted-foreground mb-4">
              Tente ajustar os filtros ou termo de busca para encontrar mais resultados.
            </p>
            <Button variant="outline" onClick={clearFilters}>
              Limpar Filtros
            </Button>
          </div>
        )}
      </div>
    </div>
  );
};

export default Opportunities;