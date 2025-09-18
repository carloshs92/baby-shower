import { Filter } from 'lucide-react';

import { Button } from '@/components/ui/button';

interface ProductFilterProps {
  readonly showOnlyAvailable: boolean;
  readonly showOnlyUserSelections: boolean;
  readonly onToggleFilter: () => void;
  readonly onToggleUserSelections: () => void;
  readonly availableCount: number;
  readonly userSelectionsCount: number;
  readonly totalCount: number;
}

export function ProductFilter({ 
  showOnlyAvailable, 
  showOnlyUserSelections,
  onToggleFilter, 
  onToggleUserSelections,
  availableCount, 
  userSelectionsCount,
  totalCount 
}: ProductFilterProps) {
  return (
    <div className="flex items-center justify-between mb-6 py-2 md:py-4 px-3 md:px-4 bg-white/80 backdrop-blur-sm rounded-lg border border-purple-100 shadow-sm">
      <div className="flex items-center gap-4 justify-center w-full md:justify-start">
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
        
        <Button
          variant={showOnlyUserSelections ? "default" : "outline"}
          size="sm"
          onClick={onToggleUserSelections}
          className={`text-xs h-8 ${
            showOnlyUserSelections 
              ? "bg-pink-600 hover:bg-pink-700 text-white" 
              : "border-pink-200 hover:bg-pink-500 text-pink-700"
          }`}
        >
          {showOnlyUserSelections ? "Mostrar todos" : "Mis elecciones"}
        </Button>
      </div>
      
       <div className="text-sm text-gray-600 hidden md:block w-60 text-right">
         {(() => {
           if (showOnlyAvailable) {
             return (
               <span>
                 Mostrando <span className="font-semibold text-purple-600">{availableCount}</span> de {totalCount} regalos
               </span>
             );
           }
           if (showOnlyUserSelections) {
             return (
               <span>
                 Mostrando <span className="font-semibold text-pink-600">{userSelectionsCount}</span> de {totalCount} regalos
               </span>
             );
           }
           return (
             <span>
               <span className="font-semibold text-purple-600">{totalCount}</span> regalos en total
             </span>
           );
         })()}
       </div>
    </div>
  );
}
