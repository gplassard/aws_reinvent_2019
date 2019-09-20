import { Session, Filters, DEFAULT_FILTERS } from "../model";
import React, { useState } from 'react';
import { Chip, TextField, FormControlLabel, Switch } from "@material-ui/core";
import _ from "lodash";
import Select from 'react-select';
import { ValueType } from "react-select/src/types";
import './SessionFilters.css';

interface Props {
    sessions: Session[]
    sessionsCount: number
    onFiltersChange: (f:Filters) => any
}

const SessionFilters: React.FC<Props> = (props: Props) => {
    const sessions = props.sessions;
    const [filters, setFilters] = useState(DEFAULT_FILTERS);

    const onFieldSelected = (field: 'days' | 'levels' | 'types' | 'hotels') => (value: ValueType<{label: string, value: string}>) => {
      filters[field] = Array.isArray(value) ? value.map(v => v.label) : [];
      setFilters(filters);
      props.onFiltersChange(filters);
    };

    const onFilterTitleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
      filters.title =  event.target.value.toLowerCase()
      setFilters(filters);
      props.onFiltersChange(filters)
    }

    const onSwitch = (field: 'favorites' | 'deletes') => (event: React.ChangeEvent<{}>, checked: boolean) => {
      filters[field] = checked;
      setFilters(filters);
      props.onFiltersChange(filters)
    }

    return (
      <div className="SessionFilters">
        <Select
            placeholder="Choose a day"
            isMulti={true}
            onChange={onFieldSelected('days')}
            options={_.uniq(sessions.map(s => s.day)).map(s => ({label: s, value: s})) }
          />
          <Select
            placeholder="Choose a hotel"
            isMulti={true}
            onChange={onFieldSelected('hotels')}
            options={_.uniq(sessions.map(s => s.hotel)).map(s => ({label: s, value: s})) }
          />
          <Select
            placeholder="Choose a session type"
            isMulti={true}
            onChange={onFieldSelected('types')}
            options={_.uniq(sessions.map(s => s.type)).map(s => ({label: s, value: s})) }
          />
        <Select
            placeholder="Choose a session level"
            isMulti={true}
            onChange={onFieldSelected('levels')}
            options={_.uniq(sessions.map(s => s.level)).map(s => ({label: s, value: s})) }
          />
        <TextField
          className="textField"
          label="Filter by title"
          placeholder="DynamoDB"
          margin="normal"
          onChange={onFilterTitleChange}
        />
         <FormControlLabel
            className="switchField"
            control= {<Switch/>} 
            onChange={onSwitch('favorites')}
            label="Favorites"/>
        <FormControlLabel
            className="switchField"
            control= {<Switch/>} 
            onChange={onSwitch('deletes')}
            label="Deleted"/>
          <Chip label={ props.sessionsCount + ' sessions'} color="primary"/>
        </div> 
    );
  }
  
  export default SessionFilters;


