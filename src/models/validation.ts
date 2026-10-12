import type { Event } from './event'
import type {
  CalendarDate,
  IsoDateTime,
  Slug,
  UUID,
  Url,
} from './primitives'
import type { Schedule } from './schedule'
import type { Talk } from './talk'

export interface ValidationIssue {
  path: string
  message: string
}

export interface ValidationResult {
  valid: boolean
  issues: readonly ValidationIssue[]
}

const uuidPattern =
  /^[0-9a-f]{8}-[0-9a-f]{4}-[1-5][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i
const slugPattern = /^[a-z0-9]+(?:-[a-z0-9]+)*$/
const calendarDatePattern = /^\d{4}-(0[1-9]|1[0-2])-([12]\d|3[01]|0[1-9])$/
const utcDateTimePattern =
  /^\d{4}-(0[1-9]|1[0-2])-([12]\d|3[01]|0[1-9])T([01]\d|2[0-3]):[0-5]\d:[0-5]\d(?:\.\d{3})?Z$/

export function isUUID(value: string): value is UUID {
  return uuidPattern.test(value)
}

export function isSlug(value: string): value is Slug {
  return slugPattern.test(value)
}

export function isCalendarDate(value: string): value is CalendarDate {
  if (!calendarDatePattern.test(value)) return false
  const date = new Date(`${value}T00:00:00Z`)
  return !Number.isNaN(date.getTime()) && date.toISOString().slice(0, 10) === value
}

export function isIsoDateTime(value: string): value is IsoDateTime {
  if (!utcDateTimePattern.test(value)) return false
  const date = new Date(value)
  const normalizedValue = value.includes('.') ? value : value.replace('Z', '.000Z')
  return !Number.isNaN(date.getTime()) && date.toISOString() === normalizedValue
}

export function isUrl(value: string): value is Url {
  try {
    const url = new URL(value)
    return url.protocol === 'https:' || url.protocol === 'http:'
  } catch {
    return false
  }
}

function duplicateIssues(values: readonly UUID[], path: string): ValidationIssue[] {
  return new Set(values).size === values.length
    ? []
    : [{ path, message: 'must not contain duplicate IDs' }]
}

function identityIssues(
  value: { id: UUID; slug: Slug },
  path = '',
): ValidationIssue[] {
  const issues: ValidationIssue[] = []
  if (!isUUID(value.id)) issues.push({ path: `${path}id`, message: 'must be a valid UUID' })
  if (!isSlug(value.slug)) issues.push({ path: `${path}slug`, message: 'must be a non-empty URL-safe slug' })
  return issues
}

function result(issues: readonly ValidationIssue[]): ValidationResult {
  return { valid: issues.length === 0, issues }
}

export function validateEvent(event: Event): ValidationResult {
  const issues = identityIssues(event)

  if (!isIsoDateTime(event.startDate)) {
    issues.push({ path: 'startDate', message: 'must be an ISO 8601 UTC instant' })
  }
  if (!isIsoDateTime(event.endDate)) {
    issues.push({ path: 'endDate', message: 'must be an ISO 8601 UTC instant' })
  }
  if (
    isIsoDateTime(event.startDate) &&
    isIsoDateTime(event.endDate) &&
    Date.parse(event.endDate) < Date.parse(event.startDate)
  ) {
    issues.push({ path: 'endDate', message: 'must not precede startDate' })
  }
  event.talkIds.forEach((id, index) => {
    if (!isUUID(id)) issues.push({ path: `talkIds.${index}`, message: 'must be a valid UUID' })
  })
  issues.push(...duplicateIssues(event.talkIds, 'talkIds'))

  return result(issues)
}

export function validateTalk(talk: Talk): ValidationResult {
  const issues = identityIssues(talk)

  if (talk.speakerIds.length === 0) {
    issues.push({ path: 'speakerIds', message: 'must contain at least one speaker ID' })
  }
  talk.speakerIds.forEach((id, index) => {
    if (!isUUID(id)) issues.push({ path: `speakerIds.${index}`, message: 'must be a valid UUID' })
  })
  issues.push(...duplicateIssues(talk.speakerIds, 'speakerIds'))
  if (talk.durationMinutes !== undefined && talk.durationMinutes <= 0) {
    issues.push({ path: 'durationMinutes', message: 'must be greater than zero' })
  }

  return result(issues)
}

export function validateSchedule(schedule: Schedule): ValidationResult {
  const issues = identityIssues(schedule)

  if (!isUUID(schedule.eventId)) {
    issues.push({ path: 'eventId', message: 'must be a valid UUID' })
  }
  if (!isCalendarDate(schedule.date)) {
    issues.push({ path: 'date', message: 'must be a valid YYYY-MM-DD date' })
  }

  schedule.entries.forEach((entry, index) => {
    const path = `entries.${index}.`
    if (!isUUID(entry.id)) issues.push({ path: `${path}id`, message: 'must be a valid UUID' })
    if (!isIsoDateTime(entry.startsAt)) {
      issues.push({ path: `${path}startsAt`, message: 'must be an ISO 8601 UTC instant' })
    }
    if (!isIsoDateTime(entry.endsAt)) {
      issues.push({ path: `${path}endsAt`, message: 'must be an ISO 8601 UTC instant' })
    }
    if (
      isIsoDateTime(entry.startsAt) &&
      isIsoDateTime(entry.endsAt) &&
      Date.parse(entry.endsAt) <= Date.parse(entry.startsAt)
    ) {
      issues.push({ path: `${path}endsAt`, message: 'must be later than startsAt' })
    }
    if (entry.kind === 'talk' && !isUUID(entry.talkId)) {
      issues.push({ path: `${path}talkId`, message: 'must be a valid UUID' })
    }
  })

  const entryIds = schedule.entries.map((entry) => entry.id)
  issues.push(...duplicateIssues(entryIds, 'entries'))

  return result(issues)
}
