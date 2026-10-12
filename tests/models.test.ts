import assert from 'node:assert/strict'
import test from 'node:test'

import type { Event } from '../src/models/event.ts'
import type {
  CalendarDate,
  IsoDateTime,
  Slug,
  UUID,
} from '../src/models/primitives.ts'
import type { Schedule } from '../src/models/schedule.ts'
import type { Talk } from '../src/models/talk.ts'
import {
  isCalendarDate,
  isIsoDateTime,
  isSlug,
  isUrl,
  isUUID,
  validateEvent,
  validateSchedule,
  validateTalk,
} from '../src/models/validation.ts'

const eventId = '123e4567-e89b-42d3-a456-426614174000' as UUID
const talkId = '123e4567-e89b-42d3-a456-426614174001' as UUID
const speakerId = '123e4567-e89b-42d3-a456-426614174002' as UUID
const entryId = '123e4567-e89b-42d3-a456-426614174003' as UUID

test('primitive guards accept canonical values and reject malformed values', () => {
  assert.equal(isUUID(eventId), true)
  assert.equal(isUUID('not-a-uuid'), false)
  assert.equal(isSlug('react-performance'), true)
  assert.equal(isSlug('React Performance'), false)
  assert.equal(isCalendarDate('2026-12-12'), true)
  assert.equal(isCalendarDate('2026-02-31'), false)
  assert.equal(isIsoDateTime('2026-12-12T12:00:00Z'), true)
  assert.equal(isIsoDateTime('2026-12-12T09:00:00-03:00'), false)
  assert.equal(isUrl('https://conference.example.com'), true)
  assert.equal(isUrl('javascript:alert(1)'), false)
})

test('event validation enforces chronology and unique talk IDs', () => {
  const event: Event = {
    id: eventId,
    slug: 'react-conference-2026' as Slug,
    name: 'React Conference 2026',
    description: 'A conference about React.',
    startDate: '2026-12-12T12:00:00Z' as IsoDateTime,
    endDate: '2026-12-12T21:00:00Z' as IsoDateTime,
    timeZone: 'America/Sao_Paulo',
    status: 'scheduled',
    talkIds: [talkId],
  }

  assert.deepEqual(validateEvent(event), { valid: true, issues: [] })

  const invalid = validateEvent({
    ...event,
    endDate: '2026-12-12T11:00:00Z' as IsoDateTime,
    talkIds: [talkId, talkId],
  })
  assert.equal(invalid.valid, false)
  assert.deepEqual(
    invalid.issues.map((issue) => issue.path),
    ['endDate', 'talkIds'],
  )
})

test('talk validation requires speakers, unique IDs, and positive duration', () => {
  const talk: Talk = {
    id: talkId,
    slug: 'react-performance' as Slug,
    name: 'React Performance',
    description: 'Practical rendering techniques.',
    speakerIds: [speakerId],
    category: 'session',
    status: 'confirmed',
    durationMinutes: 45,
  }

  assert.deepEqual(validateTalk(talk), { valid: true, issues: [] })

  const invalid = validateTalk({
    ...talk,
    speakerIds: [],
    durationMinutes: 0,
  })
  assert.equal(invalid.valid, false)
  assert.deepEqual(
    invalid.issues.map((issue) => issue.path),
    ['speakerIds', 'durationMinutes'],
  )
})

test('schedule validation accepts discriminated entries and rejects invalid timing', () => {
  const schedule: Schedule = {
    id: '123e4567-e89b-42d3-a456-426614174004' as UUID,
    slug: 'conference-day' as Slug,
    name: 'Conference day',
    description: 'The complete program.',
    eventId,
    date: '2026-12-12' as CalendarDate,
    timeZone: 'America/Sao_Paulo',
    entries: [
      {
        id: entryId,
        kind: 'talk',
        name: 'React Performance',
        description: 'A conference session.',
        startsAt: '2026-12-12T12:00:00Z' as IsoDateTime,
        endsAt: '2026-12-12T12:45:00Z' as IsoDateTime,
        talkId,
      },
      {
        id: '123e4567-e89b-42d3-a456-426614174005' as UUID,
        kind: 'break',
        breakType: 'coffee',
        name: 'Coffee break',
        description: 'Time to recharge.',
        startsAt: '2026-12-12T12:45:00Z' as IsoDateTime,
        endsAt: '2026-12-12T13:15:00Z' as IsoDateTime,
      },
    ],
  }

  assert.deepEqual(validateSchedule(schedule), { valid: true, issues: [] })

  const invalid = validateSchedule({
    ...schedule,
    entries: [
      {
        ...schedule.entries[0],
        endsAt: '2026-12-12T11:00:00Z' as IsoDateTime,
      },
    ],
  })
  assert.equal(invalid.valid, false)
  assert.equal(invalid.issues[0]?.path, 'entries.0.endsAt')
})
