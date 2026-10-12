import type {
  CalendarDate,
  IsoDateTime,
  Slug,
  Url,
  UUID,
} from '../models/primitives.ts'
import {
  isCalendarDate,
  isIsoDateTime,
  isSlug,
  isUrl,
  isUUID,
} from '../models/validation.ts'

function requiredValue<Value extends string>(
  value: string,
  guard: (candidate: string) => candidate is Value,
  typeName: string,
): Value {
  if (!guard(value)) throw new TypeError(`Invalid ${typeName}: ${value}`)
  return value
}

export const uuid = (value: string): UUID => requiredValue(value, isUUID, 'UUID')
export const slug = (value: string): Slug => requiredValue(value, isSlug, 'slug')
export const calendarDate = (value: string): CalendarDate =>
  requiredValue(value, isCalendarDate, 'calendar date')
export const instant = (value: string): IsoDateTime =>
  requiredValue(value, isIsoDateTime, 'ISO 8601 UTC instant')
export const url = (value: string): Url => requiredValue(value, isUrl, 'URL')
