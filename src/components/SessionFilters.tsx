import { Session, Filters } from "../model";
import React from 'react';
import { Chip, TextField, FormControlLabel, Switch } from "@material-ui/core";
import _ from "lodash";
import Select from 'react-select';
import { ValueType } from "react-select/src/types";
import './SessionFilters.scss';

interface Props {
    sessions: Session[]
    sessionsCount: number
    onFiltersChange: (f:Filters) => any
    filters: Filters
}

const SessionFilters: React.FC<Props> = (props: Props) => {
    const sessions = props.sessions;

    const onFieldSelected = (field: 'days' | 'levels' | 'types' | 'hotels' | 'tracks') => (value: ValueType<{label: string, value: string}>) => {
      props.filters[field] = Array.isArray(value) ? value.map(v => v.label) : [];
      props.onFiltersChange(props.filters);
    };

    const onFilterTitleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
      props.filters.title =  event.target.value.toLowerCase()
      props.onFiltersChange(props.filters)
    }

    const onSwitch = (field: 'favorites' | 'deletes') => (event: React.ChangeEvent<{}>, checked: boolean) => {
      props.filters[field] = checked;
      props.onFiltersChange(props.filters)
    }

    return (
      <div className="SessionFilters">
        <Select
            className="multi-select"
            placeholder="Choose a day"
            isMulti={true}
            onChange={onFieldSelected('days')}
            options={_.uniq(sessions.map(s => s.day)).map(s => ({label: s, value: s})) }
          />
          <Select
            className="multi-select"
            placeholder="Choose a hotel"
            isMulti={true}
            onChange={onFieldSelected('hotels')}
            options={_.uniq(sessions.map(s => s.hotel)).map(s => ({label: s, value: s})) }
          />
          <Select
            className="multi-select"
            placeholder="Choose a session type"
            isMulti={true}
            onChange={onFieldSelected('types')}
            options={_.uniq(sessions.map(s => s.type)).map(s => ({label: s, value: s})) }
          />
        <Select
            className="multi-select"
            placeholder="Choose a session level"
            isMulti={true}
            onChange={onFieldSelected('levels')}
            options={_.uniq(sessions.map(s => s.level)).map(s => ({label: s, value: s})) }
          />
        <Select
            className="multi-select"
            placeholder="Choose a track"
            isMulti={true}
            onChange={onFieldSelected('tracks')}
            options={_.uniq(sessions.map(s => s.track)).map(s => ({label: s, value: s})) }
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


