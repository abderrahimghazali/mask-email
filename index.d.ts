interface MaskEmailOptions {
    maskChar?: string;
    unmaskedStart?: number;
    unmaskedEnd?: number;
    maskDomain?: boolean;
  }
  
  declare function maskEmail(email: string, options?: MaskEmailOptions): string;
  
  export = maskEmail;