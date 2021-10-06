export const CARD_FIELD_ID = {
  number: 'card-number',
  expirationDate: 'card-expiration-date',
  ccv: 'card-ccv',
};

const cardFields = {
  number: {
    element: `#${CARD_FIELD_ID.number}`,
    placeholder: 'Card Number',
  },
  expirationDate: {
    element: `#${CARD_FIELD_ID.expirationDate}`,
    placeholder: 'MM / YY',
  },
  ccv: {
    element: `#${CARD_FIELD_ID.ccv}`,
    placeholder: 'CVV / CVC',
  },
};

export const cardSetupConfig = {
  fields: cardFields,
  styles: {
    input: {
      color: '#888B94',
    },
    'input.ccv': {
      'font-size': '16px',
    },
    'input.expiration-date': {
      'font-size': '16px',
    },
    'input.card-number': {
      'font-size': '16px',
    },
    ':focus': {
      color: '#33384D',
    },
    '.valid': {
      color: '#33384D',
    },
    '.invalid': {
      color: '#33384D',
    },
  },
};
