/**
 * Mask an email address for privacy
 * @param {string} email - The email address to mask
 * @param {Object} options - Masking options
 * @param {string} options.maskChar - Character to use for masking (default: '*')
 * @param {number} options.unmaskedStart - Number of characters to show at start (default: 1)
 * @param {number} options.unmaskedEnd - Number of characters to show at end before @ (default: 0)
 * @param {boolean} options.maskDomain - Whether to mask the domain (default: false)
 * @returns {string} Masked email address
 */
function maskEmail(email, options = {}) {
    if (!email || typeof email !== 'string') {
      throw new Error('Email must be a non-empty string');
    }
  
    // Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      throw new Error('Invalid email format');
    }
  
    const {
      maskChar = '*',
      unmaskedStart = 1,
      unmaskedEnd = 0,
      maskDomain = false
    } = options;
  
    const [username, domain] = email.split('@');
  
    // Mask username
    let maskedUsername;
    if (username.length <= unmaskedStart + unmaskedEnd) {
      // If username is too short, just show first character + mask
      maskedUsername = username[0] + maskChar.repeat(Math.max(1, username.length - 1));
    } else {
      const start = username.slice(0, unmaskedStart);
      const end = unmaskedEnd > 0 ? username.slice(-unmaskedEnd) : '';
      const maskLength = username.length - unmaskedStart - unmaskedEnd;
      maskedUsername = start + maskChar.repeat(maskLength) + end;
    }
  
    // Handle domain masking
    let finalDomain = domain;
    if (maskDomain) {
      const [domainName, extension] = domain.split('.');
      const maskedDomainName = domainName[0] + maskChar.repeat(Math.max(1, domainName.length - 1));
      finalDomain = maskedDomainName + '.' + extension;
    }
  
    return maskedUsername + '@' + finalDomain;
  }
  
  module.exports = maskEmail;
  module.exports.default = maskEmail;