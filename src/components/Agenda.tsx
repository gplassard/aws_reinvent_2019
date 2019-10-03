
import  React, {Fragment} from 'react';
import 'react-big-scheduler/lib/css/style.css'
import { DragDropContext } from 'react-dnd';
import HTML5Backend from 'react-dnd-html5-backend';
import _ from 'lodash'
import { Session } from '../model';
import SessionDialog from './dialogs/SessionDialog';
// tslint:disable-next-line: no-var-requires
const Scheduler = require('react-big-scheduler').default;
// tslint:disable-next-line: no-var-requires
const {SchedulerData, ViewTypes} = require('react-big-scheduler');

interface Props {
    sessions: Session[]
    hotels: string[]
    favorites:  {[id: string]: boolean}
    deleted: {[id: string]: boolean}
    onFavorite: (id: string, isFavorite: boolean) => any
    onDelete: (id: string, isDelete: boolean) => any
}

const Agenda: React.FC<Props> = (props: Props) => {
    const DEFAULT_SCHEDULER_DATA = new SchedulerData('2019-12-04', ViewTypes.Week, false, false, {
        views: [
            {viewName: 'Day', viewType: ViewTypes.Day, showAgenda: false, isEventPerspective: false},
            {viewName: 'Week', viewType: ViewTypes.Week, showAgenda: false, isEventPerspective: false}
        ]
    });
    DEFAULT_SCHEDULER_DATA.localeMoment.locale('fr');

    const [{data}, setSchedulerData] = React.useState({data: DEFAULT_SCHEDULER_DATA});
    const [dialogSession, setDialogSession] = React.useState<Session | null>(null);

    const resources = props.hotels.map(h => ({id: h, name: h}));
    data.setResources(resources);

    const events = _.sortBy(props.sessions.map((s, index) => ({
        start: s.start,
        end: s.end,
        resourceId: s.hotel,
        title: s.abbr + " " + s.title,
        id: s.id,
        data: s
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

    const eventClicked = (schedulerData: any, event: any) => {
        setDialogSession(event.data);
    };
   
    return (<Fragment>
        <Scheduler schedulerData={data}
            nextClick={next}
            prevClick={previous}
            onSelectDate={selectDate}
            eventItemClick={eventClicked}
            onViewChange={changeView}/>
        <SessionDialog session={dialogSession} 
            onClose={() => setDialogSession(null)} 
            favorite={dialogSession != null && !!props.favorites[dialogSession.id]}
            deleted={dialogSession != null && !!props.deleted[dialogSession.id]}
            onDelete={props.onDelete} 
            onFavorite={props.onFavorite}></SessionDialog>
    </Fragment>);
  };

  export default DragDropContext(HTML5Backend)(Agenda); 