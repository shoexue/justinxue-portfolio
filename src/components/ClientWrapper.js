'use client'

import React, { useEffect, useState } from 'react'
import PropTypes from 'prop-types'
import { usePathname } from 'next/navigation'

const ClientWrapper = ({ children }) => {
  const pathname = usePathname()
  const isHome = pathname === '/'
  const [isMounted, setIsMounted] = useState(false)
  const [smoothScrollInitialized, setSmoothScrollInitialized] = useState(false)

  useEffect(() => {
    setIsMounted(true)
  }, [])

  useEffect(() => {
    if (!isMounted || smoothScrollInitialized) return;

    const initSmoothScroll = async () => {
      try {
        const SmoothScroll = (await import('smooth-scroll')).default;
        const scroll = new SmoothScroll('a[href*="#"]', {
          speed: 800,
          speedAsDuration: true,
        });
        setSmoothScrollInitialized(true);
        return scroll;
      } catch (error) {
        console.error('Failed to initialize smooth scroll:', error);
        return null;
      }
    };

    let smoothScroll;
    initSmoothScroll().then(scroll => {
      smoothScroll = scroll;
    });

    return () => {
      if (smoothScroll) {
        smoothScroll.destroy();
      }
    };
  }, [isMounted, smoothScrollInitialized]);

  useEffect(() => {
    if (!isMounted) return;

    const handleHashLink = () => {
      const hash = window.location.hash;
      if (hash) {
        const id = hash.substring(1);
        setTimeout(() => {
          const element = document.getElementById(id);
          if (element) {
            element.scrollIntoView();
            element.focus();
          }
        }, 0);
      }
    };

    handleHashLink();
    window.addEventListener('hashchange', handleHashLink);
    return () => window.removeEventListener('hashchange', handleHashLink);
  }, [isMounted]);

  // During SSR or before hydration, render children without any client-side features
  if (!isMounted) {
    return <>{children}</>;
  }

  return <>{children}</>;
};

ClientWrapper.propTypes = {
  children: PropTypes.node.isRequired,
};

export default ClientWrapper; 