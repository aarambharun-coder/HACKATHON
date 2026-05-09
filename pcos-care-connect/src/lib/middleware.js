import { verifyToken } from '@/lib/auth';
import { NextResponse } from 'next/server';

/**
 * Middleware to verify JWT token in API routes
 * @param {Request} req - The request object
 * @returns {Promise<Object|null>} Decoded token payload or null
 */
export const authMiddleware = async (req) => {
  try {
    const authHeader = req.headers.get('authorization');
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      return null;
    }

    const token = authHeader.substring(7);
    const decoded = verifyToken(token);
    return decoded;
  } catch (error) {
    return null;
  }
};

/**
 * Middleware to check user role authorization
 * @param {Object} decoded - Decoded JWT token
 * @param {string|Array<string>} allowedRoles - Role(s) allowed for the endpoint
 * @returns {boolean} Whether user is authorized
 */
export const roleMiddleware = (decoded, allowedRoles) => {
  if (!decoded) return false;

  const roles = Array.isArray(allowedRoles) ? allowedRoles : [allowedRoles];
  return roles.includes(decoded.role);
};

/**
 * Error response formatter
 * @param {string} message - Error message
 * @param {number} status - HTTP status code
 * @returns {NextResponse} Formatted error response
 */
export const errorResponse = (message, status = 400) => {
  return NextResponse.json(
    { error: message },
    { status }
  );
};

/**
 * Success response formatter
 * @param {Object|Array} data - Response data
 * @param {number} status - HTTP status code
 * @returns {NextResponse} Formatted success response
 */
export const successResponse = (data, status = 200) => {
  return NextResponse.json(data, { status });
};

/**
 * Validates request body fields
 * @param {Object} body - Request body
 * @param {Array<string>} requiredFields - Required field names
 * @returns {Object} Validation result {valid: boolean, missing: Array<string>}
 */
export const validateRequestBody = (body, requiredFields) => {
  const missing = [];

  for (const field of requiredFields) {
    if (!body[field]) {
      missing.push(field);
    }
  }

  return {
    valid: missing.length === 0,
    missing,
  };
};

/**
 * Rate limiting helper (simple in-memory implementation)
 */
const rateLimitStore = new Map();

export const rateLimit = (identifier, maxRequests = 100, windowSeconds = 60) => {
  const now = Date.now();
  const windowMs = windowSeconds * 1000;

  if (!rateLimitStore.has(identifier)) {
    rateLimitStore.set(identifier, []);
  }

  const requests = rateLimitStore.get(identifier);
  const recentRequests = requests.filter((time) => now - time < windowMs);

  if (recentRequests.length >= maxRequests) {
    return false;
  }

  recentRequests.push(now);
  rateLimitStore.set(identifier, recentRequests);

  return true;
};
