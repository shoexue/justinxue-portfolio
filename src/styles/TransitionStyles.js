'use client'

import { css } from 'styled-components'

const TransitionStyles = css`
  @keyframes fadeup {
    from {
      opacity: 0;
      transform: translateY(20px);
    }
    to {
      opacity: 1;
      transform: translateY(0);
    }
  }

  /* Fade up */
  .fadeup-enter {
    opacity: 0.01;
    transform: translateY(20px);
    transition: opacity 300ms cubic-bezier(0.645, 0.045, 0.355, 1),
      transform 300ms cubic-bezier(0.645, 0.045, 0.355, 1);
  }

  .fadeup-enter-active {
    opacity: 1;
    transform: translateY(0px);
    transition: opacity 300ms cubic-bezier(0.645, 0.045, 0.355, 1),
      transform 300ms cubic-bezier(0.645, 0.045, 0.355, 1);
  }

  /* Fade down */
  .fadedown-enter {
    opacity: 0.01;
    transform: translateY(-20px);
    transition: opacity 300ms cubic-bezier(0.645, 0.045, 0.355, 1),
      transform 300ms cubic-bezier(0.645, 0.045, 0.355, 1);
  }

  .fadedown-enter-active {
    opacity: 1;
    transform: translateY(0px);
    transition: opacity 300ms cubic-bezier(0.645, 0.045, 0.355, 1),
      transform 300ms cubic-bezier(0.645, 0.045, 0.355, 1);
  }

  /* Fade */
  .fade-enter {
    opacity: 0;
  }
  .fade-enter-active {
    opacity: 1;
    transition: opacity 300ms cubic-bezier(0.645, 0.045, 0.355, 1);
  }
  .fade-exit {
    opacity: 1;
  }
  .fade-exit-active {
    opacity: 0;
    transition: opacity 300ms cubic-bezier(0.645, 0.045, 0.355, 1);
  }
`

export default TransitionStyles 