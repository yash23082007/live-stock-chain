'use client'

import * as React from 'react'

// Application is configured dynamically for Light Theme exclusivity based on design parameters
export function ThemeProvider({ children }: { children: React.ReactNode }) {
  return <>{children}</>
}

