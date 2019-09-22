
import * as React from 'react';
import 'react-big-scheduler/lib/css/style.css'
import { DragDropContext } from 'react-dnd';
import HTML5Backend from 'react-dnd-html5-backend';
import _ from 'lodash'
import { Session } from '../model';
// tslint:disable-next-line: no-var-requires
const Scheduler = require('react-big-scheduler').default;
// tslint:disable-next-line: no-var-requires
const {SchedulerData, ViewTypes} = require('react-big-scheduler');

interface Props {
    sessions: Session[]
    hotels: string[]
}

const Agenda: React.FC<Props> = (props: Props) => {
    const DEFAULT_SCHEDULER_DATA = new SchedulerData('2019-09-20', ViewTypes.Week, false, false, {
        views: [
            {viewName: 'Day', viewType: ViewTypes.Day, showAgenda: false, isEventPerspective: false},
            {viewName: 'Week', viewType: ViewTypes.Week, showAgenda: false, isEventPerspective: false}
        ]
    });
    DEFAULT_SCHEDULER_DATA.localeMoment.locale('fr');

    const [{data}, setSchedulerData] = React.useState({data: DEFAULT_SCHEDULER_DATA});

    const resources = props.hotels.map(h => ({id: h, name: h}));
    data.setResources(resources);

    const events = _.sortBy(props.sessions.map((s, index) => ({
        start: `2019-09-20T${10 + index}:53:18.637Z`,
        end: `2019-09-20T${11 + index}:53:18.637Z`,
        resourceId: s.hotel,
        title: s.abbr + " " + s.title,
        id: s.id
    })), event => event.start);
    data.setEvents(events);

    const next = (schedulerData: any) => {
        schedulerData.next();
        schedulerData.setEvents(events);
        setSchedulerData({data: schedulerData});
    };
    const previous = (schedulerData: any) => {
        schedulerData.prev();
        schedulerData.setEvents(events);
        setSchedulerData({data: schedulerData});
    };
    const selectDate = (schedulerData: any, date: any) => {
        schedulerData.setDate(date);
        schedulerData.setEvents(events);
        setSchedulerData({data: schedulerData});
    };
    const changeView = (schedulerData: any, view: any) => {
        schedulerData.setViewType(view.viewType, view.showAgenda, view.isEventPerspective);
        schedulerData.setEvents(events);
        setSchedulerData({data: schedulerData});
    };
   
    return <Scheduler schedulerData={data}
            nextClick={next}
            prevClick={previous}
            onSelectDate={selectDate}
            onViewChange={changeView}/>;
  };

  export default DragDropContext(HTML5Backend)(Agenda); 