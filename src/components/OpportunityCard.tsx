import React from 'react';
import { Link } from 'react-router-dom';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Opportunity } from '../types';
import { MapPin, Building, Eye, Clock, DollarSign } from 'lucide-react';

interface OpportunityCardProps {
  opportunity: Opportunity;
  showFullDetails?: boolean;
}

const OpportunityCard: React.FC<OpportunityCardProps> = ({ 
  opportunity, 
  showFullDetails = false 
}) => {
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
    <Card className="bg-gradient-card shadow-card hover:shadow-hover transition-smooth group">
      <CardHeader className="pb-3">
        <div className="flex items-start justify-between">
          <div className="flex items-center space-x-3">
            <div className="w-12 h-12 bg-gradient-primary rounded-full flex items-center justify-center">
              <Building className="h-6 w-6 text-white" />
            </div>
            <div>
              <h3 className="font-semibold text-lg text-foreground group-hover:text-primary transition-smooth">
                {opportunity.title}
              </h3>
              <p className="text-sm text-muted-foreground font-medium">
                {opportunity.companyName}
              </p>
            </div>
          </div>
          <div className="flex flex-col gap-1">
            <Badge className={contractTypeColor[opportunity.contractType]}>
              {opportunity.contractType}
            </Badge>
          </div>
        </div>
      </CardHeader>

      <CardContent className="space-y-4">
        {/* Level & Work Type */}
        <div className="flex gap-2">
          <Badge className={levelColor[opportunity.level]}>
            {opportunity.level}
          </Badge>
          <Badge className={workTypeColor[opportunity.workType]}>
            {opportunity.workType}
          </Badge>
        </div>

        {/* Required Skills */}
        <div className="flex flex-wrap gap-2">
          {opportunity.requiredSkills.slice(0, 4).map((skill, index) => (
            <Badge key={index} variant="secondary" className="text-xs">
              {skill}
            </Badge>
          ))}
          {opportunity.requiredSkills.length > 4 && (
            <Badge variant="outline" className="text-xs">
              +{opportunity.requiredSkills.length - 4}
            </Badge>
          )}
        </div>

        {/* Location & Budget */}
        <div className="space-y-2">
          <div className="flex items-center text-sm text-muted-foreground">
            <MapPin className="h-4 w-4 mr-2" />
            {opportunity.location}
          </div>
          {opportunity.budgetRange && (
            <div className="flex items-center text-sm text-muted-foreground">
              <DollarSign className="h-4 w-4 mr-2" />
              {opportunity.budgetRange}
            </div>
          )}
        </div>

        {/* Description Preview */}
        <p className="text-sm text-muted-foreground line-clamp-2">
          {opportunity.description}
        </p>

        {/* Contact Info (only shown if showFullDetails is true) */}
        {showFullDetails && (opportunity.contactEmail || opportunity.contactPhone) && (
          <div className="space-y-2 pt-2 border-t">
            {opportunity.contactEmail && (
              <p className="text-sm">
                <span className="font-medium">Email:</span> {opportunity.contactEmail}
              </p>
            )}
            {opportunity.contactPhone && (
              <p className="text-sm">
                <span className="font-medium">Telefone:</span> {opportunity.contactPhone}
              </p>
            )}
            {opportunity.companyWebsite && (
              <p className="text-sm">
                <span className="font-medium">Website:</span>{' '}
                <a 
                  href={opportunity.companyWebsite} 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="text-primary hover:underline"
                >
                  Visitar site
                </a>
              </p>
            )}
          </div>
        )}

        {/* Posted Date & Action */}
        <div className="flex items-center justify-between pt-2">
          <div className="flex items-center text-xs text-muted-foreground">
            <Clock className="h-3 w-3 mr-1" />
            {new Date(opportunity.createdAt).toLocaleDateString('pt-BR')}
          </div>
          <Link to={`/oportunidade/${opportunity.id}`}>
            <Button size="sm" variant="outline">
              <Eye className="h-4 w-4 mr-2" />
              {showFullDetails ? 'Ver Oportunidade Completa' : 'Ver Detalhes'}
            </Button>
          </Link>
        </div>
      </CardContent>
    </Card>
  );
};

export default OpportunityCard;