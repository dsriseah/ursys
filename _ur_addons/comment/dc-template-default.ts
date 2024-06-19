/*///////////////////////////////// ABOUT \\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\*\

  dc-template-default - placeholder for "templates" related to comments

\*\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\ * /////////////////////////////////////*/

import type { TCommentType } from './types-comment';

/// DECLARATIONS //////////////////////////////////////////////////////////////
/// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
const commentTypes: TCommentType[] = [
  {
    slug: 'demo',
    label: 'Demo',
    prompts: [
      {
        format: 'text',
        prompt: 'Comment', // prompt label
        help: 'Use this for any general comment.',
        feedback: 'Just enter text'
      },
      {
        format: 'dropdown',
        prompt: 'How often did you use "Dropdown"', // prompt label
        options: ['🥲 No', '🤔 A little', '😀 A lot'],
        help: 'Select one.',
        feedback: 'Single selection via dropdown menu'
      },
      {
        format: 'checkbox',
        prompt: 'What types of fruit did you "Checkbox"?', // prompt label
        options: ['Apple Pie', 'Orange, Lime', 'Banana'],
        help: 'Select as many as you want.',
        feedback: 'Supports multiple selections'
      },
      {
        format: 'radio',
        prompt: 'What do you think "Radio"?', // prompt label
        options: [
          'It makes sense',
          'I disagree',
          "I don't know",
          'Handle, comma, please'
        ],
        help: 'Select only one.',
        feedback: 'Mutually exclusive single selections'
      },
      {
        format: 'likert',
        prompt: 'How did you like it "likert"?', // prompt label
        options: ['💙', '💚', '💛', '🧡', '🩷'],
        help: 'Select one of a series listed horizontally',
        feedback: 'Select with a single click.  Supports emojis.'
      },
      {
        format: 'discrete-slider',
        prompt: 'Star Rating "discrete-slider"?', // prompt label
        options: ['★', '★', '★', '★', '★'],
        help: 'Select one of a series stacked horizontally',
        feedback: 'Select with a single click.  Supports emojis.'
      }
    ]
  },
  {
    slug: 'cmt',
    label: 'Comment', // comment type label
    prompts: [
      {
        format: 'text',
        prompt: 'Comment', // prompt label
        help: 'Use this for any general comment.',
        feedback: ''
      }
    ]
  },
  {
    slug: 'tellmemore',
    label: 'Tell me more', // comment type label
    prompts: [
      {
        format: 'text',
        prompt: 'Please tell me more', // prompt label
        help: 'Can you tell me more about ... ',
        feedback: ''
      }
    ]
  },
  {
    slug: 'source',
    label: 'Source', // comment type label
    prompts: [
      {
        format: 'text',
        prompt: 'Is this well sourced?', // prompt label
        help: 'Yes/No',
        feedback: ''
      },
      {
        format: 'text',
        prompt: 'Changes', // prompt label
        help: 'What about the sourcing could be improved?',
        feedback: ''
      }
    ]
  }
];

/// EXPORTS ///////////////////////////////////////////////////////////////////
/// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
export default {
  comment_types: commentTypes
};
