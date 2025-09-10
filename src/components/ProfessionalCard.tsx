import React from 'react';
import { Link } from 'react-router-dom';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Professional } from '../types';
import { MapPin, User, Eye } from 'lucide-react';

interface ProfessionalCardProps {
  professional: Professional;
  showFullDetails?: boolean;
}

const ProfessionalCard: React.FC<ProfessionalCardProps> = ({ 
  professional, 
  showFullDetails = false 
}) => {
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
    <Card className="bg-gradient-card shadow-card hover:shadow-hover transition-smooth group">
      <CardHeader className="pb-3">
        <div className="flex items-start justify-between">
          <div className="flex items-center space-x-3">
            <div className="w-12 h-12 bg-gradient-primary rounded-full flex items-center justify-center">
              <User className="h-6 w-6 text-white" />
            </div>
            <div>
              <h3 className="font-semibold text-lg text-foreground group-hover:text-primary transition-smooth">
                {professional.name}
              </h3>
              <p className="text-sm text-muted-foreground">{professional.headline}</p>
            </div>
          </div>
          <Badge className={levelColor[professional.level]}>
            {professional.level}
          </Badge>
        </div>
      </CardHeader>

      <CardContent className="space-y-4">
        {/* Skills */}
        <div className="flex flex-wrap gap-2">
          {professional.skills.slice(0, 4).map((skill, index) => (
            <Badge key={index} variant="secondary" className="text-xs">
              {skill}
            </Badge>
          ))}
          {professional.skills.length > 4 && (
            <Badge variant="outline" className="text-xs">
              +{professional.skills.length - 4}
            </Badge>
          )}
        </div>

        {/* Location & Availability */}
        <div className="space-y-2">
          <div className="flex items-center text-sm text-muted-foreground">
            <MapPin className="h-4 w-4 mr-2" />
            {professional.location}
          </div>
          <Badge className={availabilityColor[professional.availability]}>
            {professional.availability}
          </Badge>
        </div>

        {/* Bio Preview */}
        <p className="text-sm text-muted-foreground line-clamp-2">
          {professional.bio}
        </p>

        {/* Contact Info (only shown if showFullDetails is true) */}
        {showFullDetails && (professional.email || professional.phone) && (
          <div className="space-y-2 pt-2 border-t">
            {professional.email && (
              <p className="text-sm">
                <span className="font-medium">Email:</span> {professional.email}
              </p>
            )}
            {professional.phone && (
              <p className="text-sm">
                <span className="font-medium">Telefone:</span> {professional.phone}
              </p>
            )}
            {professional.portfolio && (
              <p className="text-sm">
                <span className="font-medium">Portfolio:</span>{' '}
                <a 
                  href={professional.portfolio} 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="text-primary hover:underline"
                >
                  Ver portfolio
                </a>
              </p>
            )}
          </div>
        )}

        {/* Action Button */}
        <div className="pt-2">
          <Link to={`/profissional/${professional.id}`}>
            <Button className="w-full" variant="outline">
              <Eye className="h-4 w-4 mr-2" />
              {showFullDetails ? 'Ver Perfil Completo' : 'Ver Detalhes'}
            </Button>
          </Link>
        </div>
      </CardContent>
    </Card>
  );
};

export default ProfessionalCard;