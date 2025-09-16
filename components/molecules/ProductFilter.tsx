import { Filter } from 'lucide-react';

import { Button } from '@/components/ui/button';

interface ProductFilterProps {
  showOnlyAvailable: boolean;
  onToggleFilter: () => void;
  availableCount: number;
  totalCount: number;
}

export function ProductFilter({ 
  showOnlyAvailable, 
  onToggleFilter, 
  availableCount, 
  totalCount 
}: ProductFilterProps) {
  return (
    <div className="flex items-center justify-between mb-6 p-4 bg-white/80 backdrop-blur-sm rounded-lg border border-purple-100 shadow-sm">
      <div className="flex items-center gap-4">
        <div className="hidden md:flex items-center gap-2">
          <Filter className="h-4 w-4 text-purple-600" />
          <span className="text-sm font-medium text-gray-700">Filtros:</span>
        </div>
        
        <Button
          variant={showOnlyAvailable ? "default" : "outline"}
          size="sm"
          onClick={onToggleFilter}
          className={`text-xs h-8 ${
            showOnlyAvailable 
              ? "bg-purple-600 hover:bg-purple-700 text-white" 
              : "border-purple-200 hover:bg-purple-500 text-purple-700"
          }`}
        >
          {showOnlyAvailable ? "Mostrar todos" : "Solo disponibles"}
        </Button>
      </div>
      
      <div className="text-sm text-gray-600">
        {showOnlyAvailable ? (
          <span>
            Mostrando <span className="font-semibold text-purple-600">{availableCount}</span> de {totalCount} regalos
          </span>
        ) : (
          <span>
            <span className="font-semibold text-purple-600">{totalCount}</span> regalos en total
          </span>
        )}
      </div>
    </div>
  );
}
