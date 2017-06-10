export function becomeGuideCity(city) {
  return {
      type: 'BECOME_GUIDE_CITY',
      payload: city
  };
}

export function becomeGuideDate(date) {
  return {
      type: 'BECOME_GUIDE_DATE',
      payload: date
  };
}

export function becomeGuideFromHour(fromHour) {
  return {
      type: 'BECOME_GUIDE_FROM_HOUR',
      payload: fromHour
  };
}

export function becomeGuideToHour(toHour) {
  return {
      type: 'BECOME_GUIDE_TO_HOUR',
      payload: toHour
  };
}

export function becomeGuideRate(hourlyRate) {
  return {
      type: 'BECOME_GUIDE_RATE',
      payload: hourlyRate
  };
}

export function becomeGuideIntro(intro) {
  return {
      type: 'BECOME_GUIDE_INTRO',
      payload: intro
  };
}

export function becomeGuideStatement(statement) {
  return {
      type: 'BECOME_GUIDE_STATEMENT',
      payload: statement
  };
}