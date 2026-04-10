import { setup, assign } from 'xstate';
import { OnboardingProfile } from '../../types';

export const onboardingMachine = setup({
  types: {
    context: {} as Partial<OnboardingProfile>,
    events: {} as
      | { type: 'NEXT'; data: Partial<OnboardingProfile> }
      | { type: 'BACK' }
      | { type: 'SUBMIT' }
  },
}).createMachine({
  id: 'onboarding',
  initial: 'sleepWindow',
  context: {},
  states: {
    sleepWindow: {
      on: {
        NEXT: {
          target: 'capacity',
          actions: assign(({ event }) => event.data)
        }
      }
    },
    capacity: {
      on: {
        NEXT: {
          target: 'physicalBaseline',
          actions: assign(({ event }) => event.data)
        },
        BACK: 'sleepWindow'
      }
    },
    physicalBaseline: {
      on: {
        NEXT: {
          target: 'morningPulse',
          actions: assign(({ event }) => event.data)
        },
        BACK: 'capacity'
      }
    },
    morningPulse: {
      on: {
        NEXT: {
          target: 'agencyType',
          actions: assign(({ event }) => event.data)
        },
        BACK: 'physicalBaseline'
      }
    },
    agencyType: {
      on: {
        NEXT: {
          target: 'pressureResponse',
          actions: assign(({ event }) => event.data)
        },
        BACK: 'morningPulse'
      }
    },
    pressureResponse: {
      on: {
        NEXT: {
          target: 'sensoryRegulation',
          actions: assign(({ event }) => event.data)
        },
        BACK: 'agencyType'
      }
    },
    sensoryRegulation: {
      on: {
        NEXT: {
          target: 'priorities',
          actions: assign(({ event }) => event.data)
        },
        BACK: 'pressureResponse'
      }
    },
    priorities: {
      on: {
        NEXT: {
          target: 'currentWeight',
          actions: assign(({ event }) => event.data)
        },
        BACK: 'sensoryRegulation'
      }
    },
    currentWeight: {
      on: {
        NEXT: {
          target: 'childhoodTexture',
          actions: assign(({ event }) => event.data)
        },
        BACK: 'priorities'
      }
    },
    childhoodTexture: {
      on: {
        NEXT: {
          target: 'review',
          actions: assign(({ event }) => event.data)
        },
        BACK: 'currentWeight'
      }
    },
    review: {
      on: {
        SUBMIT: 'completing',
        BACK: 'childhoodTexture'
      }
    },
    completing: {
      type: 'final'
    }
  }
});
