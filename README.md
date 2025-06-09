# mask-email

A simple, lightweight utility to mask email addresses for privacy. Zero dependencies.

## Installation

```bash
npm install mask-email
```

## Usage

```javascript
const maskEmail = require('mask-email');

// Basic usage
maskEmail('john.doe@gmail.com');        // 'j******@gmail.com'
maskEmail('jane@example.org');          // 'j***@example.org'

// Custom masking character
maskEmail('user@domain.com', { maskChar: '#' });  // 'u###@domain.com'

// Show more characters at start
maskEmail('john.doe@gmail.com', { unmaskedStart: 3 });  // 'joh****@gmail.com'

// Show characters at end of username
maskEmail('john.doe@gmail.com', { 
  unmaskedStart: 2, 
  unmaskedEnd: 2 
});  // 'jo***oe@gmail.com'

// Mask domain too
maskEmail('user@gmail.com', { maskDomain: true });  // 'u***@g******.com'
```

## API

### maskEmail(email, options?)

#### Parameters

- `email` (string): The email address to mask
- `options` (object, optional): Masking configuration
  - `maskChar` (string): Character to use for masking (default: `'*'`)
  - `unmaskedStart` (number): Number of characters to show at start of username (default: `1`)
  - `unmaskedEnd` (number): Number of characters to show at end of username (default: `0`)
  - `maskDomain` (boolean): Whether to mask the domain name (default: `false`)

#### Returns

- (string): The masked email address

#### Throws

- Error: If email is not a string or has invalid format

## Examples

```javascript
// Different masking styles
maskEmail('hello@world.com');                               // 'h****@world.com'
maskEmail('a@b.co');                                        // 'a@b.co' (too short to mask much)
maskEmail('verylongemail@company.com', { unmaskedStart: 4 }); // 'very*********@company.com'

// Custom characters
maskEmail('test@example.com', { maskChar: '•' });           // 't•••@example.com'
maskEmail('test@example.com', { maskChar: 'X' });           // 'tXXX@example.com'

// Privacy modes
maskEmail('sensitive@private.org', { 
  maskDomain: true,
  maskChar: '#' 
});  // 's########@p######.org'
```

## License

MIT

## Contributing

Pull requests welcome! Please ensure tests pass.

// test.js
const maskEmail = require('./index.js');

function test(description, fn) {
  try {
    fn();
    console.log(`✅ ${description}`);
  } catch (error) {
    console.log(`❌ ${description}`);
    console.log(`   ${error.message}`);
  }
}

function assertEqual(actual, expected, message) {
  if (actual !== expected) {
    throw new Error(`${message || 'Assertion failed'}: expected "${expected}", got "${actual}"`);
  }
}

function assertThrows(fn, message) {
  try {
    fn();
    throw new Error(`${message || 'Expected function to throw'}`);
  } catch (error) {
    if (error.message.includes('Expected function to throw')) {
      throw error;
    }
    // Expected to throw, test passes
  }
}

// Tests
console.log('Running mask-email tests...\n');

test('Basic email masking', () => {
  assertEqual(maskEmail('john@example.com'), 'j***@example.com');
});

test('Short email handling', () => {
  assertEqual(maskEmail('a@b.co'), 'a@b.co');
});

test('Custom mask character', () => {
  assertEqual(maskEmail('test@example.com', { maskChar: '#' }), 't###@example.com');
});

test('Custom unmasked start', () => {
  assertEqual(maskEmail('hello@world.com', { unmaskedStart: 3 }), 'hel**@world.com');
});

test('Unmasked start and end', () => {
  assertEqual(maskEmail('johndoe@test.com', { unmaskedStart: 2, unmaskedEnd: 2 }), 'jo***oe@test.com');
});

test('Domain masking', () => {
  assertEqual(maskEmail('user@gmail.com', { maskDomain: true }), 'u***@g****.com');
});

test('Invalid email throws error', () => {
  assertThrows(() => maskEmail('invalid-email'), 'Should throw for invalid email');
});

test('Empty string throws error', () => {
  assertThrows(() => maskEmail(''), 'Should throw for empty email');
});

test('Non-string input throws error', () => {
  assertThrows(() => maskEmail(null), 'Should throw for null input');
});

console.log('\nAll tests completed!');