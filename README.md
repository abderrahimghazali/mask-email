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

### Running Tests

```bash
npm test
```

### Development

To contribute to this project:

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Add tests for new functionality
5. Ensure all tests pass
6. Submit a pull request

### Test File Structure

The project includes comprehensive tests in `test.js`. You can run them with:

```javascript
// Example test structure
const maskEmail = require('./index.js');

test('Basic email masking', () => {
  assertEqual(maskEmail('john@example.com'), 'j***@example.com');
});
```