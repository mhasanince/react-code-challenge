import React, { useState, useEffect } from 'react'
import { createPortal } from 'react-dom'
import styled from 'styled-components'

const Container = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.25);
  z-index: 9999;
  display: flex;
  justify-content: center;
  align-items: center;
`

const Spinner = () => {
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)

    return () => setMounted(false)
  }, [])

  return mounted
    ? createPortal(
        <Container>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            style={{
              margin: 'auto',
              display: 'block',
            }}
            width="48px"
            height="48px"
            viewBox="0 0 100 100"
            preserveAspectRatio="xMidYMid"
          >
            <circle
              cx="50"
              cy="50"
              fill="none"
              stroke="#0a0a0a"
              strokeWidth="12"
              r="32"
              strokeDasharray="150.79644737231007 52.26548245743669"
            >
              <animateTransform
                attributeName="transform"
                type="rotate"
                repeatCount="indefinite"
                dur="1.0526315789473684s"
                values="0 50 50;360 50 50"
                keyTimes="0;1"
              />
            </circle>
          </svg>
        </Container>,
        document.getElementById('loading-spinner')
      )
    : null
}

export default Spinner
