'use client';
import { cn } from '@/lib/utils';
import { ChevronsLeft, MenuIcon } from 'lucide-react';
import React, { ElementRef, useEffect, useRef, useState } from 'react';
import { useMediaQuery } from 'usehooks-ts';

export const Sidebar = () => {
  const isMobile = useMediaQuery('(max-width: 720px)');

  const sidebarRef = useRef<ElementRef<'aside'>>(null);
  const navbarRef = useRef<ElementRef<'div'>>(null);
  const isResizing = useRef(false);

  const [isCollapsed, setIsCollapsed] = useState(false);
  const [isResetting, setIsResetting] = useState(false);

  useEffect(() => {
    if (isMobile) {
      collapse();
    } else {
      reset();
    }
  }, [isMobile]);

  const collapse = () => {
    if (sidebarRef.current && navbarRef.current) {
      setIsCollapsed(true);
      setIsResetting(true);
      sidebarRef.current.style.width = '0';
      navbarRef.current.style.width = '100%';
      navbarRef.current.style.left = '0';
      setTimeout(() => {
        setIsResetting(false);
      }, 300);
    }
  };

  const reset = () => {
    if (sidebarRef.current && navbarRef.current) {
      setIsCollapsed(false);
      setIsResetting(false);
      sidebarRef.current.style.width = isMobile ? '100%' : '240px';
      navbarRef.current.style.width = isMobile ? '0' : 'calc(100% - 240px)';
      navbarRef.current.style.left = isMobile ? '100%' : '240px';
      setTimeout(() => {
        setIsResetting(false);
      }, 300);
    }
  };

  const handleMouseDown = (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
    e.preventDefault();
    e.stopPropagation();

    isResizing.current = true;
    document.addEventListener('mousemove', handleMouseMove);
    document.addEventListener('mouseup', handleMouseUp);
  };

  const handleMouseMove = (e: MouseEvent) => {
    if (!isResizing.current) return;

    let newWidth = e.clientX;
    if (newWidth < 240) newWidth = 240;
    if (newWidth > 400) newWidth = 400;

    if (sidebarRef.current && navbarRef.current) {
      sidebarRef.current.style.width = `${newWidth}px`;
      navbarRef.current.style.width = `calc(100% - ${newWidth}px)`;
      navbarRef.current.style.left = `${newWidth}px`;
    }
  };

  const handleMouseUp = () => {
    isResizing.current = false;
    document.removeEventListener('mousemove', handleMouseMove);
    document.removeEventListener('mouseup', handleMouseUp);
  };

  return (
    <>
      <aside
        ref={sidebarRef}
        className={cn(
          'group/sidebar h-screen bg-secondary overflow-y-auto relative flex w-60 flex-col z-50 ',
          isResetting && 'transition-all ease-in duration-300',
          isMobile && 'w-0'
        )}>
        <div
          className='h-6 w-6 text-muted-foreground rounded-sm hover:bg-neutral-300 dark:hover:bg-neutral-600 absolute top-3 right-2 opacity-0 group-hover/sidebar:opacity-100 transition'
          role='button'
          onClick={collapse}>
          <ChevronsLeft className='h-6 w-6' />
        </div>
        <div
          className='absolute right-0 top-0 w-1 h-full cursor-ew-resize bg-primary/10 opacity-0 group-hover/sidebar:opacity-100 transition'
          onMouseDown={handleMouseDown}></div>
      </aside>
      <div
        className={cn(
          'absolute top-0 left-60 z-50 x[calc(100% - 240px)]',
          isResetting && 'transition-all ease-in duration-300',
          isMobile && 'w-full left-0'
        )}
        ref={navbarRef}>
        <nav
          className={cn(
            'bg-transparent px-3 py-2 w-full ',
            isResetting && 'transition-all ease-in duration-300'
          )}>
          {isCollapsed && (
            <MenuIcon
              className='h-6 w-6 text-muted-foreground'
              role='button'
              onClick={reset}
            />
          )}
        </nav>
      </div>
    </>
  );
};
