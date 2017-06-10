export default function reducer(state = {
  city: '',
  date: new Date().toDateString(),
  fromHour: '',
  toHour: '',
  hourlyRate: '',
  intro: '',
  statement: '',
}, action) {
  if (action.type === 'BECOME_GUIDE_CITY') {
    return {...state, city: action.payload}
  } else if (action.type === 'BECOME_GUIDE_DATE') {
    return {...state, date: action.payload}
  } else if (action.type === 'BECOME_GUIDE_FROM_HOUR') {
    return {...state, fromHour: action.payload}
  } else if (action.type === 'BECOME_GUIDE_TO_HOUR') {
    return {...state, toHour: action.payload}
  } else if (action.type === 'BECOME_GUIDE_RATE') {
    return {...state, hourlyRate: action.payload}
  } else if (action.type === 'BECOME_GUIDE_INTRO') {
    return {...state, intro: action.payload}
  } else if (action.type === 'BECOME_GUIDE_STATEMENT') {
    return {...state, statement: action.payload}
  }
  return state;
}