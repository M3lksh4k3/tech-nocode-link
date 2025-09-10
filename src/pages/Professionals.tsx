import React, { useState } from 'react';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import ProfessionalCard from '@/components/ProfessionalCard';
import { mockProfessionals } from '@/data/mockData';
import { Search, Filter, Users } from 'lucide-react';

const Professionals = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedSkills, setSelectedSkills] = useState<string[]>([]);
  const [selectedLevel, setSelectedLevel] = useState<string>('');
  const [selectedAvailability, setSelectedAvailability] = useState<string>('');

  // Get all unique skills
  const allSkills = [...new Set(mockProfessionals.flatMap(p => p.skills))].sort();
  const levels = ['Júnior', 'Pleno', 'Sênior'];
  const availabilities = ['Disponível', 'Ocupado', 'Procurando Oportunidades'];

  // Filter professionals
  const filteredProfessionals = mockProfessionals.filter(professional => {
    const matchesSearch = professional.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         professional.headline.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         professional.skills.some(skill => skill.toLowerCase().includes(searchTerm.toLowerCase()));
    
    const matchesSkills = selectedSkills.length === 0 || 
                         selectedSkills.some(skill => professional.skills.includes(skill));
    
    const matchesLevel = !selectedLevel || professional.level === selectedLevel;
    const matchesAvailability = !selectedAvailability || professional.availability === selectedAvailability;

    return matchesSearch && matchesSkills && matchesLevel && matchesAvailability;
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
    setSelectedAvailability('');
    setSearchTerm('');
  };

  return (
    <div className="min-h-screen bg-background py-8">
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="text-center mb-12">
          <div className="flex items-center justify-center mb-4">
            <Users className="h-8 w-8 text-primary mr-3" />
            <h1 className="text-4xl font-bold text-foreground">Profissionais Tech</h1>
          </div>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Descubra especialistas em ferramentas low-code/no-code prontos para seus projetos. 
            Cadastre-se para ver informações completas de contato.
          </p>
        </div>

        {/* Search and Filters */}
        <div className="bg-card shadow-card rounded-lg p-6 mb-8">
          {/* Search Bar */}
          <div className="relative mb-6">
            <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Buscar por nome, especialidade ou skill..."
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
                Nível de Experiência
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

            {/* Availability Filter */}
            <div>
              <label className="text-sm font-medium text-foreground mb-2 block">
                Disponibilidade
              </label>
              <div className="flex flex-wrap gap-2">
                {availabilities.map(availability => (
                  <Badge
                    key={availability}
                    variant={selectedAvailability === availability ? "default" : "outline"}
                    className="cursor-pointer"
                    onClick={() => setSelectedAvailability(selectedAvailability === availability ? '' : availability)}
                  >
                    {availability}
                  </Badge>
                ))}
              </div>
            </div>

            {/* Skills Filter */}
            <div>
              <label className="text-sm font-medium text-foreground mb-2 block">
                Skills & Tecnologias
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
            {(selectedSkills.length > 0 || selectedLevel || selectedAvailability || searchTerm) && (
              <div className="flex justify-between items-center pt-2 border-t">
                <span className="text-sm text-muted-foreground">
                  {filteredProfessionals.length} de {mockProfessionals.length} profissionais
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
          {filteredProfessionals.map(professional => (
            <ProfessionalCard 
              key={professional.id} 
              professional={professional} 
            />
          ))}
        </div>

        {/* No Results */}
        {filteredProfessionals.length === 0 && (
          <div className="text-center py-12">
            <Users className="h-16 w-16 text-muted-foreground mx-auto mb-4" />
            <h3 className="text-xl font-semibold text-foreground mb-2">
              Nenhum profissional encontrado
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

export default Professionals;