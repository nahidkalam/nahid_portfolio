
import * as React from 'react'

export function Card({ className='', children }: React.PropsWithChildren<{className?: string}>) {
  return <div className={`rounded-xl ${className}`}>{children}</div>
}
export function CardHeader({ className='', children }: React.PropsWithChildren<{className?: string}>) {
  return <div className={`p-6 ${className}`}>{children}</div>
}
export function CardTitle({ className='', children }: React.PropsWithChildren<{className?: string}>) {
  return <h3 className={`text-lg font-semibold ${className}`}>{children}</h3>
}
export function CardContent({ className='', children }: React.PropsWithChildren<{className?: string}>) {
  return <div className={`p-6 pt-0 ${className}`}>{children}</div>
}
