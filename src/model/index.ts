export interface Session {
    id: string;
    abbr: string;
    title: string;
    abstract: string;
    type: string;
    day: string;
    hotel: string;
    level: string;
    rooms: string;
    times: string;
}

export interface Filters {
    hotels: string[];
    days: string[];
    types: string[];
    levels: string[];
    title: string | null;
    favorites: boolean;
    deletes: boolean;
    description: string | null;
}

export const DEFAULT_FILTERS: Filters =  {
    days: [],
    hotels: [],
    types: [],
    levels: [],
    title: null,
    favorites: false,
    deletes: false,
    description: null
}

export type Favorites = {[id: string]: boolean};
export type Deleted = {[id: string]: boolean}; 