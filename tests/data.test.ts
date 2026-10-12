import assert from 'node:assert/strict'
import test from 'node:test'

import {
  accommodations,
  events,
  food,
  schedules,
  speakers,
  talks,
} from '../src/data/index.ts'
import { validateEvent, validateSchedule, validateTalk } from '../src/models/validation.ts'

const collections = [events, speakers, talks, schedules, accommodations, food]

test('local data contains the requested record counts', () => {
  assert.equal(events.length, 1)
  assert.equal(speakers.length, 6)
  assert.equal(talks.length, 8)
  assert.equal(schedules.length, 1)
  assert.equal(schedules[0].entries.length, 12)
  assert.equal(accommodations.length, 4)
  assert.equal(food.length, 5)
})

test('top-level IDs and slugs are unique', () => {
  const records = collections.flat()
  const ids = records.map((record) => record.id)
  assert.equal(new Set(ids).size, ids.length)

  for (const collection of collections) {
    const slugs = collection.map((record) => record.slug)
    assert.equal(new Set(slugs).size, slugs.length)
  }
})

test('event, talk, and speaker relationships resolve without duplicates', () => {
  const event = events[0]
  const talkIdSet = new Set(talks.map((talk) => talk.id))
  const speakerIdSet = new Set(speakers.map((speaker) => speaker.id))

  assert.equal(event.talkIds.length, talks.length)
  assert.equal(new Set(event.talkIds).size, event.talkIds.length)
  event.talkIds.forEach((id) => assert.equal(talkIdSet.has(id), true))

  talks.forEach((talk) => {
    assert.ok(talk.speakerIds.length >= 1)
    assert.equal(new Set(talk.speakerIds).size, talk.speakerIds.length)
    talk.speakerIds.forEach((id) => assert.equal(speakerIdSet.has(id), true))
  })
  assert.ok(talks.some((talk) => talk.speakerIds.length > 1))
})

test('schedule covers every talk once and keeps entries chronological', () => {
  const schedule = schedules[0]
  const scheduledTalkIds = schedule.entries
    .filter((entry) => entry.kind === 'talk')
    .map((entry) => entry.talkId)

  assert.equal(scheduledTalkIds.length, talks.length)
  assert.equal(new Set(scheduledTalkIds).size, talks.length)
  assert.deepEqual(new Set(scheduledTalkIds), new Set(talks.map((talk) => talk.id)))
  assert.ok(schedule.entries.some((entry) => entry.kind === 'break'))
  assert.ok(schedule.entries.some((entry) => entry.kind === 'session'))

  schedule.entries.forEach((entry, index) => {
    assert.ok(Date.parse(entry.endsAt) > Date.parse(entry.startsAt))
    if (index > 0) {
      assert.ok(Date.parse(entry.startsAt) >= Date.parse(schedule.entries[index - 1].endsAt))
    }
  })
})

test('domain validators accept every relevant local record', () => {
  events.forEach((event) => assert.deepEqual(validateEvent(event), { valid: true, issues: [] }))
  talks.forEach((talk) => assert.deepEqual(validateTalk(talk), { valid: true, issues: [] }))
  schedules.forEach((schedule) =>
    assert.deepEqual(validateSchedule(schedule), { valid: true, issues: [] }),
  )
})

test('content uses the canonical date, timezone, and optional field variation', () => {
  assert.equal(events[0].startDate.startsWith('2026-12-12'), true)
  assert.equal(events[0].timeZone, 'America/Sao_Paulo')
  assert.equal(schedules[0].date, '2026-12-12')
  assert.equal(schedules[0].timeZone, 'America/Sao_Paulo')

  assert.ok(speakers.some((speaker) => speaker.avatarUrl !== undefined))
  assert.ok(speakers.some((speaker) => speaker.avatarUrl === undefined))
  assert.ok(accommodations.some((item) => item.bookingUrl !== undefined))
  assert.ok(accommodations.some((item) => item.bookingUrl === undefined))
  assert.ok(food.some((item) => item.address !== undefined))
  assert.ok(food.some((item) => item.address === undefined))
})

test('all public URLs use fictional example.com hosts', () => {
  const speakerUrls = speakers.flatMap((speaker) => [
    ...(speaker.avatarUrl ? [speaker.avatarUrl] : []),
    ...(speaker.socialLinks?.map((link) => link.url) ?? []),
  ])
  const accommodationUrls = accommodations.flatMap((item) => [
    ...(item.websiteUrl ? [item.websiteUrl] : []),
    ...(item.bookingUrl ? [item.bookingUrl] : []),
  ])
  const foodUrls = food.flatMap((item) => (item.websiteUrl ? [item.websiteUrl] : []))

  for (const value of [...speakerUrls, ...accommodationUrls, ...foodUrls]) {
    const hostname = new URL(value).hostname
    assert.ok(hostname === 'example.com' || hostname.endsWith('.example.com'))
  }
})
