export interface Session {
    id: string;
    abbr: string;
    title: string;
    abstract: string;
    track: string;
    trackId: string;
    type: string;
    day: string;
    hotel: string;
    level: string;
    repeat: boolean;
    rooms: string;
    times: string;
    start: string | null;
    end: string | null;
    repeats: string[];
}

export interface Filters {
    hotels: string[];
    days: string[];
    types: string[];
    levels: string[];
    tracks: string[];
    title: string | null;
    favorites: boolean;
    deletes: boolean;
    repeats: boolean;
    description: string | null;
}

export const DEFAULT_FILTERS: Filters =  {
    days: [],
    hotels: [],
    types: [],
    levels: [],
    tracks: [],
    title: null,
    favorites: false,
    repeats: true,
    deletes: false,
    description: null
}

export interface Preferences {
    applyToRepeats: boolean
}

export const DEFAULT_PREFERENCES: Preferences = {
    applyToRepeats: false
}

export type Favorites = {[id: string]: boolean};
export type Deleted = {[id: string]: boolean}; 