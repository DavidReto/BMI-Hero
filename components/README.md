# Components Directory

This directory contains reusable React components for the BMI-Hero application.

## UserSelector Component

**File:** `UserSelector.tsx`

**Purpose:** A conditional component that displays different UI based on whether users exist in the database.

### Features:

- **No Users Mode**: Shows a text input with placeholder "Insert your name" and a plus (+) button
- **Multiple Users Mode**: Shows a dropdown to select from existing users and a plus (+) button to add new users
- Form validation and error handling
- Loading states during API calls
- Responsive design

### Props:

```typescript
interface UserSelectorProps {
    users: User[]; // List of existing users
    onUserAdded: () => void; // Callback when a user is created
}
```

### Usage:

```tsx
import UserSelector from '@/components/UserSelector';

<UserSelector users={users} onUserAdded={handleUserAdded} />;
```

---

## Styling

Each component has its own CSS file (e.g., `UserSelector.css`) for modular styling. The components use:

- CSS Grid and Flexbox for layout
- CSS animations for smooth transitions
- Gradient backgrounds matching the app theme
- Responsive design principles

---

## Adding More Components

When adding new components:

1. Create a `.tsx` file for the component logic
2. Create a `.css` file with the same name for styling
3. Update this README with component documentation
4. Add TypeScript interfaces in `types/index.ts` if needed
