# Contributing to PCOS Care Connect

We welcome contributions from the community! Whether you're fixing bugs, adding features, or improving documentation, your help is appreciated.

## How to Contribute

### 1. Fork the Repository
```bash
git clone https://github.com/yourusername/HACKATHON.git
cd pcos-care-connect
```

### 2. Create a Branch
```bash
git checkout -b feature/your-feature-name
```

### 3. Make Changes
- Follow the project structure
- Write clean, readable code
- Add comments where necessary
- Test your changes

### 4. Commit Changes
```bash
git commit -m "feat: add your feature description"
```

### 5. Push to GitHub
```bash
git push origin feature/your-feature-name
```

### 6. Create Pull Request
- Go to GitHub
- Click "Compare & pull request"
- Describe your changes
- Submit!

## Code Style Guide

### JavaScript/React
- Use camelCase for variables and functions
- Use PascalCase for components
- Use arrow functions
- Add JSDoc comments for functions

```javascript
/**
 * Fetches hospital data from API
 * @param {string} cityName - The city to search in
 * @returns {Promise<Array>} Array of hospitals
 */
const fetchHospitals = async (cityName) => {
  // Implementation
};
```

### CSS/Tailwind
- Use Tailwind utility classes
- Follow mobile-first approach
- Use custom colors from theme
- Keep components modular

### Database
- Write migration scripts
- Add indexes for performance
- Include validation rules
- Document schema changes

## Testing

```bash
# Run linter
npm run lint

# Run tests (when available)
npm test

# Build for production
npm run build
```

## Reporting Issues

Please include:
- Clear description of the issue
- Steps to reproduce
- Expected behavior
- Actual behavior
- Screenshots if applicable
- System information (OS, Node version, etc.)

## Feature Requests

Suggest new features by creating an issue with:
- Feature description
- Use case/problem it solves
- Proposed implementation (optional)
- Why it's beneficial for PCOS users

## Documentation

- Keep README.md updated
- Add comments for complex logic
- Document new API endpoints
- Update SETUP_GUIDE.md if needed

## Commit Message Format

```
feat: add new feature
fix: fix bug description
docs: update documentation
style: code style changes
refactor: refactor code
test: add tests
chore: maintenance tasks
```

## Questions?

Feel free to:
- Open an issue for questions
- Comment on pull requests
- Check existing documentation

## Code of Conduct

- Be respectful and inclusive
- No harassment or discrimination
- Focus on the code, not the person
- Help others learn

Thank you for contributing to making PCOS care more accessible! ❤️
