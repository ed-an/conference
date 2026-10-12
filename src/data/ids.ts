import { uuid } from './values.ts'

export const eventId = uuid('10000000-0000-4000-8000-000000000001')
export const scheduleId = uuid('10000000-0000-4000-8000-000000000002')

export const speakerIds = {
  ana: uuid('20000000-0000-4000-8000-000000000001'),
  bruno: uuid('20000000-0000-4000-8000-000000000002'),
  camila: uuid('20000000-0000-4000-8000-000000000003'),
  diego: uuid('20000000-0000-4000-8000-000000000004'),
  elisa: uuid('20000000-0000-4000-8000-000000000005'),
  felipe: uuid('20000000-0000-4000-8000-000000000006'),
} as const

export const talkIds = {
  openingKeynote: uuid('30000000-0000-4000-8000-000000000001'),
  accessibleInterfaces: uuid('30000000-0000-4000-8000-000000000002'),
  stateArchitecture: uuid('30000000-0000-4000-8000-000000000003'),
  testingWorkshop: uuid('30000000-0000-4000-8000-000000000004'),
  performance: uuid('30000000-0000-4000-8000-000000000005'),
  designSystems: uuid('30000000-0000-4000-8000-000000000006'),
  serverComponentsWorkshop: uuid('30000000-0000-4000-8000-000000000007'),
  futurePanel: uuid('30000000-0000-4000-8000-000000000008'),
} as const

export const scheduleEntryIds = Array.from({ length: 12 }, (_, index) =>
  uuid(`40000000-0000-4000-8000-${String(index + 1).padStart(12, '0')}`),
)

export const accommodationIds = Array.from({ length: 4 }, (_, index) =>
  uuid(`50000000-0000-4000-8000-${String(index + 1).padStart(12, '0')}`),
)

export const foodIds = Array.from({ length: 5 }, (_, index) =>
  uuid(`60000000-0000-4000-8000-${String(index + 1).padStart(12, '0')}`),
)
