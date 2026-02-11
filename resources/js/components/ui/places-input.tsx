import * as React from "react";
import { cn } from "@/lib/utils";
import { AlertCircle } from "lucide-react";
import { Label } from "@/components/ui/label";
import mapboxgl from 'mapbox-gl';
import MapboxGeocoder from '@mapbox/mapbox-gl-geocoder';

import '@mapbox/mapbox-gl-geocoder/dist/mapbox-gl-geocoder.css';

export interface PlacesInputProps
  extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  icon?: React.ReactNode;
  tooltipContent?: React.ReactNode;
  error?: string;
  onPlaceSelect?: (place: MapboxPlaceResult) => void;
  componentRestrictions?: { country: string | string[] };
  types?: string[];
}

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

const PlacesInput = React.forwardRef<HTMLInputElement, PlacesInputProps>(
  ({
    className,
    label,
    icon,
    tooltipContent,
    error,
    onPlaceSelect,
    componentRestrictions = { country: "ph" },
    types = [],
    disabled = false,
    ...props
  }, ref) => {
    const inputRef = React.useRef<HTMLInputElement>(null);
    const geocoderInstanceRef = React.useRef<InstanceType<typeof MapboxGeocoder> | null>(null);
    const containerRef = React.useRef<HTMLDivElement>(null);

    React.useImperativeHandle(ref, () => inputRef.current!);

    React.useEffect(() => {
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

    React.useEffect(() => {
      if (!containerRef.current || !mapboxgl.accessToken) return;
      
      try {
        const mapboxTypes = getMapboxTypes();
        const countries = Array.isArray(componentRestrictions.country) 
          ? componentRestrictions.country 
          : [componentRestrictions.country];

        const geocoder = new MapboxGeocoder({
          accessToken: mapboxgl.accessToken,
          types: mapboxTypes.length > 0 ? mapboxTypes.join(',') : undefined,
          countries: countries.join(','),
          placeholder: props.placeholder || 'Search for a location',
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
            geocoderInput.className = cn(
              "flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50",
              className
            );
            (geocoderInput as HTMLInputElement).disabled = disabled;
          }
        }

        geocoder.on('result', (event: { result: MapboxPlaceResult }) => {
          if (onPlaceSelect) {
            onPlaceSelect(event.result);
          }
        });

        return () => {
          if (geocoderInstanceRef.current) {
            geocoderInstanceRef.current.off('result', () => {});
          }
        };
      } catch (error) {
        console.error("Error initializing Places Autocomplete:", error);
      }
    }, [componentRestrictions, types, onPlaceSelect, props.placeholder, disabled, className]);

    return (
      <div className="space-y-2">
        {label && (
          <Label htmlFor={props.id} className="flex items-center gap-1.5">
            {icon}
            {label}
            {tooltipContent}
          </Label>
        )}
        <div ref={containerRef} className="mapbox-geocoder-container" />
        <input
          className="hidden"
          ref={inputRef}
          disabled={disabled}
          {...props}
        />
        {error && (
          <div className="text-sm text-destructive flex items-center gap-1">
            <AlertCircle className="h-3.5 w-3.5" />
            {error}
          </div>
        )}
      </div>
    );
  }
);

PlacesInput.displayName = "PlacesInput";

export { PlacesInput };
