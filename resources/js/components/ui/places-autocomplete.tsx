import React, { useEffect, useRef, useState } from 'react';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { AlertCircle } from 'lucide-react';
import mapboxgl from 'mapbox-gl';
import MapboxGeocoder from '@mapbox/mapbox-gl-geocoder';

import '@mapbox/mapbox-gl-geocoder/dist/mapbox-gl-geocoder.css';

type PlacesAutocompleteProps = {
  label: string;
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
  onPlaceSelect?: (place: MapboxPlaceResult) => void;
  className?: string;
  icon?: React.ReactNode;
  tooltipContent?: React.ReactNode;
  componentRestrictions?: { country: string | string[] };
  types?: string[];
  error?: string;
  required?: boolean;
  disabled?: boolean;
};

export interface MapboxPlaceResult {
  id: string;
  place_name: string;
  text: string;
  address?: string;
  context?: MapboxContext[];
  geometry: {
    type: string;
    coordinates: [number, number];
  };
  place_type: string[];
}

export interface MapboxContext {
  id: string;
  text: string;
  short_code?: string;
  wikidata?: string;
}

const googleToMapboxTypes: Record<string, string[]> = {
  '(regions)': ['region', 'place'],
  'locality': ['place', 'locality'],
  'administrative_area_level_1': ['region'],
  'administrative_area_level_2': ['district', 'place'],
  'address': ['address', 'place', 'poi'],
  'establishment': ['poi', 'place'],
};

export function PlacesAutocomplete({
  label,
  value,
  onChange,
  placeholder,
  onPlaceSelect,
  className,
  icon,
  tooltipContent,
  componentRestrictions = { country: 'ph' },
  types = ['(regions)', 'locality', 'administrative_area_level_1', 'administrative_area_level_2'],
  error,
  required = false,
  disabled = false,
}: PlacesAutocompleteProps) {
  const inputRef = useRef<HTMLInputElement>(null);
  const geocoderInstanceRef = useRef<InstanceType<typeof MapboxGeocoder> | null>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const [inputValue, setInputValue] = useState(value);

  useEffect(() => {
    const accessToken = import.meta.env.VITE_MAPBOX_ACCESS_TOKEN;
    if (accessToken) {
      mapboxgl.accessToken = accessToken;
    }
  }, []);

  const getMapboxTypes = (): string[] => {
    const mapboxTypes: string[] = [];
    types.forEach(type => {
      const mapped = googleToMapboxTypes[type];
      if (mapped) {
        mapboxTypes.push(...mapped);
      }
    });
    return [...new Set(mapboxTypes)];
  };

  useEffect(() => {
    if (!containerRef.current || !mapboxgl.accessToken) return;

    const mapboxTypes = getMapboxTypes();
    const countries = Array.isArray(componentRestrictions.country) 
      ? componentRestrictions.country 
      : [componentRestrictions.country];

    const geocoder = new MapboxGeocoder({
      accessToken: mapboxgl.accessToken,
      types: mapboxTypes.length > 0 ? mapboxTypes.join(',') : undefined,
      countries: countries.join(','),
      placeholder: placeholder || 'Search for a location',
      limit: 5,
      minLength: 2,
      fuzzyMatch: true,
      routing: false,
    });

    geocoderInstanceRef.current = geocoder;

    if (containerRef.current) {
      containerRef.current.innerHTML = '';
      const mockMap = {} as mapboxgl.Map;
      containerRef.current.appendChild(geocoder.onAdd(mockMap));
      
      const geocoderInput = containerRef.current.querySelector('.mapboxgl-ctrl-geocoder input');
      if (geocoderInput) {
        geocoderInput.className = 'flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50';
        (geocoderInput as HTMLInputElement).value = inputValue;
        (geocoderInput as HTMLInputElement).disabled = disabled;
        
        geocoderInput.addEventListener('input', (e) => {
          const target = e.target as HTMLInputElement;
          setInputValue(target.value);
          onChange(target.value);
        });
      }
    }

    geocoder.on('result', (event: { result: MapboxPlaceResult }) => {
      const result = event.result;
      let selectedValue = '';
      
      if (types.includes('(regions)') || types.includes('administrative_area_level_1')) {
        const regionContext = result.context?.find(ctx => ctx.id.startsWith('region.'));
        if (regionContext) {
          selectedValue = regionContext.text;
        } else if (result.place_type.includes('region')) {
          selectedValue = result.text;
        } else {
          selectedValue = result.place_name || result.text;
        }
      } else if (types.includes('locality') || types.includes('administrative_area_level_2')) {
        const placeContext = result.context?.find(ctx => ctx.id.startsWith('place.'));
        if (placeContext) {
          selectedValue = placeContext.text;
        } else if (result.place_type.includes('place')) {
          selectedValue = result.text;
        } else {
          selectedValue = result.place_name || result.text;
        }
      } else if (types.includes('address') || types.includes('establishment')) {
        if (result.address) {
          selectedValue = `${result.address} ${result.text}`;
        } else {
          const parts = result.place_name?.split(',');
          selectedValue = parts ? parts[0].trim() : result.text;
        }
      } else {
        selectedValue = result.place_name || result.text;
      }

      setInputValue(selectedValue);
      onChange(selectedValue);

      if (onPlaceSelect) {
        onPlaceSelect(result);
      }
    });

    geocoder.on('clear', () => {
      setInputValue('');
      onChange('');
    });

    return () => {
      if (geocoderInstanceRef.current) {
        geocoderInstanceRef.current.off('result', () => {});
        geocoderInstanceRef.current.off('clear', () => {});
      }
    };
  }, [mapboxgl.accessToken, types, componentRestrictions, placeholder, disabled]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(e.target.value);
    onChange(e.target.value);
  };

  useEffect(() => {
    setInputValue(value);
    if (containerRef.current) {
      const geocoderInput = containerRef.current.querySelector('.mapboxgl-ctrl-geocoder input') as HTMLInputElement;
      if (geocoderInput && geocoderInput.value !== value) {
        geocoderInput.value = value;
      }
    }
  }, [value]);

  return (
    <div className={`space-y-2 ${className}`}>
      <Label htmlFor={label.replace(/\s+/g, '-').toLowerCase()} className="flex items-center gap-1.5">
        {icon}
        {label}
        {tooltipContent}
      </Label>
      <div ref={containerRef} className="mapbox-geocoder-container" />
      <Input
        id={label.replace(/\s+/g, '-').toLowerCase()}
        ref={inputRef}
        value={inputValue}
        onChange={handleInputChange}
        placeholder={placeholder}
        disabled={disabled}
        required={required}
        className="hidden"
      />
      {error && (
        <div className="text-sm text-red-500 flex items-center gap-1">
          <AlertCircle className="h-3.5 w-3.5" />
          {error}
        </div>
      )}
    </div>
  );
}
