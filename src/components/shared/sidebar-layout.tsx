'use client';
import { cn } from '@/lib/utils';
import Link from 'next/link';
import * as React from 'react';

export const Sidebar = React.forwardRef<
  HTMLElement,
  React.ComponentProps<'aside'>
>(({ className, ...props }, ref) => {
  return (
    <aside
      ref={ref}
      className={cn(
        'hidden md:flex md:flex-col md:border-r',
        className
      )}
      {...props}
    />
  );
});
Sidebar.displayName = 'Sidebar';

export const SidebarHeader = React.forwardRef<
  HTMLDivElement,
  React.ComponentProps<'div'>
>(({ className, ...props }, ref) => {
  return (
    <div
      ref={ref}
      className={cn('flex h-16 items-center border-b p-4', className)}
      {...props}
    />
  );
});
SidebarHeader.displayName = 'SidebarHeader';

export const SidebarMain = React.forwardRef<
  HTMLDivElement,
  React.ComponentProps<'div'>
>(({ className, ...props }, ref) => {
  return (
    <div
      ref={ref}
      className={cn('flex flex-col p-4', className)}
      {...props}
    />
  );
});
SidebarMain.displayName = 'SidebarMain';

export const SidebarNav = React.forwardRef<
  HTMLDivElement,
  React.ComponentProps<'div'>
>(({ className, ...props }, ref) => {
  return (
    <div ref={ref} className={cn('flex flex-col gap-y-4', className)} {...props} />
  );
});
SidebarNav.displayName = 'SidebarNav';

export const SidebarNavHeader = React.forwardRef<
  HTMLDivElement,
  React.ComponentProps<'div'>
>(({ className, ...props }, ref) => {
  return (
    <div ref={ref} className={cn('mt-4 first:mt-0', className)} {...props} />
  );
});
SidebarNavHeader.displayName = 'SidebarNavHeader';

export const SidebarNavHeaderTitle = React.forwardRef<
  HTMLHeadingElement,
  React.ComponentProps<'h4'>
>(({ className, ...props }, ref) => {
  return (
    <h4
      ref={ref}
      className={cn(
        'px-3 text-xs uppercase text-muted-foreground',
        className
      )}
      {...props}
    />
  );
});
SidebarNavHeaderTitle.displayName = 'SidebarNavHeaderTitle';

export const SidebarNavLink = React.forwardRef<
  HTMLAnchorElement,
  React.ComponentProps<typeof Link> & {
    active?: boolean;
  }
>(({ className, children, active, ...props }, ref) => {
  return (
    <Link
      ref={ref}
      className={cn(
        'flex items-center gap-x-2 rounded-lg p-3 text-sm font-medium',
        active
          ? 'bg-secondary text-primary'
          : 'text-muted-foreground hover:bg-secondary/50 hover:text-foreground',
        className
      )}
      {...props}
    >
      {children}
    </Link>
  );
});
SidebarNavLink.displayName = 'SidebarNavLink';

export const SidebarFooter = React.forwardRef<
  HTMLDivElement,
  React.ComponentProps<'div'>
>(({ className, ...props }, ref) => {
  return (
    <div
      ref={ref}
      className={cn('mt-auto flex flex-col p-4', className)}
      {...props}
    />
  );
});
SidebarFooter.displayName = 'SidebarFooter';
