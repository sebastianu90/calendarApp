import moment from 'moment';

let eventGuid = 0;
// let todayStr = new Date().toISOString().replace(/T.*$/, ""); // YYYY-MM-DD of today

export const getEvents = async () => {
  const url = "https://my-json-server.typicode.com/bastidiaaz/frontend-test-json-api/db";

  const respuesta = await fetch(url);
  const data = await respuesta.json();

  // const INITIAL_EVENTS_API = [];
  // data.events.forEach((event) => {
  //   const evento = {
  //     id: `${event.id}`,
  //     title: event.nombre,
  //     start: todayStr + "T" + event.inicio,
  //   };
  //   return INITIAL_EVENTS_API.push(evento);
  // });
  // return INITIAL_EVENTS_API;

  return data.events.map((event) => ({  // AQUÍ SIMPLIFIQUÉ LA LÓGICA PARA FORMATEAR LAS FECHAS Y MANDAR EL RESULTADO DE GETEVENTS
    ...event,
    start: moment(event.inicio, 'HH:mm:ss').format('YYYY-MM-DDTHH:mm:ss'),
    end: moment(event.fin, 'HH:mm:ss').format('YYYY-MM-DDTHH:mm:ss'),
  }));
};

// export const INITIAL_EVENTS = [
//   {
//     id: createEventId(),
//     title: "Timed event",
//     start: todayStr + "T12:00:00",
//   },
// ];

export function createEventId() {
  return String(eventGuid++);
}
