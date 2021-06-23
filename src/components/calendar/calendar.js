import React from "react";
import FullCalendar, { formatDate } from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import timeGridPlugin from "@fullcalendar/timegrid";
import interactionPlugin from "@fullcalendar/interaction";
import { INITIAL_EVENTS, createEventId, getEvents } from "./event-utils";
import Popup from "../modal/Popup";
import { Container } from "@material-ui/core";

export default class Calendar extends React.Component {
  state = {
    weekendsVisible: true,
    currentEvents: [],
    visibleModal: false,
    form: {},
    selectInfo: {},
    INITIAL_EVENTS_API: null,
    INITIAL_CHARGERS_API: null,
  };

  componentDidMount() {
    this.getApi();
  }

  render() {
    return (
      <div className="demo-app">
        {this.renderSidebar()}
        <div className="demo-app-main">
          <FullCalendar
            plugins={[dayGridPlugin, timeGridPlugin, interactionPlugin]}
            headerToolbar={{
              left: "prev,next today",
              center: "title",
              right: "dayGridMonth,timeGridWeek,timeGridDay",
            }}
            initialView="timeGridDay"
            editable={true}
            selectable={true}
            selectMirror={true}
            dayMaxEvents={true}
            weekends={this.state.weekendsVisible}
            initialEvents={this.state.INITIAL_EVENTS_API} // alternatively, use the `events` setting to fetch from a feed
            select={this.handleDateSelect}
            eventContent={renderEventContent} // custom render function
            eventClick={this.handleEventClick}
            eventsSet={this.handleEvents} // called after events are initialized/added/changed/removed
            /* you can update a remote database when these fire:
            eventAdd={function(){}}
            eventChange={function(){}}
            eventRemove={function(){}}
            */
          />
        </div>
        <Popup
          visibleModal={this.state.visibleModal}
          onInputChange={this.onInputChange}
          setVisibleModal={this.setVisibleModal}
          form={this.state.form}
          saveEventCalendar={this.saveEventCalendar}
          selectInfo={this.state.selectInfo}
        ></Popup>
      </div>
    );
  }

  renderSidebar() {
    return (
      <div className="demo-app-sidebar">
        <div className="demo-app-sidebar-section">
          <h2>Instructions</h2>
          <ul>
            <li>Select dates and you will be prompted to create a new event</li>
            <li>Drag, drop, and resize events</li>
            <li>Click an event to delete it</li>
          </ul>
        </div>
        <div className="demo-app-sidebar-section">
          <label>
            <input
              type="checkbox"
              checked={this.state.weekendsVisible}
              onChange={this.handleWeekendsToggle}
            ></input>
            toggle weekends
          </label>
        </div>
        <div className="demo-app-sidebar-section">
          <h2>All Events ({this.state.currentEvents.length})</h2>
          <ul>{this.state.currentEvents.map(renderSidebarEvent)}</ul>
        </div>
      </div>
    );
  }

  getApi = async () => {
    const eventos = await getEvents();
    this.setState({
      INITIAL_EVENTS_API: eventos,
    });
    return console.log(this.state.INITIAL_EVENTS_API), console.log(INITIAL_EVENTS);
  };

  setVisibleModal = (state) => {
    this.setState({
      visibleModal: state,
    });
  };

  onInputChange = (event) => {
    this.setState({
      form: {
        ...this.state.form,
        [event.target.name]: event.target.value,
      },
    });
    event.preventDefault();
  };

  handleWeekendsToggle = () => {
    this.setState({
      weekendsVisible: !this.state.weekendsVisible,
    });
  };

  handleDateSelect = (selectInfo) => {
    this.setState({
      selectInfo: selectInfo,
    });
    this.setVisibleModal(true);
    // console.log(selectInfo);
  };

  saveEventCalendar = () => {
    let calendarApi = this.state.selectInfo.view.calendar;

    calendarApi.unselect(); // clear date selection

    if (this.state.form.nombre) {
      calendarApi.addEvent({
        id: createEventId(),
        title: this.state.form.nombre,
        start: this.state.selectInfo.startStr,
        end: this.state.selectInfo.endStr,
        allDay: this.state.selectInfo.allDay,
      });
    }
    this.setState({
      form: {},
    });
  };

  handleEventClick = (clickInfo) => {
    // eslint-disable-next-line no-restricted-globals
    if (confirm(`Are you sure you want to delete the event '${clickInfo.event.title}'`)) {
      clickInfo.event.remove();
    }
  };

  handleEvents = (events) => {
    this.setState({
      currentEvents: events,
    });
  };
}

function renderEventContent(eventInfo) {
  return (
    <>
      <Container>
        <b>{eventInfo.timeText}</b>
        <i>{eventInfo.event.title}</i>
      </Container>
    </>
  );
}

function renderSidebarEvent(event) {
  return (
    <li key={event.id}>
      <b>{formatDate(event.start, { year: "numeric", month: "short", day: "numeric" })}</b>
      <i>{event.title}</i>
    </li>
  );
}
